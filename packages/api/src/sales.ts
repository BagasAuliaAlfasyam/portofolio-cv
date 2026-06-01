import { apiClient, type ApiQueryParams } from "./client";

export type SaleStatus = "lost" | "negotiation" | "open" | "won" | string;

export interface Sale {
  company: string;
  id: number;
  status: SaleStatus;
  value: number;
}

export type SalesListParams = ApiQueryParams;

export function getSales(params?: SalesListParams): Promise<Sale[]> {
  return apiClient.get<Sale[]>("/api/sales", params);
}
