# VPS Deployment

This repo deploys the `apps/web` Next.js app and the `backend` FastAPI service
to an Ubuntu VPS through GitHub Actions.

## Required GitHub Secrets

Add these in `Settings -> Secrets and variables -> Actions`.

```txt
VPS_HOST=43.157.203.169
VPS_USER=ubuntu
VPS_SSH_KEY=<private key that can SSH to the VPS>

NEXT_PUBLIC_API_BASE_URL=https://catalystforge.web.id
BACKEND_CORS_ORIGINS=https://catalystforge.web.id

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
CONTACT_FROM=CatalystForge <noreply@catalystforge.web.id>
CONTACT_TO=catalystforgetechnology@gmail.com
```

Optional:

```txt
APP_DIR=/var/www/catalyst-forge
WEB_PORT=3000
BACKEND_PORT=8001
NGINX_SERVER_NAME=catalystforge.web.id
```

## Email Provider

The contact form uses Resend from the FastAPI backend. Verify the sender domain
in Resend first, then set `CONTACT_FROM` to an address on that verified domain.

## How It Works

1. `CI` validates TypeScript and backend imports.
2. `Deploy VPS` builds `apps/web` with Next.js standalone output.
3. GitHub Actions uploads web and backend artifacts to the VPS.
4. The deploy script creates systemd services:
   - `catalyst-web`
   - `catalyst-backend`
5. Nginx proxies `/` to Next.js and `/api` to FastAPI.

Manual deploy is available from GitHub Actions through `workflow_dispatch`.
