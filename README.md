<p align="center">
  <img src="./apps/web/public/logoBackground.png" alt="CatalystForge logo" width="220" />
</p>

<h1 align="center">CatalystForge</h1>

<p align="center"><strong>Building Digital Solutions</strong></p>

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white" />
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0.109+-009688?logo=fastapi&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Ready-4169E1?logo=postgresql&logoColor=white" />
  <img alt="Turborepo" src="https://img.shields.io/badge/Turborepo-2.9-EF4444?logo=turborepo&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white" />
</p>

## Overview

CatalystForge is a digital solution company focused on building practical, scalable software for business operations, customer engagement, HR processes, sales workflows, and corporate digital presence.

This repository is the CatalystForge product ecosystem in one Turborepo monorepo. It contains multiple Next.js applications, a FastAPI backend, shared UI components, shared API wrappers, and centralized development configuration.

The platform is designed for enterprise and corporate clients, especially organizations that need reliable internal systems, customer-facing applications, and maintainable technology foundations.

## Monorepo Structure

```text
portofolio cv/
|-- apps/
|   |-- ai-support/          AI chatbot and support application
|   |-- company/             Company landing page
|   |-- crm/                 Customer relationship management app
|   |-- hris/                Human resources information system app
|   |-- pos/                 Point-of-sale and sales operations app
|   `-- web/                 Main CatalystForge website and portfolio
|
|-- backend/
|   |-- api/
|   |   |-- router.py        FastAPI router composition
|   |   `-- routes/          REST API endpoint modules
|   |-- core/                Configuration, database, security, and services
|   |-- models/              SQLAlchemy model placeholders
|   |-- schemas/             Pydantic response and request schemas
|   |-- Dockerfile           Backend container definition
|   |-- main.py              FastAPI application entrypoint
|   `-- requirements.txt     Python dependencies
|
|-- packages/
|   |-- api/                 Shared API client, endpoint wrappers, and types
|   |-- config/              Shared site and application configuration
|   |-- eslint-config/       Shared ESLint configuration
|   |-- typescript-config/   Shared TypeScript configuration
|   `-- ui/                  Shared React UI components
|
|-- package.json             Workspace scripts and Turborepo commands
|-- package-lock.json        npm lockfile
|-- turbo.json               Turborepo task pipeline
`-- README.md
```

## Apps

| App          | Description                                                       | Stack                                        |
| ------------ | ----------------------------------------------------------------- | -------------------------------------------- |
| `ai-support` | AI chatbot and support interface for customer service workflows.  | Next.js, TypeScript, Tailwind CSS, FastAPI   |
| `company`    | Company landing page for corporate presentation and lead capture. | Next.js, TypeScript, Tailwind CSS            |
| `crm`        | Customer relationship management app for pipelines and clients.   | Next.js, TypeScript, Tailwind CSS, Recharts  |
| `hris`       | HR and employee management app for operational workflows.         | Next.js, TypeScript, Tailwind CSS, Recharts  |
| `pos`        | Point-of-sale app for transactions, inventory, and reporting.     | Next.js, TypeScript, Tailwind CSS, Recharts  |
| `web`        | Main CatalystForge marketing website and portfolio.               | Next.js App Router, TypeScript, Tailwind CSS |

## Packages

| Package                   | Description                                                               |
| ------------------------- | ------------------------------------------------------------------------- |
| `@repo/api`               | Shared API client, typed endpoint wrappers, and API response interfaces.  |
| `@repo/config`            | Shared project and site configuration.                                    |
| `@repo/eslint-config`     | Shared ESLint rules for apps and packages.                                |
| `@repo/typescript-config` | Shared TypeScript presets for Next.js apps and React packages.            |
| `@repo/ui`                | Shared React components, UI utilities, and reusable interface primitives. |

## Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Frontend   | Next.js App Router, React, TypeScript         |
| Backend    | Python, FastAPI, Pydantic, SQLAlchemy         |
| Database   | PostgreSQL with async-ready `asyncpg` pattern |
| Monorepo   | Turborepo, npm workspaces                     |
| Deployment | VPS, Docker, Nginx                            |
| Styling    | Tailwind CSS, `clsx`, `tailwind-merge`        |
| Icons      | `lucide-react`                                |
| Charts     | `recharts`                                    |

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 10.9.2 or compatible npm version
- Python 3.11 or newer
- PostgreSQL 14 or newer
- Docker and Nginx for deployment workflows
- pnpm support is not configured; this repository currently uses
  `package-lock.json` and `npm@10.9.2`.

### Clone the Repository

```bash
git clone <repository-url>
cd "portofolio cv"
```

### Install Dependencies

```bash
npm install
```

Backend dependencies:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

On macOS or Linux, activate the virtual environment with:

```bash
source venv/bin/activate
```

### Set Up Environment Variables

Create local `.env` files from the relevant examples when available.

```bash
cp backend/.env.example backend/.env
```

Use `backend/.env.example` as the backend starting point, then keep local
secrets in `backend/.env`.

### Run Development Servers

Run all workspace dev servers through Turborepo:

```bash
npm run dev
```

Run one app only:

```bash
npm run dev:web
npm run dev:crm
npm run dev:hris
npm run dev:pos
npm run dev:ai-support
npm run dev:company
```

Run the FastAPI backend:

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

## Development Commands

| Command                               | Description                                                          |
| ------------------------------------- | -------------------------------------------------------------------- |
| `npm run dev`                         | Start all app/package dev tasks through Turbo.                       |
| `npm run dev:web`                     | Start only the main website app.                                     |
| `npm run dev:crm`                     | Start only the CRM app.                                              |
| `npm run dev:hris`                    | Start only the HRIS app.                                             |
| `npm run dev:pos`                     | Start only the POS app.                                              |
| `npm run dev:ai-support`              | Start only the AI support app.                                       |
| `npm run dev:company`                 | Start only the company landing page app.                             |
| `npm run build`                       | Build all apps and packages through Turbo.                           |
| `npm run lint`                        | Lint all configured workspaces.                                      |
| `npm run check-types`                 | Run TypeScript checks across workspaces.                             |
| `npm run format`                      | Format TypeScript, TSX, and Markdown files.                          |
| `npm --workspace web run build`       | Build a specific app directly.                                       |
| `npm --workspace web run check-types` | Type-check a specific app directly.                                  |
| `npm --workspace @repo/ui run lint`   | Lint a specific shared package directly.                             |
| `npm run test`                        | Not implemented yet. Add it through Turbo when tests are introduced. |

## Environment Variables

Never commit `.env` files. Keep secrets in local environment files, VPS secrets, or deployment-managed secret stores.

### Backend

| Variable               | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `PROJECT_NAME`         | FastAPI project name.                             |
| `API_V1_STR`           | API route prefix.                                 |
| `BACKEND_CORS_ORIGINS` | Comma-separated list of allowed frontend origins. |
| `DATABASE_URL`         | Full PostgreSQL connection URL.                   |
| `POSTGRES_SERVER`      | PostgreSQL host.                                  |
| `POSTGRES_USER`        | PostgreSQL username.                              |
| `POSTGRES_PASSWORD`    | PostgreSQL password.                              |
| `POSTGRES_DB`          | PostgreSQL database name.                         |
| `GEMINI_API_KEY`       | Google Gemini API key for AI features.            |
| `OPENAI_API_KEY`       | OpenAI API key for AI features.                   |

### Frontend Apps

| Variable                   | Description                                                   |
| -------------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`      | Public backend API base URL used by `@repo/api`.              |
| `NEXT_PUBLIC_API_BASE_URL` | Compatibility alias used by public contact form submissions.  |
| `NEXT_PUBLIC_GA_ID`        | Optional Google Analytics measurement ID for conversion data. |
| `NEXT_LOCALE`              | Browser cookie used by the website language switcher.         |

