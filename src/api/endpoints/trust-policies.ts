import type { AxiosInstance } from "axios";
import type { ApiListResponse, TrustPolicy } from "../types.js";

function searchPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}/search`;
}

export async function listTrustPolicies(
  client: AxiosInstance,
  group?: string
): Promise<ApiListResponse<TrustPolicy>> {
  const g = group ?? "default_search";
  const resp = await client.get<ApiListResponse<TrustPolicy>>(
    `${searchPath(g)}/trust-policies`
  );
  return resp.data;
}

export async function getTrustPolicy(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<TrustPolicy> {
  const g = group ?? "default_search";
  const resp = await client.get<{ items: TrustPolicy[] }>(
    `${searchPath(g)}/trust-policies/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createTrustPolicy(
  client: AxiosInstance,
  body: Record<string, unknown>,
  group?: string
): Promise<TrustPolicy> {
  const g = group ?? "default_search";
  const resp = await client.post<TrustPolicy>(
    `${searchPath(g)}/trust-policies`,
    body
  );
  return resp.data;
}

export async function updateTrustPolicy(
  client: AxiosInstance,
  id: string,
  body: Record<string, unknown>,
  group?: string
): Promise<TrustPolicy> {
  const g = group ?? "default_search";
  const resp = await client.patch<TrustPolicy>(
    `${searchPath(g)}/trust-policies/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteTrustPolicy(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<void> {
  const g = group ?? "default_search";
  await client.delete(
    `${searchPath(g)}/trust-policies/${encodeURIComponent(id)}`
  );
}
