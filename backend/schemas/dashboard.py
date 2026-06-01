from pydantic import BaseModel


class DashboardStatsResponse(BaseModel):
    mrr: int
    active_users: int
    api_calls_today: int
    system_health: float
