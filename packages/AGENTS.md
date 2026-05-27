# AGENTS.md

Shared package instructions for `packages/*`.

## Package Boundaries

- Packages must never import from `apps/*`.
- Packages may depend on other packages only when the dependency direction is
  reusable and stable.
- Shared API response types/interfaces belong in `packages/api`, not individual
  apps.
- Reusable UI belongs in `packages/ui`, not app-local component folders.
- Keep package exports explicit through each package's `package.json`.
- Do not add app-specific copy, routes, or business flows to shared packages.

## Current Packages

- `@repo/api`: shared API client, local query/mutation hooks, and endpoint
  wrapper modules. `client.ts` reads `NEXT_PUBLIC_API_URL` and defaults to
  `http://localhost:8001`.
- `@repo/ui`: shared React components and `cn` utility. The export map exposes
  `./*` from `src/*.tsx` and `./lib/*` from `src/lib/*.ts`.
- `@repo/config`: shared project/site constants. It currently contains
  `site.ts`; do not rely on additional exports unless the files exist.
- `@repo/eslint-config`: shared ESLint flat configs.
- `@repo/typescript-config`: shared TypeScript presets.

## UI Components

Create shared UI components in `packages/ui/src`.

Component pattern:

```tsx
import * as React from "react";
import { cn } from "./lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function EmptyState({
  title,
  description,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div className={cn("rounded-lg border p-6", className)} {...props}>
      <h2 className="text-sm font-semibold">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      ) : null}
    </div>
  );
}
```

Rules:

- Use PascalCase exports.
- Use `React.forwardRef` when wrapping native interactive elements.
- Use `cn` from `packages/ui/src/lib/utils.ts` for class merging.
- Keep styling compatible with Tailwind consumers.
- Use `lucide-react` for icons.
- Do not add new UI libraries.

Apps import shared UI like:

```tsx
import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui/lib/utils";
```

## API Client and Hooks

Add reusable API wrapper functions in `packages/api/src`.

Current backend routes include:

- `/api/employees`
- `/api/sales`
- `/api/dashboard/stats`
- `/api/contact`
- `/ai/chat`
- `/ai/predict`
- `/ai/recommend`

Preferred endpoint module pattern:

```ts
import { apiClient } from "./client";

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  status: string;
}

export async function getEmployees(): Promise<Employee[]> {
  return apiClient.get<Employee[]>("/api/employees");
}
```

Rules:

- Define request and response types in the same API module or a nearby shared
  API types module.
- Export typed functions for each endpoint.
- Keep raw `fetch` usage inside `packages/api` for shared calls.
- Keep endpoint paths centralized in wrapper functions.
- Make wrappers usable from Server Components and Client Components.
- Keep hooks lightweight; do not recreate a full external query library.
- Replace `any` in existing hooks when touching the related flow.
- Do not add external fetching libraries.

Apps import API wrappers like:

```tsx
import { getEmployees, type Employee } from "@repo/api/employees";
```

## Config Packages

- `packages/config`: shared project/site constants only.
- `packages/eslint-config`: shared lint rules.
- `packages/typescript-config`: shared TypeScript presets.

Avoid app-specific behavior in shared config packages. If adding an exported
config file, create the file and update the export map in the same change.

## Validation

After changing packages, run from the repo root:

- `npm run lint`
- `npm run check-types`
- `npm run build` when package exports or shared behavior changed
