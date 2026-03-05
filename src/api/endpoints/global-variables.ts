import type { AxiosInstance } from "axios";
import type { ApiListResponse, GlobalVariable } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listGlobalVariables(client: AxiosInstance, group: string): Promise<ApiListResponse<GlobalVariable>> {
  const resp = await client.get<ApiListResponse<GlobalVariable>>(`${groupPath(group)}/lib/vars`);
  return resp.data;
}

export async function getGlobalVariable(client: AxiosInstance, group: string, id: string): Promise<GlobalVariable> {
  const resp = await client.get<{ items: GlobalVariable[] }>(`${groupPath(group)}/lib/vars/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function createGlobalVariable(client: AxiosInstance, group: string, data: Record<string, unknown>): Promise<GlobalVariable> {
  const resp = await client.post<GlobalVariable>(`${groupPath(group)}/lib/vars`, data);
  return resp.data;
}

export async function updateGlobalVariable(client: AxiosInstance, group: string, id: string, data: Record<string, unknown>): Promise<GlobalVariable> {
  const resp = await client.patch<GlobalVariable>(`${groupPath(group)}/lib/vars/${encodeURIComponent(id)}`, data);
  return resp.data;
}

export async function deleteGlobalVariable(client: AxiosInstance, group: string, id: string): Promise<void> {
  await client.delete(`${groupPath(group)}/lib/vars/${encodeURIComponent(id)}`);
}
