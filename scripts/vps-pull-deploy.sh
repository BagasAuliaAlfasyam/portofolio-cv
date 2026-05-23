#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/catalyst-forge}"
REPO_DIR="${REPO_DIR:-$APP_DIR/repo}"
RELEASES_DIR="$APP_DIR/releases"
SHARED_DIR="$APP_DIR/shared"
BRANCH="${BRANCH:-main}"
WEB_PORT="${WEB_PORT:-3000}"
BACKEND_PORT="${BACKEND_PORT:-8001}"
SERVER_NAME="${NGINX_SERVER_NAME:-catalystforge.web.id}"
LOCK_FILE="$APP_DIR/deploy.lock"
DEPLOYED_SHA_FILE="$SHARED_DIR/deployed_sha"

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

sudo apt-get update
sudo apt-get install -y ca-certificates curl git nginx python3-venv

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

sudo mkdir -p "$APP_DIR"
sudo chown -R ubuntu:ubuntu "$APP_DIR"
mkdir -p "$RELEASES_DIR" "$SHARED_DIR"

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
set +a

npm ci
npx turbo run build --filter=web

RELEASE_ID="${REMOTE_SHA:0:12}-$(date +%Y%m%d%H%M%S)"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"
mkdir -p "$RELEASE_DIR/web" "$RELEASE_DIR/backend"

cp -R apps/web/.next/standalone/. "$RELEASE_DIR/web/"
mkdir -p "$RELEASE_DIR/web/apps/web/.next"
cp -R apps/web/.next/static "$RELEASE_DIR/web/apps/web/.next/static"
cp -R apps/web/public "$RELEASE_DIR/web/apps/web/public"
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

sudo ln -sfn /etc/nginx/sites-available/catalyst-forge.conf /etc/nginx/sites-enabled/catalyst-forge.conf
sudo rm -f /etc/nginx/sites-enabled/default

sudo systemctl daemon-reload
sudo systemctl enable catalyst-backend catalyst-web
sudo systemctl restart catalyst-backend catalyst-web
sudo nginx -t
sudo systemctl reload nginx

curl -fsS "http://127.0.0.1:$BACKEND_PORT/health" >/dev/null
curl -fsS "http://127.0.0.1:$WEB_PORT/" >/dev/null

printf '%s\n' "$REMOTE_SHA" > "$DEPLOYED_SHA_FILE"
find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d | sort | head -n -5 | xargs -r rm -rf

echo "Deployed $REMOTE_SHA"
