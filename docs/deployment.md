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
NEXT_PUBLIC_API_URL=https://catalystforge.web.id
BACKEND_CORS_ORIGINS=https://catalystforge.web.id,https://company.catalystforge.web.id,https://hris.catalystforge.web.id,https://crm.catalystforge.web.id,https://pos.catalystforge.web.id,https://ai.catalystforge.web.id,https://ai-support.catalystforge.web.id

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
CONTACT_FROM=CatalystForge <noreply@catalystforge.web.id>
CONTACT_TO=catalystforgetechnology@gmail.com
```

Optional:

```txt
APP_DIR=/var/www/catalyst-forge
WEB_PORT=3000
HRIS_PORT=3001
CRM_PORT=3002
POS_PORT=3003
AI_SUPPORT_PORT=3004
COMPANY_PORT=3005
BACKEND_PORT=8001
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NGINX_SERVER_NAME="catalystforge.web.id www.catalystforge.web.id"
```

## App Subdomains

The VPS pull deploy serves the main profile and product apps from one Nginx
instance:

```txt
catalystforge.web.id             -> apps/web
www.catalystforge.web.id         -> apps/web
company.catalystforge.web.id     -> apps/company
hris.catalystforge.web.id        -> apps/hris
crm.catalystforge.web.id         -> apps/crm
pos.catalystforge.web.id         -> apps/pos
ai.catalystforge.web.id          -> apps/ai-support
ai-support.catalystforge.web.id  -> apps/ai-support
```

Add `A` records for those subdomains pointing to the VPS IP, or add one
wildcard record:

```txt
*.catalystforge.web.id  A  43.157.203.169
```

After DNS resolves, expand the Let's Encrypt certificate on the VPS:

```bash
sudo certbot --nginx --expand \
  -d catalystforge.web.id \
  -d www.catalystforge.web.id \
  -d company.catalystforge.web.id \
  -d hris.catalystforge.web.id \
  -d crm.catalystforge.web.id \
  -d pos.catalystforge.web.id \
  -d ai.catalystforge.web.id \
  -d ai-support.catalystforge.web.id \
  --redirect
```

## Email Provider

The contact form uses Resend from the FastAPI backend. Verify the sender domain
in Resend first, then set `CONTACT_FROM` to an address on that verified domain.
Keep `BACKEND_CORS_ORIGINS` aligned with every deployed frontend origin that
calls the shared backend.

## How It Works

1. `CI` validates TypeScript, lint, production builds, and backend imports.
2. The VPS pull-deploy flow builds all configured Next.js apps with standalone
   output.
3. The deploy script creates systemd services for each app plus
   `catalyst-backend`.
4. Nginx proxies each domain to its Next.js app and `/api` plus `/ai` to
   FastAPI.

Manual deploy is available from GitHub Actions through `workflow_dispatch`.

## Semi-Automatic VPS Pull Deploy

If GitHub Actions is unavailable, the VPS can poll GitHub directly and deploy
new commits from `main`.

Initial setup on the VPS:

```bash
APP_DIR=/var/www/catalyst-forge \
REPO_URL=https://github.com/BagasAuliaAlfasyam/portofolio-cv.git \
BRANCH=main \
NEXT_PUBLIC_API_BASE_URL=https://catalystforge.web.id \
NEXT_PUBLIC_API_URL=https://catalystforge.web.id \
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX \
BACKEND_CORS_ORIGINS=https://catalystforge.web.id,https://company.catalystforge.web.id,https://hris.catalystforge.web.id,https://crm.catalystforge.web.id,https://pos.catalystforge.web.id,https://ai.catalystforge.web.id,https://ai-support.catalystforge.web.id \
CONTACT_FROM='CatalystForge <noreply@catalystforge.web.id>' \
CONTACT_TO=catalystforgetechnology@gmail.com \
NGINX_SERVER_NAME='catalystforge.web.id www.catalystforge.web.id' \
bash scripts/setup-vps-pull-deploy.sh
```

Then edit the secret env file directly on the VPS:

```bash
nano /var/www/catalyst-forge/shared/backend.env
```

Set:

```txt
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxx"
```

Start the first deploy:

```bash
sudo systemctl start catalyst-pull-deploy.service
```

Check deploy logs:

```bash
journalctl -u catalyst-pull-deploy.service -n 100 --no-pager
```

The timer checks for new commits every 2 minutes:

```bash
systemctl status catalyst-pull-deploy.timer
```

To force a redeploy:

```bash
sudo systemctl set-environment FORCE_DEPLOY=1
sudo systemctl start catalyst-pull-deploy.service
sudo systemctl unset-environment FORCE_DEPLOY
```
