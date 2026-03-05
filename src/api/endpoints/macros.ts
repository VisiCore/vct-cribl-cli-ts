import type { AxiosInstance } from "axios";
import type { ApiListResponse, Macro } from "../types.js";

function searchPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}/search`;
}

export async function listMacros(
  client: AxiosInstance,
  group?: string
): Promise<ApiListResponse<Macro>> {
  const g = group ?? "default_search";
  const resp = await client.get<ApiListResponse<Macro>>(
    `${searchPath(g)}/macros`
  );
  return resp.data;
}

export async function getMacro(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<Macro> {
  const g = group ?? "default_search";
  const resp = await client.get<{ items: Macro[] }>(
    `${searchPath(g)}/macros/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createMacro(
  client: AxiosInstance,
  body: Record<string, unknown>,
  group?: string
): Promise<Macro> {
  const g = group ?? "default_search";
  const resp = await client.post<Macro>(
    `${searchPath(g)}/macros`,
    body
  );
  return resp.data;
}

export async function updateMacro(
  client: AxiosInstance,
  id: string,
  body: Record<string, unknown>,
  group?: string
): Promise<Macro> {
  const g = group ?? "default_search";
  const resp = await client.patch<Macro>(
    `${searchPath(g)}/macros/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteMacro(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<void> {
  const g = group ?? "default_search";
  await client.delete(
    `${searchPath(g)}/macros/${encodeURIComponent(id)}`
  );
}
