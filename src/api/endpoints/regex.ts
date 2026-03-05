import type { AxiosInstance } from "axios";
import type { ApiListResponse, RegexPattern } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listRegex(client: AxiosInstance, group: string): Promise<ApiListResponse<RegexPattern>> {
  const resp = await client.get<ApiListResponse<RegexPattern>>(`${groupPath(group)}/lib/regex`);
  return resp.data;
}

export async function getRegex(client: AxiosInstance, group: string, id: string): Promise<RegexPattern> {
  const resp = await client.get<{ items: RegexPattern[] }>(`${groupPath(group)}/lib/regex/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function createRegex(client: AxiosInstance, group: string, data: Record<string, unknown>): Promise<RegexPattern> {
  const resp = await client.post<RegexPattern>(`${groupPath(group)}/lib/regex`, data);
  return resp.data;
}

export async function updateRegex(client: AxiosInstance, group: string, id: string, data: Record<string, unknown>): Promise<RegexPattern> {
  const resp = await client.patch<RegexPattern>(`${groupPath(group)}/lib/regex/${encodeURIComponent(id)}`, data);
  return resp.data;
}

export async function deleteRegex(client: AxiosInstance, group: string, id: string): Promise<void> {
  await client.delete(`${groupPath(group)}/lib/regex/${encodeURIComponent(id)}`);
}
