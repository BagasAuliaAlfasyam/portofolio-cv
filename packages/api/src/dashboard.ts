import { apiClient } from "./client";

export interface DashboardStats {
  active_users: number;
  api_calls_today: number;
  mrr: number;
  system_health: number;
}

export function getDashboardStats(): Promise<DashboardStats> {
  return apiClient.get<DashboardStats>("/api/dashboard/stats");
}
