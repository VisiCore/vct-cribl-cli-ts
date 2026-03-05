import type { AxiosInstance } from "axios";
import type { ApiListResponse, Dashboard } from "../types.js";

function searchPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}/search`;
}

export async function listDashboards(
  client: AxiosInstance,
  group?: string
): Promise<ApiListResponse<Dashboard>> {
  const g = group ?? "default_search";
  const resp = await client.get<ApiListResponse<Dashboard>>(
    `${searchPath(g)}/dashboards`
  );
  return resp.data;
}

export async function getDashboard(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<Dashboard> {
  const g = group ?? "default_search";
  const resp = await client.get<{ items: Dashboard[] }>(
    `${searchPath(g)}/dashboards/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createDashboard(
  client: AxiosInstance,
  dashboard: Record<string, unknown>,
  group?: string
): Promise<Dashboard> {
  const g = group ?? "default_search";
  const resp = await client.post<Dashboard>(
    `${searchPath(g)}/dashboards`,
    dashboard
  );
  return resp.data;
}

export async function deleteDashboard(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<void> {
  const g = group ?? "default_search";
  await client.delete(
    `${searchPath(g)}/dashboards/${encodeURIComponent(id)}`
  );
}
