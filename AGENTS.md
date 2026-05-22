# AGENTS.md

Instructions for OpenAI Codex CLI and other coding agents working in this monorepo.

## Project Overview

This repository is a Turborepo monorepo for the Catalyst Forge product ecosystem.

- `apps/ai-support`: AI chatbot and support app.
- `apps/company`: Company landing page.
- `apps/crm`: CRM app.
- `apps/hris`: HRIS app.
- `apps/pos`: POS app.
- `apps/web`: Main web and portfolio app.
- `backend`: Python FastAPI API service.
- `packages/api`: Shared API client, endpoint wrappers, and API response types.
- `packages/config`: Shared app/site configuration.
- `packages/eslint-config`: Shared ESLint configuration.
- `packages/typescript-config`: Shared TypeScript configuration.
- `packages/ui`: Shared React UI components.

Frontend apps use Next.js App Router, TypeScript, Tailwind CSS, `@repo/ui`, `@repo/api`, `lucide-react`, and `recharts`. The backend uses FastAPI and PostgreSQL-ready async patterns. Auth is not fully implemented yet, but new backend and API code must be JWT-ready.

## Turborepo

Turborepo coordinates builds, type checks, linting, and dev servers across `apps/*` and `packages/*`.

- `build` depends on upstream package builds via `dependsOn: ["^build"]`.
- `build` includes `.env*` in task inputs and caches `.next/**` except `.next/cache/**`.
- `lint` and `check-types` depend on upstream package tasks.
- `dev` is persistent and uncached.
- Keep package scripts consistent so `turbo run <task>` works from the repo root.
- Prefer filtered commands for one app/package when possible, for example `npm run dev:crm` or `npx turbo run check-types --filter=crm`.

## Commands

Run from the repo root unless a task explicitly requires another directory.

- Install: `npm install`
- Dev all workspaces: `npm run dev`
- Dev one app: `npm run dev:web`, `npm run dev:crm`, `npm run dev:hris`, `npm run dev:pos`, `npm run dev:ai-support`, `npm run dev:company`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npm run check-types`
- Format TypeScript/Markdown: `npm run format`
- Backend dev: `cd backend` then `python main.py` or `uvicorn main:app --host 0.0.0.0 --port 8001 --reload`
- Backend dependencies: `cd backend` then install from `requirements.txt`

There is currently no root `test` script. When tests are added, expose them through package scripts and add a root `test` script using Turbo.

## Naming Conventions

- Files and folders: kebab-case for frontend files and directories, snake_case for Python modules.
- React components: PascalCase exports from kebab-case files, for example `CustomerTable` from `customer-table.tsx`.
- React hooks: `useSomething` in camelCase.
- TypeScript variables/functions: camelCase.
- TypeScript types/interfaces: PascalCase.
- Constants: UPPER_SNAKE_CASE only for true constants and environment keys.
- Python variables/functions/modules: snake_case.
- Python classes and Pydantic models: PascalCase.
- API paths: lowercase kebab-case or stable resource names, for example `/api/employees`.

## Dependency Rules

Do not install or add these dependencies:

- Any `@tanstack/*` package, including TanStack Query and TanStack Table.
- External data fetching/cache libraries such as SWR, Apollo Client, Relay, RTK Query, urql, axios, ky, got, or superagent.
- External table/data-grid libraries such as AG Grid, MUI Data Grid, React Table, Handsontable, or DataTables.
- External chart libraries other than `recharts`.
- Additional UI component libraries such as MUI, Chakra UI, Mantine, Ant Design, Radix Themes, or shadcn scaffolding.
- Additional icon libraries. Use `lucide-react`.

Use Next.js built-in `fetch`, wrapped through `@repo/api`. Build tables manually with React state, `@repo/ui`, `clsx`/`cn`, and Tailwind CSS. Use `recharts` for charts.

## Git Rules

Use concise conventional commit messages:

- `feat(scope): add customer summary table`
- `fix(api): handle empty employee list`
- `refactor(ui): simplify badge variants`
- `docs(root): add agent instructions`
- `chore(deps): update lockfile`

Keep scopes aligned with workspace names or domains: `web`, `crm`, `hris`, `pos`, `ai-support`, `company`, `api`, `ui`, `backend`, `config`.

## Pre-Commit Checklist

- Run `npm run lint` for frontend/package changes.
- Run `npm run check-types` for TypeScript changes.
- Run `npm run build` when touching shared packages, Next.js config, or cross-app behavior.
- For backend changes, run the relevant FastAPI service locally and validate `/health` plus changed endpoints.
- Confirm all API calls go through `@repo/api`.
- Confirm no forbidden dependencies were added to any `package.json`.
- Confirm reusable UI belongs in `packages/ui`, not duplicated across apps.
- Confirm shared API response types live in `packages/api`.
- Confirm `.env` secrets are not committed.
