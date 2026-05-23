#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/catalyst-forge}"
REPO_DIR="${REPO_DIR:-$APP_DIR/repo}"
RELEASES_DIR="$APP_DIR/releases"
SHARED_DIR="$APP_DIR/shared"
BRANCH="${BRANCH:-main}"
PRIMARY_DOMAIN="${PRIMARY_DOMAIN:-catalystforge.web.id}"
SERVER_NAME="${NGINX_SERVER_NAME:-$PRIMARY_DOMAIN www.$PRIMARY_DOMAIN}"
BACKEND_PORT="${BACKEND_PORT:-8001}"
LOCK_FILE="$APP_DIR/deploy.lock"
DEPLOYED_SHA_FILE="$SHARED_DIR/deployed_sha"
NEXT_APPS=(web company hris crm pos ai-support)

exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "Deploy already running; exiting."
  exit 0
fi

require_file() {
  local file_path="$1"
  if [[ ! -f "$file_path" ]]; then
    echo "Missing required file: $file_path" >&2
    exit 1
  fi
}

cleanup_old_releases() {
  local active_release

  active_release="$(readlink -f "$APP_DIR/current" 2>/dev/null || true)"

  find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' \
    | sort -rn \
    | tail -n +6 \
    | while read -r _ release_path; do
        if [[ -n "$active_release" && "$(readlink -f "$release_path")" == "$active_release" ]]; then
          continue
        fi

        rm -rf "$release_path"
      done
}

app_port() {
  case "$1" in
    web) printf '%s\n' "${WEB_PORT:-3000}" ;;
    hris) printf '%s\n' "${HRIS_PORT:-3001}" ;;
    crm) printf '%s\n' "${CRM_PORT:-3002}" ;;
    pos) printf '%s\n' "${POS_PORT:-3003}" ;;
    ai-support) printf '%s\n' "${AI_SUPPORT_PORT:-3004}" ;;
    company) printf '%s\n' "${COMPANY_PORT:-3005}" ;;
    *) echo "Unknown app: $1" >&2; exit 1 ;;
  esac
}

app_server_names() {
  case "$1" in
    web) printf '%s\n' "$SERVER_NAME" ;;
    hris) printf '%s\n' "${HRIS_SERVER_NAME:-hris.$PRIMARY_DOMAIN}" ;;
    crm) printf '%s\n' "${CRM_SERVER_NAME:-crm.$PRIMARY_DOMAIN}" ;;
    pos) printf '%s\n' "${POS_SERVER_NAME:-pos.$PRIMARY_DOMAIN}" ;;
    ai-support) printf '%s\n' "${AI_SUPPORT_SERVER_NAME:-ai.$PRIMARY_DOMAIN ai-support.$PRIMARY_DOMAIN}" ;;
    company) printf '%s\n' "${COMPANY_SERVER_NAME:-company.$PRIMARY_DOMAIN}" ;;
    *) echo "Unknown app: $1" >&2; exit 1 ;;
  esac
}

service_name() {
  printf 'catalyst-%s\n' "$1"
}

wait_for_http() {
  local url="$1"
  local attempts="${2:-30}"

  for _ in $(seq 1 "$attempts"); do
    if curl -fsS "$url" >/dev/null; then
      return 0
    fi
    sleep 1
  done

  echo "Timed out waiting for $url" >&2
  return 1
}

cert_covers_names() {
  local server_names="$1"
  local primary_server_name="${SERVER_NAME%% *}"
  local cert_file="/etc/letsencrypt/live/$primary_server_name/fullchain.pem"
  local name

  [[ -f "$cert_file" ]] || return 1
  command -v openssl >/dev/null 2>&1 || return 1

  for name in $server_names; do
    if ! openssl x509 -in "$cert_file" -noout -checkhost "$name" 2>/dev/null | grep -q "does match"; then
      return 1
    fi
  done

  return 0
}

write_proxy_locations() {
  local app_port="$1"

  cat <<NGINX
    client_max_body_size 2m;

    location /api/ {
        proxy_pass http://127.0.0.1:$BACKEND_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_hide_header X-Powered-By;
    }

    location /health {
        proxy_pass http://127.0.0.1:$BACKEND_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_hide_header X-Powered-By;
    }

    location / {
        proxy_pass http://127.0.0.1:$app_port;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_hide_header X-Powered-By;
    }
NGINX
}

write_nginx_server_block() {
  local server_names="$1"
  local app_port="$2"
  local primary_server_name="${SERVER_NAME%% *}"
  local cert_dir="/etc/letsencrypt/live/$primary_server_name"

  if cert_covers_names "$server_names"; then
    cat <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $server_names;
    server_tokens off;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $server_names;
    server_tokens off;

    ssl_certificate $cert_dir/fullchain.pem;
    ssl_certificate_key $cert_dir/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

$(write_proxy_locations "$app_port")
}

NGINX
    return
  fi

  cat <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $server_names;
    server_tokens off;

$(write_proxy_locations "$app_port")
}

NGINX
}

