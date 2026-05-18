from fastapi import APIRouter
from api.routes import employees, ai, sales, dashboard

api_router = APIRouter()

api_router.include_router(employees.router, prefix="/api/employees", tags=["employees"])
api_router.include_router(sales.router, prefix="/api/sales", tags=["sales"])
api_router.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
