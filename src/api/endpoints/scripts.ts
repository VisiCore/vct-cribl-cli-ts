import type { AxiosInstance } from "axios";
import type { ApiListResponse, Script } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listScripts(client: AxiosInstance, group: string): Promise<ApiListResponse<Script>> {
  const resp = await client.get<ApiListResponse<Script>>(`${groupPath(group)}/system/scripts`);
  return resp.data;
}

export async function getScript(client: AxiosInstance, group: string, id: string): Promise<Script> {
  const resp = await client.get<{ items: Script[] }>(`${groupPath(group)}/system/scripts/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function createScript(client: AxiosInstance, group: string, data: Record<string, unknown>): Promise<Script> {
  const resp = await client.post<Script>(`${groupPath(group)}/system/scripts`, data);
  return resp.data;
}

export async function deleteScript(client: AxiosInstance, group: string, id: string): Promise<void> {
  await client.delete(`${groupPath(group)}/system/scripts/${encodeURIComponent(id)}`);
}
