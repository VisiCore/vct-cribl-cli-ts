import type { AxiosInstance } from "axios";
import type { ApiListResponse, Policy } from "../types.js";

export async function listPolicies(client: AxiosInstance): Promise<ApiListResponse<Policy>> {
  const resp = await client.get<ApiListResponse<Policy>>("/api/v1/system/policies");
  return resp.data;
}

export async function getPolicy(client: AxiosInstance, id: string): Promise<Policy> {
  const resp = await client.get<{ items: Policy[] }>(`/api/v1/system/policies/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function createPolicy(client: AxiosInstance, data: Record<string, unknown>): Promise<Policy> {
  const resp = await client.post<Policy>("/api/v1/system/policies", data);
  return resp.data;
}

export async function updatePolicy(client: AxiosInstance, id: string, data: Record<string, unknown>): Promise<Policy> {
  const resp = await client.patch<Policy>(`/api/v1/system/policies/${encodeURIComponent(id)}`, data);
  return resp.data;
}

export async function deletePolicy(client: AxiosInstance, id: string): Promise<void> {
  await client.delete(`/api/v1/system/policies/${encodeURIComponent(id)}`);
}
