import type { AxiosInstance } from "axios";
import type { ApiListResponse, Collector } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listCollectors(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<Collector>> {
  const resp = await client.get<ApiListResponse<Collector>>(
    `${groupPath(group)}/collectors`
  );
  return resp.data;
}

export async function getCollector(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<Collector> {
  const resp = await client.get<{ items: Collector[] }>(
    `${groupPath(group)}/collectors/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createCollector(
  client: AxiosInstance,
  group: string,
  body: Record<string, unknown>
): Promise<Collector> {
  const resp = await client.post<Collector>(
    `${groupPath(group)}/collectors`,
    body
  );
  return resp.data;
}

export async function updateCollector(
  client: AxiosInstance,
  group: string,
  id: string,
  body: Record<string, unknown>
): Promise<Collector> {
  const resp = await client.patch<Collector>(
    `${groupPath(group)}/collectors/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteCollector(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<void> {
  await client.delete(
    `${groupPath(group)}/collectors/${encodeURIComponent(id)}`
  );
}
