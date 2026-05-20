import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiClient } from "./client";

type ApiQueryOptions<T> = {
  enabled?: boolean;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

type ApiMutationOptions<TData, TVariables> = {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  onSettled?: (
    data: TData | undefined,
    error: Error | null,
    variables: TVariables
  ) => void;
};

type MutateOptions<TData, TVariables> = ApiMutationOptions<TData, TVariables>;

export function useApiQuery<T>(
  key: string[],
  endpoint: string,
  params?: Record<string, string>,
  options: ApiQueryOptions<T> = {}
) {
  const { enabled = true, initialData, onSuccess, onError } = options;
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(enabled && initialData === undefined);
  const [isFetching, setIsFetching] = useState(false);
  const requestIdRef = useRef(0);

  const keySignature = JSON.stringify(key);
  const paramsSignature = JSON.stringify(params ?? {});
  const stableParams = useMemo(() => params, [paramsSignature]);

  const refetch = useCallback(async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsFetching(true);
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiClient.get<T>(endpoint, stableParams);

      if (requestIdRef.current === requestId) {
        setData(result);
        onSuccess?.(result);
      }

      return result;
    } catch (caught) {
      const nextError =
        caught instanceof Error ? caught : new Error("Unknown API error");

      if (requestIdRef.current === requestId) {
        setError(nextError);
        onError?.(nextError);
      }

      throw nextError;
    } finally {
      if (requestIdRef.current === requestId) {
        setIsLoading(false);
        setIsFetching(false);
      }
    }
  }, [endpoint, onError, onSuccess, stableParams]);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    refetch().catch(() => undefined);
  }, [enabled, keySignature, refetch]);

  return {
    data,
    error,
    isError: error !== null,
    isFetching,
    isLoading,
    isPending: isLoading,
    refetch,
  };
}

export function useApiMutation<TData, TVariables>(
  endpoint: string,
  method: "POST" | "PUT" | "DELETE" = "POST",
  options: ApiMutationOptions<TData, TVariables> = {}
) {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = useCallback(
    async (
      variables: TVariables,
      mutateOptions: MutateOptions<TData, TVariables> = {}
    ) => {
      setIsPending(true);
      setError(null);

      try {
        let result: TData;

        switch (method) {
          case "POST":
            result = await apiClient.post<TData>(endpoint, variables);
            break;
          case "PUT":
            result = await apiClient.put<TData>(endpoint, variables);
            break;
          case "DELETE":
            result = await apiClient.delete<TData>(endpoint);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        setData(result);
        options.onSuccess?.(result, variables);
        mutateOptions.onSuccess?.(result, variables);
        options.onSettled?.(result, null, variables);
        mutateOptions.onSettled?.(result, null, variables);
        return result;
      } catch (caught) {
        const nextError =
          caught instanceof Error ? caught : new Error("Unknown API error");

        setError(nextError);
        options.onError?.(nextError, variables);
        mutateOptions.onError?.(nextError, variables);
        options.onSettled?.(undefined, nextError, variables);
        mutateOptions.onSettled?.(undefined, nextError, variables);
        throw nextError;
      } finally {
        setIsPending(false);
      }
    },
    [endpoint, method, options]
  );

  const mutate = useCallback(
    (
      variables: TVariables,
      mutateOptions: MutateOptions<TData, TVariables> = {}
    ) => {
      mutateAsync(variables, mutateOptions).catch(() => undefined);
    },
    [mutateAsync]
  );

  return {
    data,
    error,
    isError: error !== null,
    isIdle: !isPending && data === undefined && error === null,
    isPending,
    mutate,
    mutateAsync,
  };
}

export function useEmployees(params?: Record<string, string>) {
  return useApiQuery<any[]>(["employees"], "/api/employees", params);
}

export function useEmployee(id: string) {
  return useApiQuery<any>(["employee", id], `/api/employees/${id}`, undefined, {
    enabled: Boolean(id),
  });
}

export function useSales(params?: Record<string, string>) {
  return useApiQuery<any[]>(["sales"], "/api/sales", params);
}

export function useTasks(params?: Record<string, string>) {
  return useApiQuery<any[]>(["tasks"], "/api/tasks", params);
}

export function useTransactions(params?: Record<string, string>) {
  return useApiQuery<any[]>(["transactions"], "/api/transactions", params);
}

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
    { user_id: userId },
    { enabled: Boolean(userId) }
  );
}

export function useDashboardStats() {
  return useApiQuery<any>(["dashboard-stats"], "/api/dashboard/stats");
}
