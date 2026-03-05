import type { AxiosInstance } from "axios";
import type { ApiListResponse, DashboardCategory } from "../types.js";

function searchPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}/search`;
}

export async function listDashboardCategories(
  client: AxiosInstance,
  group?: string
): Promise<ApiListResponse<DashboardCategory>> {
  const g = group ?? "default_search";
  const resp = await client.get<ApiListResponse<DashboardCategory>>(
    `${searchPath(g)}/dashboard-categories`
  );
  return resp.data;
}

export async function getDashboardCategory(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<DashboardCategory> {
  const g = group ?? "default_search";
  const resp = await client.get<{ items: DashboardCategory[] }>(
    `${searchPath(g)}/dashboard-categories/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createDashboardCategory(
  client: AxiosInstance,
  body: Record<string, unknown>,
  group?: string
): Promise<DashboardCategory> {
  const g = group ?? "default_search";
  const resp = await client.post<DashboardCategory>(
    `${searchPath(g)}/dashboard-categories`,
    body
  );
  return resp.data;
}

export async function updateDashboardCategory(
  client: AxiosInstance,
  id: string,
  body: Record<string, unknown>,
  group?: string
): Promise<DashboardCategory> {
  const g = group ?? "default_search";
  const resp = await client.patch<DashboardCategory>(
    `${searchPath(g)}/dashboard-categories/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteDashboardCategory(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<void> {
  const g = group ?? "default_search";
  await client.delete(
    `${searchPath(g)}/dashboard-categories/${encodeURIComponent(id)}`
  );
}
