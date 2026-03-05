import type { AxiosInstance } from "axios";
import type { ApiListResponse, HmacFunction } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listHmacFunctions(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<HmacFunction>> {
  const resp = await client.get<ApiListResponse<HmacFunction>>(
    `${groupPath(group)}/lib/hmac-functions`
  );
  return resp.data;
}

export async function getHmacFunction(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<HmacFunction> {
  const resp = await client.get<{ items: HmacFunction[] }>(
    `${groupPath(group)}/lib/hmac-functions/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}
