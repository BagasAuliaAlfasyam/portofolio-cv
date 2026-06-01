import { apiClient, type ApiQueryParams } from "./client";

export type EmployeeStatus = "active" | "inactive" | "on-leave" | string;

export interface Employee {
  department: string;
  id: number;
  name: string;
  role: string;
  status: EmployeeStatus;
}

export interface EmployeeListParams extends ApiQueryParams {
  limit?: number;
  skip?: number;
}

export function getEmployees(params?: EmployeeListParams): Promise<Employee[]> {
  return apiClient.get<Employee[]>("/api/employees", params);
}

export function getEmployee(employeeId: number | string): Promise<Employee> {
  return apiClient.get<Employee>(`/api/employees/${employeeId}`);
}