write_nginx_config() {
  local config_file
  local app
  local app_port_value
  local server_names

  config_file="$(mktemp)"

  {
    for app in "${NEXT_APPS[@]}"; do
      app_port_value="$(app_port "$app")"
      server_names="$(app_server_names "$app")"
      write_nginx_server_block "$server_names" "$app_port_value"
    done
  } > "$config_file"

  sudo mv "$config_file" /etc/nginx/sites-available/catalyst-forge.conf
}

write_next_service() {
  local app="$1"
  local app_port_value="$2"
  local app_service

  app_service="$(service_name "$app")"

  sudo tee "/etc/systemd/system/$app_service.service" >/dev/null <<SERVICE
[Unit]
Description=Catalyst Forge $app Next.js app
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=$APP_DIR/current/apps/$app/apps/$app
Environment=NODE_ENV=production
Environment=HOSTNAME=127.0.0.1
Environment=PORT=$app_port_value
Environment=NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL:-https://$PRIMARY_DOMAIN}
Environment=NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-https://$PRIMARY_DOMAIN}
ExecStart=/usr/bin/node $APP_DIR/current/apps/$app/apps/$app/server.js
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
SERVICE
}

sudo apt-get update
sudo apt-get install -y ca-certificates curl git nginx openssl python3-venv

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

sudo mkdir -p "$APP_DIR"
sudo chown -R ubuntu:ubuntu "$APP_DIR"
mkdir -p "$RELEASES_DIR" "$SHARED_DIR"
git config --global --add safe.directory "$REPO_DIR"

require_file "$SHARED_DIR/backend.env"
require_file "$SHARED_DIR/web.env"

cd "$REPO_DIR"
git fetch origin "$BRANCH"
REMOTE_SHA="$(git rev-parse "origin/$BRANCH")"
DEPLOYED_SHA="$(cat "$DEPLOYED_SHA_FILE" 2>/dev/null || true)"

if [[ "${FORCE_DEPLOY:-0}" != "1" && "$REMOTE_SHA" == "$DEPLOYED_SHA" ]]; then
  echo "No changes to deploy: $REMOTE_SHA"
  exit 0
fi

git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"
git clean -fd

set -a
# shellcheck disable=SC1090
source "$SHARED_DIR/web.env"
NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-${NEXT_PUBLIC_API_BASE_URL:-https://$PRIMARY_DOMAIN}}"
NEXT_PUBLIC_API_BASE_URL="${NEXT_PUBLIC_API_BASE_URL:-$NEXT_PUBLIC_API_URL}"
set +a

npm ci --include=dev
for app in "${NEXT_APPS[@]}"; do
  npx turbo run build --filter="$app"
done

RELEASE_ID="${REMOTE_SHA:0:12}-$(date +%Y%m%d%H%M%S)"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"
mkdir -p "$RELEASE_DIR/apps" "$RELEASE_DIR/backend"

for app in "${NEXT_APPS[@]}"; do
  mkdir -p "$RELEASE_DIR/apps/$app"
  cp -R "apps/$app/.next/standalone/." "$RELEASE_DIR/apps/$app/"
  mkdir -p "$RELEASE_DIR/apps/$app/apps/$app/.next"
  cp -R "apps/$app/.next/static" "$RELEASE_DIR/apps/$app/apps/$app/.next/static"
  if [[ -d "apps/$app/public" ]]; then
    cp -R "apps/$app/public" "$RELEASE_DIR/apps/$app/apps/$app/public"
  fi
done

cp -R backend/. "$RELEASE_DIR/backend/"

python3 -m venv "$RELEASE_DIR/backend/.venv"
"$RELEASE_DIR/backend/.venv/bin/pip" install --upgrade pip
"$RELEASE_DIR/backend/.venv/bin/pip" install -r "$RELEASE_DIR/backend/requirements.txt"

ln -sfn "$RELEASE_DIR" "$APP_DIR/current"

sudo tee /etc/systemd/system/catalyst-backend.service >/dev/null <<SERVICE
[Unit]
Description=Catalyst Forge FastAPI backend
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=$APP_DIR/current/backend
EnvironmentFile=$SHARED_DIR/backend.env
ExecStart=$APP_DIR/current/backend/.venv/bin/uvicorn main:app --host 127.0.0.1 --port $BACKEND_PORT
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
SERVICE

NEXT_SERVICE_NAMES=()
for app in "${NEXT_APPS[@]}"; do
  write_next_service "$app" "$(app_port "$app")"
  NEXT_SERVICE_NAMES+=("$(service_name "$app")")
done

write_nginx_config

sudo ln -sfn /etc/nginx/sites-available/catalyst-forge.conf /etc/nginx/sites-enabled/catalyst-forge.conf
sudo rm -f /etc/nginx/sites-enabled/default

sudo systemctl daemon-reload
sudo systemctl enable catalyst-backend "${NEXT_SERVICE_NAMES[@]}"
sudo systemctl restart catalyst-backend "${NEXT_SERVICE_NAMES[@]}"
sudo nginx -t
sudo systemctl reload nginx

wait_for_http "http://127.0.0.1:$BACKEND_PORT/health"
for app in "${NEXT_APPS[@]}"; do
  wait_for_http "http://127.0.0.1:$(app_port "$app")/"
done

printf '%s\n' "$REMOTE_SHA" > "$DEPLOYED_SHA_FILE"
cleanup_old_releases

echo "Deployed $REMOTE_SHA"
