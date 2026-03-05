import type { AxiosInstance } from "axios";
import type { ApiListResponse, Sample } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listSamples(client: AxiosInstance, group: string): Promise<ApiListResponse<Sample>> {
  const resp = await client.get<ApiListResponse<Sample>>(`${groupPath(group)}/system/samples`);
  return resp.data;
}

export async function getSample(client: AxiosInstance, group: string, id: string): Promise<Sample> {
  const resp = await client.get<{ items: Sample[] }>(`${groupPath(group)}/system/samples/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function getSampleContent(client: AxiosInstance, group: string, id: string): Promise<unknown> {
  const resp = await client.get(`${groupPath(group)}/system/samples/${encodeURIComponent(id)}/content`);
  return resp.data;
}

export async function createSample(client: AxiosInstance, group: string, data: Record<string, unknown>): Promise<Sample> {
  const resp = await client.post<Sample>(`${groupPath(group)}/system/samples`, data);
  return resp.data;
}

export async function deleteSample(client: AxiosInstance, group: string, id: string): Promise<void> {
  await client.delete(`${groupPath(group)}/system/samples/${encodeURIComponent(id)}`);
}
