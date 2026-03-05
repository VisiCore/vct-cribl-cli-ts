import type { AxiosInstance } from "axios";
import type { ApiListResponse, Pack } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listPacks(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<Pack>> {
  const resp = await client.get<ApiListResponse<Pack>>(
    `${groupPath(group)}/packs`
  );
  return resp.data;
}

export async function getPack(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<Pack> {
  const resp = await client.get<{ items: Pack[] }>(
    `${groupPath(group)}/packs/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createPack(
  client: AxiosInstance,
  group: string,
  pack: Record<string, unknown>
): Promise<Pack> {
  const resp = await client.post<Pack>(
    `${groupPath(group)}/packs`,
    pack
  );
  return resp.data;
}

export async function deletePack(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<void> {
  await client.delete(
    `${groupPath(group)}/packs/${encodeURIComponent(id)}`
  );
}

export async function exportPack(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<unknown> {
  const resp = await client.get(
    `${groupPath(group)}/packs/${encodeURIComponent(id)}/export`
  );
  return resp.data;
}
