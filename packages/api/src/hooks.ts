import { useCallback, useEffect, useRef, useState } from "react";
import type {
  AiChatRequest,
  AiChatResponse,
  AiPredictRequest,
  AiPredictResponse,
  AiRecommendationItem,
} from "./ai";
import { apiClient, type ApiQueryParams } from "./client";
import type { DashboardStats } from "./dashboard";
import type { Employee } from "./employees";
import type { Sale } from "./sales";

type ApiRecord = Record<string, unknown>;

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
    variables: TVariables,
  ) => void;
};

type MutateOptions<TData, TVariables> = ApiMutationOptions<TData, TVariables>;

export function useApiQuery<T>(
  key: string[],
  endpoint: string,
  params?: ApiQueryParams,
  options: ApiQueryOptions<T> = {},
) {
  const { enabled = true, initialData, onSuccess, onError } = options;
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(
    enabled && initialData === undefined,
  );
  const [isFetching, setIsFetching] = useState(false);
  const requestIdRef = useRef(0);
  const paramsRef = useRef<ApiQueryParams | undefined>(params);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  const keySignature = JSON.stringify(key);
  const paramsSignature = JSON.stringify(params ?? {});

  useEffect(() => {
    paramsRef.current = params;
  }, [params, paramsSignature]);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  }, [onError, onSuccess]);

  const refetch = useCallback(async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsFetching(true);
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiClient.get<T>(endpoint, paramsRef.current);

      if (requestIdRef.current === requestId) {
        setData(result);
        onSuccessRef.current?.(result);
      }

      return result;
    } catch (caught) {
      const nextError =
        caught instanceof Error ? caught : new Error("Unknown API error");

      if (requestIdRef.current === requestId) {
        setError(nextError);
        onErrorRef.current?.(nextError);
      }

      throw nextError;
    } finally {
      if (requestIdRef.current === requestId) {
        setIsLoading(false);
        setIsFetching(false);
      }
    }
  }, [endpoint]);

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
  options: ApiMutationOptions<TData, TVariables> = {},
) {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const mutateAsync = useCallback(
    async (
      variables: TVariables,
      mutateOptions: MutateOptions<TData, TVariables> = {},
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

        const baseOptions = optionsRef.current;
        setData(result);
        baseOptions.onSuccess?.(result, variables);
        mutateOptions.onSuccess?.(result, variables);
        baseOptions.onSettled?.(result, null, variables);
        mutateOptions.onSettled?.(result, null, variables);
        return result;
      } catch (caught) {
        const nextError =
          caught instanceof Error ? caught : new Error("Unknown API error");

        setError(nextError);
        const baseOptions = optionsRef.current;
        baseOptions.onError?.(nextError, variables);
        mutateOptions.onError?.(nextError, variables);
        baseOptions.onSettled?.(undefined, nextError, variables);
        mutateOptions.onSettled?.(undefined, nextError, variables);
        throw nextError;
      } finally {
        setIsPending(false);
      }
    },
    [endpoint, method],
  );

  const mutate = useCallback(
    (
      variables: TVariables,
      mutateOptions: MutateOptions<TData, TVariables> = {},
    ) => {
      mutateAsync(variables, mutateOptions).catch(() => undefined);
    },
    [mutateAsync],
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

export function useEmployees(params?: ApiQueryParams) {
  return useApiQuery<Employee[]>(["employees"], "/api/employees", params);
}

export function useEmployee(id: number | string) {
  return useApiQuery<Employee>(
    ["employee", String(id)],
    `/api/employees/${id}`,
    undefined,
    {
      enabled: Boolean(id),
    },
  );
}

export function useSales(params?: ApiQueryParams) {
  return useApiQuery<Sale[]>(["sales"], "/api/sales", params);
}

export function useTasks(params?: ApiQueryParams) {
  return useApiQuery<ApiRecord[]>(["tasks"], "/api/tasks", params);
}

export function useTransactions(params?: ApiQueryParams) {
  return useApiQuery<ApiRecord[]>(
    ["transactions"],
    "/api/transactions",
    params,
  );
}

export function useAiChat() {
  return useApiMutation<AiChatResponse, AiChatRequest>("/ai/chat", "POST");
}

export function useAiPredict() {
  return useApiMutation<AiPredictResponse, AiPredictRequest>(
    "/ai/predict",
    "POST",
  );
}

export function useAiRecommend(userId: string) {
  return useApiQuery<AiRecommendationItem[]>(
    ["ai-recommend", userId],
    "/ai/recommend",
    { user_id: userId },
    { enabled: Boolean(userId) },
  );
}

export function useDashboardStats() {
  return useApiQuery<DashboardStats>(
    ["dashboard-stats"],
    "/api/dashboard/stats",
  );
}
