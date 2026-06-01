from fastapi import APIRouter

from schemas.dashboard import DashboardStatsResponse

router = APIRouter()


@router.get("/stats", response_model=DashboardStatsResponse)
def read_dashboard_stats() -> DashboardStatsResponse:
    return DashboardStatsResponse(
        mrr=240000000,
        active_users=12450,
        api_calls_today=84200,
        system_health=99.98,
    )
