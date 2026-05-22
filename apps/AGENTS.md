# AGENTS.md

Frontend instructions for all Next.js apps in `apps/*`.

## App Structure

Each app should follow this baseline structure:

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

Use `app/` for routes and route-level files. Use `components/` for app-specific UI. Move reusable components to `packages/ui`. Move shared API behavior and API response types to `packages/api`.

## App Router Conventions

- `layout.tsx`: define metadata, root shell, fonts, and providers.
- `page.tsx`: default to Server Components unless browser state, effects, or events are required.
- `loading.tsx`: route-level loading UI.
- `error.tsx`: client component with `"use client"` and a retry/reset path.
- Keep route-specific components near the route only when they are not reused elsewhere.
- Do not put API route wrappers inside apps. Put them in `@repo/api`.

## Data Fetching

All API calls must go through `@repo/api` wrappers.

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

Use manual `fetch` only inside `packages/api`. Do not install TanStack Query, SWR, axios, or other fetch/cache libraries.

## Tables

Build tables manually with React state, `@repo/ui`, `clsx` or `cn`, and Tailwind CSS.

Expected table behavior should be implemented explicitly:

- Filtering with controlled inputs.
- Sorting with local state.
- Pagination with local state.
- Empty, loading, and error states.
- Accessible table markup using `<table>`, `<thead>`, `<tbody>`, `<th>`, and `<td>`.

Do not install TanStack Table or any external data-grid/table package.

## Charts

Use `recharts` for charts. Keep chart data typed in TypeScript. Wrap chart blocks in responsive containers and provide useful empty states when data is missing. Do not add any other charting library.

## Imports

- UI components: `import { Button } from "@repo/ui/button";`
- UI utilities: `import { cn } from "@repo/ui/lib/utils";`
- API wrappers/types: `import { getEmployees, type Employee } from "@repo/api/employees";`
- Icons: `import { Search } from "lucide-react";`

Prefer workspace imports over relative imports across package boundaries.

## Tailwind, clsx, and TypeScript

- Use Tailwind utilities for styling.
- Use `cn` from `@repo/ui/lib/utils` for conditional classes.
- Keep class lists readable and grouped by layout, spacing, color, and state.
- Type component props explicitly.
- Avoid `any`; use `unknown` at boundaries and narrow it.
- Keep Client Components small and only add `"use client"` where needed.
- Prefer derived values over duplicated state.

## Forbidden Anti-Patterns

- Do not call backend endpoints directly from app components with raw URL strings.
- Do not define shared API response types inside individual apps.
- Do not add external fetching, table, chart, UI, or icon libraries.
- Do not duplicate reusable UI components across apps.
- Do not place secrets or server-only environment values in `NEXT_PUBLIC_*`.
- Do not make every component a Client Component by default.
