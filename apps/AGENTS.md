# AGENTS.md

Frontend instructions for all Next.js apps in `apps/*`.

## Current App Roles

- `web`: primary CatalystForge marketing/portfolio site. It uses localized
  message dictionaries (`messages/id.json`, `messages/en.json`), `lib/i18n.ts`,
  and `app/[locale]` for non-default locales. The default locale is Indonesian
  at `/`; English is served at `/en`.
- `company`: company profile site with static/marketing pages for about,
  operations, governance, sustainability, and contact.
- `hris`: HRIS product demo with operational dashboards and HR workflows.
- `crm`: CRM product demo with account, pipeline, task, and reporting workflows.
- `pos`: POS product demo with sale, inventory, transaction, and reporting
  workflows.
- `ai-support`: AI support app that uses shared API hooks for chat-like
  interactions and product support views.

## App Structure

Each app should follow this baseline structure when adding new areas:

```text
app/
  layout.tsx
  page.tsx
  loading.tsx
  error.tsx
  globals.css
components/
  feature-component.tsx
lib/
  app-local-utils.ts
types/
  app-local-types.ts
public/
```

Use `app/` for routes and route-level files. Use `components/` for app-specific
UI. Move reusable components to `packages/ui`. Move shared API behavior and API
response types to `packages/api`.

## App Router Conventions

- `layout.tsx`: define metadata, root shell, fonts, and providers.
- `page.tsx`: default to Server Components unless browser state, effects, or
  events are required.
- `loading.tsx`: route-level loading UI.
- `error.tsx`: client component with `"use client"` and a retry/reset path.
- Keep route-specific components near the route only when they are not reused
  elsewhere.
- Keep Client Components small and only add `"use client"` where needed.
- Use `@/*` imports inside an app. Use workspace imports across package
  boundaries.

## Web I18n

For `apps/web`:

- Keep the Indonesian default content in `/` and the non-default locale routes
  in `app/[locale]`.
- Update `messages/id.json` and `messages/en.json` together for user-facing
  copy.
- Use `getMessages`, `isLocale`, `LOCALES`, and `type Messages` from
  `@/lib/i18n`.
- Keep localized metadata in sync with page content.
- Preserve the `NEXT_LOCALE` middleware behavior unless intentionally changing
  locale routing.
- Prefer shared section components that receive `messages` over duplicating page
  markup per locale.

## Data Fetching and API Boundaries

- For `crm`, `hris`, `pos`, and `ai-support`, route reusable backend calls
  through `@repo/api`.
- `packages/api/src/client.ts` owns raw `fetch` for shared backend calls.
- Endpoint-specific modules such as `dashboard.ts`, `employees.ts`, `sales.ts`,
  and `ai.ts` should be filled with typed wrappers as those APIs mature.
- `packages/api/src/hooks.ts` provides lightweight local query/mutation hooks.
  Avoid expanding generic `any` usage; introduce endpoint-specific types when
  touching a flow.
- `web` and `company` currently do not depend on `@repo/api`. One-off public
  form submissions may use an app-local helper or relative/proxied endpoint,
  but reusable API behavior should move to `packages/api`.
- Do not scatter raw backend URL strings through components. Centralize env
  parsing in a helper or in `@repo/api`.
- Keep `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_API_URL` behavior in mind:
  both exist today for deployment compatibility.

Server Component pattern:

```tsx
import { getDashboardStats } from "@repo/api/dashboard";

export default async function Page() {
  const stats = await getDashboardStats();
  return <Dashboard stats={stats} />;
}
```

Client Component pattern:

```tsx
"use client";

import { useEffect, useState } from "react";
import { getEmployees, type Employee } from "@repo/api/employees";

export function EmployeePanel() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    let ignore = false;

    getEmployees().then((data) => {
      if (!ignore) setEmployees(data);
    });

    return () => {
      ignore = true;
    };
  }, []);

  return <EmployeeTable employees={employees} />;
}
```

Use manual `fetch` only inside shared API clients or app-local helpers for
non-reusable public forms. Do not install TanStack Query, SWR, axios, or other
fetch/cache libraries.

## Product UI

For `crm`, `hris`, `pos`, and `ai-support`:

- Build dense, scan-friendly dashboard views rather than landing pages.
- Keep navigation and repeated shells app-local until two or more apps truly
  need the same abstraction.
- Use manual React state for filters, sorting, tabs, active rows, and modal
  state.
- Show empty, loading, and error states for async/product surfaces.
- Use `recharts` for charts and provide typed chart data plus responsive
  containers.

## Marketing UI

For `web` and `company`:

- Keep sections content-led and fast to scan.
- Use real brand/product assets from `public/` when they help the page.
- Keep localized copy in message files for `web`; do not hard-code translated
  text in shared sections.
- Use `framer-motion` only where motion improves comprehension or polish.
- Preserve SEO metadata, canonical URLs, and accessible headings when adding
  pages.

## Tables

Build tables manually with React state, `@repo/ui`, `clsx` or `cn`, and Tailwind
CSS.

Expected table behavior should be implemented explicitly:

- Filtering with controlled inputs.
- Sorting with local state.
- Pagination with local state.
- Empty, loading, and error states.
- Accessible table markup using `<table>`, `<thead>`, `<tbody>`, `<th>`, and
  `<td>`.

Do not install TanStack Table or any external data-grid/table package.

## Charts

Use `recharts` for charts. Keep chart data typed in TypeScript. Wrap chart
blocks in responsive containers and provide useful empty states when data is
missing. Do not add any other charting library.

## Imports

- App-local imports: `import { Hero } from "@/components/hero";`
- UI components: `import { Button } from "@repo/ui/button";`
- UI utilities: `import { cn } from "@repo/ui/lib/utils";`
- API wrappers/types: `import { getEmployees, type Employee } from "@repo/api/employees";`
- API hooks: `import { useAiChat } from "@repo/api/hooks";`
- Icons: `import { Search } from "lucide-react";`

Prefer workspace imports over relative imports across package boundaries.

## Tailwind, clsx, and TypeScript

- Use Tailwind utilities for styling.
- Use `cn` from `@repo/ui/lib/utils` for conditional classes.
- Keep class lists readable and grouped by layout, spacing, color, and state.
- Type component props explicitly.
- Avoid `any`; use `unknown` at boundaries and narrow it.
- Prefer derived values over duplicated state.
- Keep route/page files readable by extracting repeated UI to app-local
  components.

## Forbidden Anti-Patterns

- Do not put reusable API route wrappers inside apps. Put them in `@repo/api`.
- Do not define shared API response types inside individual apps.
- Do not add external fetching, table, chart, UI, or icon libraries.
- Do not duplicate reusable UI components across apps.
- Do not place secrets or server-only environment values in `NEXT_PUBLIC_*`.
- Do not make every component a Client Component by default.
- Do not add `@repo/api` to `web` or `company` only for a single one-off form;
  promote it when the behavior becomes reusable.

## Validation

From the repo root:

- One app type check: `npx turbo run check-types --filter=<app-name>`
- One app lint: `npx turbo run lint --filter=<app-name>`
- One app build: `npx turbo run build --filter=<app-name>`
- All frontend/package checks: `npm run lint` and `npm run check-types`
