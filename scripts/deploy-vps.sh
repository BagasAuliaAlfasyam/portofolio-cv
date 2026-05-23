#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/catalyst-forge}"
RELEASES_DIR="$APP_DIR/releases"
SHARED_DIR="$APP_DIR/shared"
RELEASE_ID="${RELEASE_ID:-$(date +%Y%m%d%H%M%S)}"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"
WEB_PORT="${WEB_PORT:-3000}"
BACKEND_PORT="${BACKEND_PORT:-8001}"
SERVER_NAME="${NGINX_SERVER_NAME:-_}"

require_env() {
  local name="$1"
  if [[ -z "${!name:-}" ]]; then
    echo "Missing required environment variable: $name" >&2
    exit 1
  fi
}

require_env "RESEND_API_KEY"
require_env "CONTACT_FROM"
require_env "CONTACT_TO"
require_env "BACKEND_CORS_ORIGINS"
require_env "NEXT_PUBLIC_API_BASE_URL"

env_escape() {
  printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
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

write_nginx_config() {
  local primary_server_name="${SERVER_NAME%% *}"
  local cert_dir="/etc/letsencrypt/live/$primary_server_name"

  if [[ -f "$cert_dir/fullchain.pem" && -f "$cert_dir/privkey.pem" ]]; then
    sudo tee /etc/nginx/sites-available/catalyst-forge.conf >/dev/null <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $SERVER_NAME;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $SERVER_NAME;

    ssl_certificate $cert_dir/fullchain.pem;
    ssl_certificate_key $cert_dir/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    client_max_body_size 2m;

    location /api/ {
        proxy_pass http://127.0.0.1:$BACKEND_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /health {
        proxy_pass http://127.0.0.1:$BACKEND_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:$WEB_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
NGINX
    return
  fi

  sudo tee /etc/nginx/sites-available/catalyst-forge.conf >/dev/null <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $SERVER_NAME;

    client_max_body_size 2m;

    location /api/ {
        proxy_pass http://127.0.0.1:$BACKEND_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /health {
        proxy_pass http://127.0.0.1:$BACKEND_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:$WEB_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
NGINX
}

sudo apt-get update
sudo apt-get install -y ca-certificates curl nginx python3-venv

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

sudo mkdir -p "$APP_DIR"
sudo chown -R ubuntu:ubuntu "$APP_DIR"
mkdir -p "$RELEASES_DIR" "$SHARED_DIR" "$RELEASE_DIR"
tar -xzf /tmp/catalyst-forge-web.tar.gz -C "$RELEASE_DIR"
tar -xzf /tmp/catalyst-forge-backend.tar.gz -C "$RELEASE_DIR"

cat > "$SHARED_DIR/backend.env" <<ENV
RESEND_API_KEY="$(env_escape "$RESEND_API_KEY")"
CONTACT_FROM="$(env_escape "$CONTACT_FROM")"
CONTACT_TO="$(env_escape "$CONTACT_TO")"
BACKEND_CORS_ORIGINS="$(env_escape "$BACKEND_CORS_ORIGINS")"
PORT=$BACKEND_PORT
ENV

cat > "$SHARED_DIR/web.env" <<ENV
NODE_ENV=production
HOSTNAME=127.0.0.1
PORT=$WEB_PORT
NEXT_PUBLIC_API_BASE_URL="$(env_escape "$NEXT_PUBLIC_API_BASE_URL")"
ENV

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

sudo tee /etc/systemd/system/catalyst-web.service >/dev/null <<SERVICE
[Unit]
Description=Catalyst Forge Next.js web
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=$APP_DIR/current/web/apps/web
EnvironmentFile=$SHARED_DIR/web.env
ExecStart=/usr/bin/node $APP_DIR/current/web/apps/web/server.js
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
SERVICE

write_nginx_config

sudo ln -sfn /etc/nginx/sites-available/catalyst-forge.conf /etc/nginx/sites-enabled/catalyst-forge.conf
sudo rm -f /etc/nginx/sites-enabled/default

sudo systemctl daemon-reload
sudo systemctl enable catalyst-backend catalyst-web
sudo systemctl restart catalyst-backend catalyst-web
sudo nginx -t
sudo systemctl reload nginx

wait_for_http "http://127.0.0.1:$BACKEND_PORT/health"
wait_for_http "http://127.0.0.1:$WEB_PORT/"

find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d | sort | head -n -5 | xargs -r rm -rf

echo "Deployment complete: $RELEASE_ID"