App-specific environment variables should be documented in each app as they are introduced.

## Deployment

The target deployment model is VPS-based:

- Docker containers for the FastAPI backend and Next.js apps.
- Nginx as reverse proxy, TLS terminator, and route gateway.
- PostgreSQL as the primary database.
- Environment variables managed outside source control.

Current deployment status:

- `backend/Dockerfile` exists and runs the FastAPI service on port `8001`.
- `scripts/vps-pull-deploy.sh` generates systemd services and Nginx routing for
  all public and demo apps.
- `docs/deployment.md` documents the current VPS pull-deploy flow.
- JWT authentication is WIP and the backend structure is prepared for it.

## Contributing

Please follow the conventions in the scoped `AGENTS.md` files before making changes:

- `AGENTS.md` for global monorepo rules.
- `apps/AGENTS.md` for frontend app rules.
- `backend/AGENTS.md` for FastAPI backend rules.
- `packages/AGENTS.md` for shared package rules.

Commit messages should use concise conventional commits:

```text
feat(web): add localized company profile page
fix(api): handle empty employee response
refactor(ui): simplify button variants
docs(root): update public README
```

Pull request expectations:

- Describe the business or technical purpose of the change.
- Link related issues or project notes when available.
- Include screenshots for UI changes.
- Run the relevant lint, type-check, and build commands before review.
- Do not add forbidden dependencies such as TanStack Query, TanStack Table, external table libraries, external fetch libraries, or additional icon/UI libraries.

## License

MIT License placeholder. Add the full license text before publishing this repo
as an open-source package.
