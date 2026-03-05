import type { AxiosInstance } from "axios";
import type { ApiListResponse, Parser } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listParsers(client: AxiosInstance, group: string): Promise<ApiListResponse<Parser>> {
  const resp = await client.get<ApiListResponse<Parser>>(`${groupPath(group)}/lib/parsers`);
  return resp.data;
}

export async function getParser(client: AxiosInstance, group: string, id: string): Promise<Parser> {
  const resp = await client.get<{ items: Parser[] }>(`${groupPath(group)}/lib/parsers/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function createParser(client: AxiosInstance, group: string, data: Record<string, unknown>): Promise<Parser> {
  const resp = await client.post<Parser>(`${groupPath(group)}/lib/parsers`, data);
  return resp.data;
}

export async function updateParser(client: AxiosInstance, group: string, id: string, data: Record<string, unknown>): Promise<Parser> {
  const resp = await client.patch<Parser>(`${groupPath(group)}/lib/parsers/${encodeURIComponent(id)}`, data);
  return resp.data;
}

export async function deleteParser(client: AxiosInstance, group: string, id: string): Promise<void> {
  await client.delete(`${groupPath(group)}/lib/parsers/${encodeURIComponent(id)}`);
}
