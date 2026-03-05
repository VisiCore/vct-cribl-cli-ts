import type { AxiosInstance } from "axios";
import type { ApiListResponse, UsageGroup } from "../types.js";

function searchPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}/search`;
}

export async function listUsageGroups(
  client: AxiosInstance,
  group?: string
): Promise<ApiListResponse<UsageGroup>> {
  const g = group ?? "default_search";
  const resp = await client.get<ApiListResponse<UsageGroup>>(
    `${searchPath(g)}/usage-groups`
  );
  return resp.data;
}

export async function getUsageGroup(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<UsageGroup> {
  const g = group ?? "default_search";
  const resp = await client.get<{ items: UsageGroup[] }>(
    `${searchPath(g)}/usage-groups/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}
