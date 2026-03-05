import type { AxiosInstance } from "axios";
import type { ApiListResponse, Lookup } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listLookups(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<Lookup>> {
  const resp = await client.get<ApiListResponse<Lookup>>(
    `${groupPath(group)}/system/lookups`
  );
  return resp.data;
}

export async function getLookup(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<Lookup> {
  const resp = await client.get<{ items: Lookup[] }>(
    `${groupPath(group)}/system/lookups/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createLookup(
  client: AxiosInstance,
  group: string,
  lookup: Record<string, unknown>
): Promise<Lookup> {
  const resp = await client.post<Lookup>(
    `${groupPath(group)}/system/lookups`,
    lookup
  );
  return resp.data;
}

export async function deleteLookup(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<void> {
  await client.delete(
    `${groupPath(group)}/system/lookups/${encodeURIComponent(id)}`
  );
}
