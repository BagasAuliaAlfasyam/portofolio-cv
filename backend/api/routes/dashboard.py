from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()

@router.get("/stats", response_model=Dict[str, Any])
def read_dashboard_stats():
    return {
        "mrr": 240000000,
        "active_users": 12450,
        "api_calls_today": 84200,
        "system_health": 99.98
    }
