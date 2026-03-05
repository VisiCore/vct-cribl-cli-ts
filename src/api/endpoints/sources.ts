import type { AxiosInstance } from "axios";
import type { ApiListResponse, Source } from "../types.js";

export async function getSources(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<Source>> {
  const resp = await client.get<ApiListResponse<Source>>(
    `/api/v1/m/${encodeURIComponent(group)}/system/inputs`
  );
  return resp.data;
}
