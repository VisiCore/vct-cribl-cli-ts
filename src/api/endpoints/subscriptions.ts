import type { AxiosInstance } from "axios";
import type { ApiListResponse, Subscription } from "../types.js";

export async function listSubscriptions(
  client: AxiosInstance
): Promise<ApiListResponse<Subscription>> {
  const resp = await client.get<ApiListResponse<Subscription>>(
    "/api/v1/system/subscriptions"
  );
  return resp.data;
}

export async function getSubscription(
  client: AxiosInstance,
  id: string
): Promise<Subscription> {
  const resp = await client.get<{ items: Subscription[] }>(
    `/api/v1/system/subscriptions/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}
