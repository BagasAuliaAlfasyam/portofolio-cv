# AGENTS.md

Shared package instructions for `packages/*`.

## Boundaries

- Packages must never import from `apps/*`.
- Packages may depend on other packages only when the dependency direction is reusable and stable.
- Shared API response types/interfaces belong in `packages/api`, not individual apps.
- Reusable UI belongs in `packages/ui`, not app-local component folders.
- Keep package exports explicit through each package's `package.json`.

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

The current `@repo/ui` export map exposes `./*` from `src/*.tsx` and `./lib/*` from `src/lib/*.ts`, so apps import components like:

```tsx
import { Button } from "@repo/ui/button";
```

## API Wrappers

Add API wrapper functions in `packages/api/src`.

Pattern:

```ts
import { apiClient } from "./client";

export interface Employee {
  id: string;
  name: string;
  email: string;
}

export async function getEmployees(): Promise<Employee[]> {
  return apiClient.get<Employee[]>("/api/employees");
}
```

Rules:

- Define request and response types in the same API module or a nearby shared API types module.
- Export typed functions for each endpoint.
- Keep raw `fetch` usage inside `packages/api`.
- Keep endpoint paths centralized in wrapper functions.
- Make wrappers usable from Server Components and Client Components.
- Do not add external fetching libraries.

The current `@repo/api` export map exposes `./*` from `src/*.ts`, so apps import wrappers like:

```tsx
import { getEmployees, type Employee } from "@repo/api/employees";
```

## Config Packages

- `packages/config`: shared project/site constants only.
- `packages/eslint-config`: shared lint rules.
- `packages/typescript-config`: shared TypeScript presets.

Avoid app-specific behavior in shared config packages.

## Validation

After changing packages, run from the repo root:

- `npm run lint`
- `npm run check-types`
- `npm run build` when package exports or shared behavior changed
