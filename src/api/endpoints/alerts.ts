import type { AxiosInstance } from "axios";
import type { ApiListResponse, Alert } from "../types.js";

export async function listAlerts(
  client: AxiosInstance
): Promise<ApiListResponse<Alert>> {
  const resp = await client.get<ApiListResponse<Alert>>("/api/v1/notifications");
  return resp.data;
}
