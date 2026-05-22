# AGENTS.md

Backend instructions for the FastAPI service in `backend/`.

## Structure

Use this structure for new backend code:

```text
backend/
  main.py
  api/
    router.py
    routes/
      resource.py
  core/
    config.py
    database.py
    security.py
  models/
    resource.py
  schemas/
    resource.py
```

- `api/routes`: HTTP route definitions only.
- `core`: configuration, database/session setup, security helpers, and business services.
- `models`: SQLAlchemy database models.
- `schemas`: Pydantic request/response schemas.

Create missing folders as needed when adding real models/schemas.

## Python Conventions

- Modules, variables, and functions: snake_case.
- Classes, SQLAlchemy models, and Pydantic schemas: PascalCase.
- Constants and environment keys: UPPER_SNAKE_CASE.
- Prefer async endpoints when performing I/O.
- Keep route handlers thin. Put business logic in `core`.
- Type function signatures and return values.

## Endpoint Pattern

```py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from schemas.customer import CustomerCreate, CustomerResponse

router = APIRouter()


@router.post("/", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
async def create_customer(
    payload: CustomerCreate,
    db: AsyncSession = Depends(get_db),
) -> CustomerResponse:
    try:
        return await customer_service.create_customer(db=db, payload=payload)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
```

Register route modules in `api/router.py` using stable prefixes and tags.

## JSON Response Conventions

Prefer typed response models. For envelope-style responses, use this shape consistently:

Success:

```json
{
  "success": true,
  "data": {},
  "message": "Optional human-readable message"
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Resource not found"
  }
}
```

Use HTTP status codes correctly. Do not return `200` for validation failures, auth failures, or missing resources.

## PostgreSQL Pattern

Use SQLAlchemy async engine/session with `asyncpg`.

```py
from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from core.config import settings

engine = create_async_engine(settings.DATABASE_URL, pool_pre_ping=True)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session
```

Do not create new database connections inside route handlers. Use dependency injection.

## Validation and Schemas

- Use Pydantic models for request bodies and response models.
- Keep validation rules close to schemas.
- Do not accept raw untyped `dict` payloads unless the endpoint truly accepts arbitrary JSON.
- Use separate create/update/read schemas when fields differ.

## JWT-Ready Auth

Auth is not implemented yet, but new protected endpoints should be easy to wire into JWT auth.

Expected future structure:

```text
core/security.py
api/deps.py
models/user.py
schemas/auth.py
```

Use placeholder dependencies where needed:

```py
async def get_current_user() -> None:
    # Replace with JWT validation when auth is implemented.
    return None
```

Do not hard-code fake users into business logic. Keep auth concerns isolated in dependencies.

## Forbidden Anti-Patterns

- Do not put business logic directly in large route handlers.
- Do not create synchronous database access for new PostgreSQL code.
- Do not bypass Pydantic validation for request bodies.
- Do not return inconsistent response shapes for similar endpoints.
- Do not log secrets, tokens, database URLs, or raw credentials.
- Do not commit `.env` files or generated virtual environments.
