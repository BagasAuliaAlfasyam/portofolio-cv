# AGENTS.md

Backend instructions for the FastAPI service in `backend/`.

## Current Service Shape

The backend is a FastAPI API service for Catalyst Forge demos and public site
integrations. It normally runs on port `8001`.

Current routes:

- `GET /health`
- `GET /api/employees`
- `GET /api/employees/{employee_id}`
- `GET /api/sales`
- `GET /api/dashboard/stats`
- `POST /api/contact`
- `POST /ai/chat`
- `POST /ai/predict`
- `GET /ai/recommend`

`API_V1_STR` defaults to an empty string, so route prefixes above are the active
paths unless configuration changes.

## Structure

Use this structure for new backend code:

```text
backend/
  main.py
  api/
    deps.py
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
- `api/deps.py`: shared FastAPI dependencies, including future auth/current-user
  dependencies.
- `core`: configuration, database/session setup, security helpers, and business
  services.
- `models`: SQLAlchemy database models.
- `schemas`: Pydantic request/response schemas.

`core/database.py` and `core/security.py` are currently scaffolds. Create real
implementations there when adding database or auth behavior.

## Python Conventions

- Modules, variables, and functions: snake_case.
- Classes, SQLAlchemy models, and Pydantic schemas: PascalCase.
- Constants and environment keys: UPPER_SNAKE_CASE.
- Prefer async endpoints when performing I/O.
- Keep route handlers thin. Put business logic in `core`.
- Type function signatures and return values.
- Use Pydantic models for request bodies and response models.

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

## Contact and Email

`POST /api/contact` is used by the public web contact form.

- Validate request data in `schemas/contact.py`.
- Keep the honeypot field behavior intact unless replacing spam protection.
- Keep rate limiting conservative and avoid logging personal data.
- Email delivery uses Resend through `RESEND_API_KEY`, `CONTACT_FROM`, and
  `CONTACT_TO`.
- Never log API keys, raw credentials, or full inbound messages in production
  logs.

## AI Routes

`POST /ai/chat` uses Gemini through `google-genai` when `GEMINI_API_KEY` is set
and falls back to a local mock response otherwise.

- Keep provider failures graceful for demo usage.
- Do not hard-code user secrets or provider keys.
- Keep prompts short, product-scoped, and isolated from request plumbing.
- If adding another provider, hide it behind a small service/helper instead of
  branching heavily inside route handlers.

## PostgreSQL Pattern

Auth and PostgreSQL are not fully implemented yet, but new database-backed code
must be ready for async SQLAlchemy and `asyncpg`.

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

Do not create new database connections inside route handlers. Use dependency
injection.

## JWT-Ready Auth

Auth is not implemented yet, but new protected endpoints should be easy to wire
into JWT auth.

Expected structure:

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

Do not hard-code fake users into business logic. Keep auth concerns isolated in
dependencies.

## Response and Error Conventions

- Prefer typed response models.
- Use HTTP status codes correctly. Do not return `200` for validation failures,
  auth failures, or missing resources.
- Existing demo list endpoints return plain lists/objects. Keep compatible
  response shapes unless coordinating frontend changes.
- If introducing envelope-style responses for a new area, use the shape
  consistently across that area and update `packages/api` types at the same
  time.

## Environment

Important backend environment keys:

- `PORT`
- `BACKEND_CORS_ORIGINS`
- `DATABASE_URL`
- `POSTGRES_SERVER`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `CONTACT_FROM`
- `CONTACT_TO`

CORS is currently permissive in `main.py`. If tightening it, wire the deployed
`BACKEND_CORS_ORIGINS` value through settings and update deployment docs.

## Forbidden Anti-Patterns

- Do not put business logic directly in large route handlers.
- Do not create synchronous database access for new PostgreSQL code.
- Do not bypass Pydantic validation for request bodies.
- Do not return inconsistent response shapes for similar endpoints.
- Do not log secrets, tokens, database URLs, or raw credentials.
- Do not commit `.env` files, generated virtual environments, or `__pycache__`.

## Validation

After backend changes:

- Install/update dependencies from `backend/requirements.txt` if needed.
- Run `python main.py` or
  `uvicorn main:app --host 0.0.0.0 --port 8001 --reload`.
- Validate `GET /health`.
- Validate changed endpoints manually or with tests when tests are added.
