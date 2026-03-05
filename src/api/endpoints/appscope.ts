import type { AxiosInstance } from "axios";
import type { ApiListResponse, AppscopeConfig } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listAppscopeConfigs(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<AppscopeConfig>> {
  const resp = await client.get<ApiListResponse<AppscopeConfig>>(
    `${groupPath(group)}/lib/appscope-configs`
  );
  return resp.data;
}

export async function getAppscopeConfig(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<AppscopeConfig> {
  const resp = await client.get<{ items: AppscopeConfig[] }>(
    `${groupPath(group)}/lib/appscope-configs/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createAppscopeConfig(
  client: AxiosInstance,
  group: string,
  body: Record<string, unknown>
): Promise<AppscopeConfig> {
  const resp = await client.post<AppscopeConfig>(
    `${groupPath(group)}/lib/appscope-configs`,
    body
  );
  return resp.data;
}

export async function updateAppscopeConfig(
  client: AxiosInstance,
  group: string,
  id: string,
  body: Record<string, unknown>
): Promise<AppscopeConfig> {
  const resp = await client.patch<AppscopeConfig>(
    `${groupPath(group)}/lib/appscope-configs/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteAppscopeConfig(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<void> {
  await client.delete(
    `${groupPath(group)}/lib/appscope-configs/${encodeURIComponent(id)}`
  );
}
