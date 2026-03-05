import type { AxiosInstance } from "axios";
import type { ApiListResponse, Outpost } from "../types.js";

export async function listOutposts(
  client: AxiosInstance
): Promise<ApiListResponse<Outpost>> {
  const resp = await client.get<ApiListResponse<Outpost>>(
    "/api/v1/master/outposts"
  );
  return resp.data;
}

export async function getOutpost(
  client: AxiosInstance,
  id: string
): Promise<Outpost> {
  const resp = await client.get<{ items: Outpost[] }>(
    `/api/v1/master/outposts/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}
