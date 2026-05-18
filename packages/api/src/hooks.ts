import {
  useQuery,
  useMutation,
  type UseQueryOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { apiClient } from "./client";

// ─── Generic Query Hook ──────────────────────────────────────────
export function useApiQuery<T>(
  key: string[],
  endpoint: string,
  params?: Record<string, string>,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) {
  return useQuery<T>({
    queryKey: key,
    queryFn: () => apiClient.get<T>(endpoint, params),
    ...options,
  });
}

// ─── Generic Mutation Hook ───────────────────────────────────────
export function useApiMutation<TData, TVariables>(
  endpoint: string,
  method: "POST" | "PUT" | "DELETE" = "POST",
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn">
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      switch (method) {
        case "POST":
          return apiClient.post<TData>(endpoint, variables);
        case "PUT":
          return apiClient.put<TData>(endpoint, variables);
        case "DELETE":
          return apiClient.delete<TData>(endpoint);
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    },
    ...options,
  });
}

// ─── Domain-Specific Hooks ───────────────────────────────────────

// Employees
export function useEmployees(params?: Record<string, string>) {
  return useApiQuery<any[]>(["employees"], "/api/employees", params);
}

export function useEmployee(id: string) {
  return useApiQuery<any>(["employee", id], `/api/employees/${id}`);
}

// Sales
export function useSales(params?: Record<string, string>) {
  return useApiQuery<any[]>(["sales"], "/api/sales", params);
}

// Tasks
export function useTasks(params?: Record<string, string>) {
  return useApiQuery<any[]>(["tasks"], "/api/tasks", params);
}

// Transactions
export function useTransactions(params?: Record<string, string>) {
  return useApiQuery<any[]>(["transactions"], "/api/transactions", params);
}

// AI
export function useAiChat() {
  return useApiMutation<any, { message: string }>("/ai/chat", "POST");
}

export function useAiPredict() {
  return useApiMutation<any, any>("/ai/predict", "POST");
}

export function useAiRecommend(userId: string) {
  return useApiQuery<any[]>(
    ["ai-recommend", userId],
    "/ai/recommend",
    { user_id: userId }
  );
}

// Dashboard Stats
export function useDashboardStats() {
  return useApiQuery<any>(["dashboard-stats"], "/api/dashboard/stats");
}
