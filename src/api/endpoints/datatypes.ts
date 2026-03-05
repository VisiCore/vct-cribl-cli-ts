import type { AxiosInstance } from "axios";
import type { ApiListResponse, Datatype } from "../types.js";

function searchPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}/search`;
}

export async function listDatatypes(
  client: AxiosInstance,
  group?: string
): Promise<ApiListResponse<Datatype>> {
  const g = group ?? "default_search";
  const resp = await client.get<ApiListResponse<Datatype>>(
    `${searchPath(g)}/datatypes`
  );
  return resp.data;
}

export async function getDatatype(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<Datatype> {
  const g = group ?? "default_search";
  const resp = await client.get<{ items: Datatype[] }>(
    `${searchPath(g)}/datatypes/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createDatatype(
  client: AxiosInstance,
  body: Record<string, unknown>,
  group?: string
): Promise<Datatype> {
  const g = group ?? "default_search";
  const resp = await client.post<Datatype>(
    `${searchPath(g)}/datatypes`,
    body
  );
  return resp.data;
}

export async function updateDatatype(
  client: AxiosInstance,
  id: string,
  body: Record<string, unknown>,
  group?: string
): Promise<Datatype> {
  const g = group ?? "default_search";
  const resp = await client.patch<Datatype>(
    `${searchPath(g)}/datatypes/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteDatatype(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<void> {
  const g = group ?? "default_search";
  await client.delete(
    `${searchPath(g)}/datatypes/${encodeURIComponent(id)}`
  );
}
