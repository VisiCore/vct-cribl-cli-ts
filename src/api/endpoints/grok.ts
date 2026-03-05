import type { AxiosInstance } from "axios";
import type { ApiListResponse, GrokPattern } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listGrok(client: AxiosInstance, group: string): Promise<ApiListResponse<GrokPattern>> {
  const resp = await client.get<ApiListResponse<GrokPattern>>(`${groupPath(group)}/lib/grok`);
  return resp.data;
}

export async function getGrok(client: AxiosInstance, group: string, id: string): Promise<GrokPattern> {
  const resp = await client.get<{ items: GrokPattern[] }>(`${groupPath(group)}/lib/grok/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function createGrok(client: AxiosInstance, group: string, data: Record<string, unknown>): Promise<GrokPattern> {
  const resp = await client.post<GrokPattern>(`${groupPath(group)}/lib/grok`, data);
  return resp.data;
}

export async function updateGrok(client: AxiosInstance, group: string, id: string, data: Record<string, unknown>): Promise<GrokPattern> {
  const resp = await client.patch<GrokPattern>(`${groupPath(group)}/lib/grok/${encodeURIComponent(id)}`, data);
  return resp.data;
}

export async function deleteGrok(client: AxiosInstance, group: string, id: string): Promise<void> {
  await client.delete(`${groupPath(group)}/lib/grok/${encodeURIComponent(id)}`);
}
