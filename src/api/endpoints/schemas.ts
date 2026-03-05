import type { AxiosInstance } from "axios";
import type { ApiListResponse, Schema } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listSchemas(client: AxiosInstance, group: string): Promise<ApiListResponse<Schema>> {
  const resp = await client.get<ApiListResponse<Schema>>(`${groupPath(group)}/lib/schemas`);
  return resp.data;
}

export async function getSchema(client: AxiosInstance, group: string, id: string): Promise<Schema> {
  const resp = await client.get<{ items: Schema[] }>(`${groupPath(group)}/lib/schemas/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function createSchema(client: AxiosInstance, group: string, data: Record<string, unknown>): Promise<Schema> {
  const resp = await client.post<Schema>(`${groupPath(group)}/lib/schemas`, data);
  return resp.data;
}

export async function updateSchema(client: AxiosInstance, group: string, id: string, data: Record<string, unknown>): Promise<Schema> {
  const resp = await client.patch<Schema>(`${groupPath(group)}/lib/schemas/${encodeURIComponent(id)}`, data);
  return resp.data;
}

export async function deleteSchema(client: AxiosInstance, group: string, id: string): Promise<void> {
  await client.delete(`${groupPath(group)}/lib/schemas/${encodeURIComponent(id)}`);
}
