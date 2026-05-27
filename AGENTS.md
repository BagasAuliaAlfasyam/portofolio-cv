# AGENTS.md

Instructions for OpenAI Codex CLI and other coding agents working in this
repository.

## Project Overview

This repository is a Turborepo monorepo for the Catalyst Forge product
ecosystem. It contains public marketing sites, product demo apps, shared
frontend packages, and a FastAPI backend.

### Apps

- `apps/web`: main CatalystForge public site and portfolio. The default
  Indonesian experience is served from `/`; the English experience is under
  `/en` through `app/[locale]`, `messages/*.json`, and `lib/i18n.ts`.
- `apps/company`: company profile site with about, operations, governance,
  sustainability, and contact pages.
- `apps/hris`: HRIS product demo with dashboard, employees, attendance,
  payroll, performance, and settings routes.
- `apps/crm`: CRM product demo with dashboard, accounts, pipeline, reports,
  tasks, and settings routes.
- `apps/pos`: POS product demo with dashboard, sale, inventory, transactions,
  reports, and settings routes.
- `apps/ai-support`: AI support console with conversations, knowledge,
  analytics, settings, and chat integration.

All apps use Next.js App Router, TypeScript, Tailwind CSS, `lucide-react`, and
workspace packages where needed. `web`, `company`, and `ai-support` also use
`framer-motion`. Product/demo apps use `recharts` for charts.

### Backend and Packages

- `backend`: FastAPI service, normally on port `8001`, with `/health`,
  `/api/employees`, `/api/sales`, `/api/dashboard`, `/api/contact`, and `/ai/*`
  routes. Contact email uses Resend. AI chat uses Gemini when `GEMINI_API_KEY`
  is configured and falls back to mock responses.
- `packages/api`: shared fetch client and React hooks. Endpoint-specific modules
  are intentionally present and should be filled with typed wrappers as the API
  matures.
- `packages/ui`: shared React UI components and utilities exported as
  `@repo/ui/*` and `@repo/ui/lib/*`.
- `packages/config`: shared site/project constants.
- `packages/eslint-config`: shared ESLint flat configs.
- `packages/typescript-config`: shared TypeScript presets.
- `scripts` and `docs`: VPS deploy automation and deployment notes.

## Turborepo

Turborepo coordinates builds, linting, type checks, and dev servers across
`apps/*` and `packages/*`.

- `build` depends on upstream package builds via `dependsOn: ["^build"]`.
- `build` includes `.env*` in task inputs and caches `.next/**` except
  `.next/cache/**`.
- `lint` and `check-types` depend on upstream package tasks.
- `dev` is persistent and uncached.
- Keep workspace scripts consistent so `turbo run <task>` works from the repo
  root.
- Prefer filtered commands for one app/package, for example
  `npx turbo run check-types --filter=web`.

## Commands

Run from the repo root unless a task explicitly requires another directory.

