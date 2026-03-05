import type { AxiosInstance } from "axios";
import type { ApiListResponse, Destination } from "../types.js";

export async function getDestinations(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<Destination>> {
  const resp = await client.get<ApiListResponse<Destination>>(
    `/api/v1/m/${encodeURIComponent(group)}/system/outputs`
  );
  return resp.data;
}
