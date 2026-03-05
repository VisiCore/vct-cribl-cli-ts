import type { AxiosInstance } from "axios";
import type { ApiListResponse, CriblFunction } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listFunctions(client: AxiosInstance, group: string): Promise<ApiListResponse<CriblFunction>> {
  const resp = await client.get<ApiListResponse<CriblFunction>>(`${groupPath(group)}/functions`);
  return resp.data;
}

export async function getFunction(client: AxiosInstance, group: string, id: string): Promise<CriblFunction> {
  const resp = await client.get<{ items: CriblFunction[] }>(`${groupPath(group)}/functions/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}
