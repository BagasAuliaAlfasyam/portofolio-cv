#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/catalyst-forge}"
REPO_URL="${REPO_URL:-https://github.com/BagasAuliaAlfasyam/portofolio-cv.git}"
BRANCH="${BRANCH:-main}"
REPO_DIR="$APP_DIR/repo"
SHARED_DIR="$APP_DIR/shared"
WEB_PORT="${WEB_PORT:-3000}"
BACKEND_PORT="${BACKEND_PORT:-8001}"
PRIMARY_DOMAIN="${PRIMARY_DOMAIN:-catalystforge.web.id}"
SERVER_NAME="${NGINX_SERVER_NAME:-$PRIMARY_DOMAIN www.$PRIMARY_DOMAIN}"
POLL_INTERVAL="${POLL_INTERVAL:-2min}"
NEXT_PUBLIC_API_BASE_URL="${NEXT_PUBLIC_API_BASE_URL:-https://$PRIMARY_DOMAIN}"
NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-$NEXT_PUBLIC_API_BASE_URL}"
NEXT_PUBLIC_GA_ID="${NEXT_PUBLIC_GA_ID:-}"
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="${NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION:-}"
BACKEND_CORS_ORIGINS="${BACKEND_CORS_ORIGINS:-https://$PRIMARY_DOMAIN}"
CONTACT_FROM="${CONTACT_FROM:-CatalystForge <noreply@$PRIMARY_DOMAIN>}"
CONTACT_TO="${CONTACT_TO:-catalystforgetechnology@gmail.com}"

env_escape() {
  printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
}

sudo apt-get update
sudo apt-get install -y ca-certificates curl git nginx python3-venv

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

sudo mkdir -p "$APP_DIR"
sudo chown -R ubuntu:ubuntu "$APP_DIR"
mkdir -p "$SHARED_DIR"

if [[ ! -d "$REPO_DIR/.git" ]]; then
  git clone --branch "$BRANCH" "$REPO_URL" "$REPO_DIR"
else
  git -C "$REPO_DIR" fetch origin "$BRANCH"
  git -C "$REPO_DIR" checkout "$BRANCH"
fi

if [[ ! -f "$SHARED_DIR/backend.env" ]]; then
  cat > "$SHARED_DIR/backend.env" <<ENV
RESEND_API_KEY="$(env_escape "${RESEND_API_KEY:-replace_me}")"
CONTACT_FROM="$(env_escape "$CONTACT_FROM")"
CONTACT_TO="$(env_escape "$CONTACT_TO")"
BACKEND_CORS_ORIGINS="$(env_escape "$BACKEND_CORS_ORIGINS")"
PORT=$BACKEND_PORT
ENV
fi

if [[ ! -f "$SHARED_DIR/web.env" ]]; then
  cat > "$SHARED_DIR/web.env" <<ENV
NODE_ENV=production
HOSTNAME=127.0.0.1
PORT=$WEB_PORT
NEXT_PUBLIC_API_BASE_URL="$(env_escape "$NEXT_PUBLIC_API_BASE_URL")"
NEXT_PUBLIC_API_URL="$(env_escape "$NEXT_PUBLIC_API_URL")"
NEXT_PUBLIC_GA_ID="$(env_escape "$NEXT_PUBLIC_GA_ID")"
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="$(env_escape "$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION")"
ENV
fi

sudo tee /etc/systemd/system/catalyst-pull-deploy.service >/dev/null <<SERVICE
[Unit]
Description=Catalyst Forge pull deploy
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
User=root
Environment=APP_DIR=$APP_DIR
Environment=REPO_DIR=$REPO_DIR
Environment=BRANCH=$BRANCH
Environment=PRIMARY_DOMAIN=$PRIMARY_DOMAIN
Environment=WEB_PORT=$WEB_PORT
Environment=BACKEND_PORT=$BACKEND_PORT
Environment="NGINX_SERVER_NAME=$SERVER_NAME"
ExecStart=/bin/bash $REPO_DIR/scripts/vps-pull-deploy.sh
SERVICE

sudo tee /etc/systemd/system/catalyst-pull-deploy.timer >/dev/null <<TIMER
[Unit]
Description=Check Catalyst Forge GitHub updates and deploy

[Timer]
OnBootSec=1min
OnUnitActiveSec=$POLL_INTERVAL
Unit=catalyst-pull-deploy.service

[Install]
WantedBy=timers.target
TIMER

sudo systemctl daemon-reload
sudo systemctl enable --now catalyst-pull-deploy.timer

echo "Pull deploy timer installed."
echo "If RESEND_API_KEY is still replace_me, edit: $SHARED_DIR/backend.env"
echo "Run first deploy manually with: sudo systemctl start catalyst-pull-deploy.service"
