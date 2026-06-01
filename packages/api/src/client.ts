const DEFAULT_API_BASE_URL = "http://localhost:8001";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL
).replace(/\/$/, "");

export type ApiQueryParams = Record<
  string,
  boolean | null | number | string | undefined
>;

interface RequestOptions extends RequestInit {
  params?: ApiQueryParams;
}

export class ApiError extends Error {
  details: unknown;
  status: number;
  statusText: string;

  constructor(response: Response, details: unknown) {
    super(`API Error: ${response.status} ${response.statusText}`);
    this.name = "ApiError";
    this.details = details;
    this.status = response.status;
    this.statusText = response.statusText;
  }
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const { params, ...init } = options;

    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          searchParams.set(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const response = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
    });

    const responseText = await response.text();
    const responseBody = parseResponseBody(responseText);

    if (!response.ok) {
      throw new ApiError(response, responseBody);
    }

    return responseBody as T;
  }

  async get<T>(endpoint: string, params?: ApiQueryParams): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", params });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default ApiClient;

function parseResponseBody(responseText: string): unknown {
  if (!responseText) {
    return undefined;
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return responseText;
  }
}