- Install: `npm install`
- Dev all workspaces: `npm run dev`
- Dev one app:
  - `npm run dev:web` on port `3000`
  - `npm run dev:hris` on port `3001`
  - `npm run dev:crm` on port `3002`
  - `npm run dev:pos` on port `3003`
  - `npm run dev:ai-support` on port `3004`
  - `npm run dev:company` on port `3005`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npm run check-types`
- Format TypeScript/Markdown: `npm run format`
- Backend dev: `cd backend` then `python main.py` or
  `uvicorn main:app --host 0.0.0.0 --port 8001 --reload`
- Backend dependencies: `cd backend` then install from `requirements.txt`

There is currently no root `test` script. When tests are added, expose them
through package scripts and add a root `test` script using Turbo.

## Architecture Rules

- Keep app-specific UI in `apps/<app>/components` until it is reused across
  apps; then move it to `packages/ui`.
- Keep shared API clients, API hooks, and shared API response types in
  `packages/api`.
- `crm`, `hris`, `pos`, and `ai-support` already depend on `@repo/api`; route
  reusable backend calls through that package.
- `web` and `company` are public marketing sites and do not currently depend on
  `@repo/api`. App-local one-off form submissions may use a local helper or a
  relative/proxied endpoint, but reusable backend access should be promoted to
  `packages/api` and the app dependency/`transpilePackages` should be updated.
- Keep packages independent from `apps/*`; packages must never import app code.
- Next apps are configured for `output: "standalone"`, shared security headers
  from `next-security-headers.cjs`, and root output tracing. Keep these aligned
  when changing app-level Next config.
- Backend route handlers should stay thin. Put validation in `schemas`, shared
  dependencies in `api/deps.py`, configuration in `core/config.py`, and future
  database/security code in `core/database.py` and `core/security.py`.
- Auth and PostgreSQL are scaffolded but not fully implemented. New backend code
  must be easy to wire into async SQLAlchemy sessions and JWT dependencies.

## Environment and Deployment

- Public frontend API env names currently include both
  `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_API_URL`; keep both in sync in
  deployment until the codebase is consolidated.
- Backend env values include `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`,
  `BACKEND_CORS_ORIGINS`, `DATABASE_URL`, `GEMINI_API_KEY`, and
  `OPENAI_API_KEY`.
- Do not commit `.env` files or secrets.
- `docs/deployment.md` documents the VPS deployment flow.
- `scripts/vps-pull-deploy.sh` is the current multi-app pull deploy path and
  deploys `web`, `company`, `hris`, `crm`, `pos`, `ai-support`, and `backend`.
- `scripts/deploy-vps.sh` is the older artifact deploy path for `web` and
  `backend`; update it deliberately if it is brought back into active use.

## Dependency Rules

Do not install or add these dependencies:

- Any `@tanstack/*` package, including TanStack Query and TanStack Table.
- External data fetching/cache libraries such as SWR, Apollo Client, Relay, RTK
  Query, urql, axios, ky, got, or superagent.
- External table/data-grid libraries such as AG Grid, MUI Data Grid, React
  Table, Handsontable, or DataTables.
- External chart libraries other than `recharts`.
- Additional UI component libraries such as MUI, Chakra UI, Mantine, Ant Design,
  Radix Themes, or shadcn scaffolding.
- Additional icon libraries. Use `lucide-react`.

Use Next.js/standard `fetch` through local wrappers and `@repo/api`. Build
tables manually with React state, `@repo/ui`, `clsx`/`cn`, and Tailwind CSS. Use
`recharts` for charts.

## Naming Conventions

- Files and folders: kebab-case for frontend files and directories, snake_case
  for Python modules.
- React components: PascalCase exports from kebab-case files, for example
  `CustomerTable` from `customer-table.tsx`.
- React hooks: `useSomething` in camelCase.
- TypeScript variables/functions: camelCase.
- TypeScript types/interfaces: PascalCase.
- Constants: UPPER_SNAKE_CASE only for true constants and environment keys.
- Python variables/functions/modules: snake_case.
- Python classes and Pydantic models: PascalCase.
- API paths: lowercase kebab-case or stable resource names, for example
  `/api/employees`.

## Git Rules

Use concise conventional commit messages:

- `feat(web): add localized service section`
- `fix(api): handle empty employee list`
- `refactor(ui): simplify badge variants`
- `docs(root): update agent instructions`
- `chore(deps): update lockfile`

Keep scopes aligned with workspace names or domains: `web`, `company`, `crm`,
`hris`, `pos`, `ai-support`, `api`, `ui`, `backend`, `config`, `deploy`, or
`docs`.

## Pre-Commit Checklist

- Run `npm run lint` for frontend/package changes.
- Run `npm run check-types` for TypeScript changes.
- Run `npm run build` when touching shared packages, Next.js config, deploy
  config, or cross-app behavior.
- For backend changes, run the FastAPI service locally and validate `/health`
  plus changed endpoints.
- Confirm reusable API calls go through `@repo/api`.
- Confirm no forbidden dependencies were added to any `package.json`.
- Confirm reusable UI belongs in `packages/ui`, not duplicated across apps.
- Confirm shared API response types live in `packages/api`.
- Confirm `.env` secrets are not committed.
