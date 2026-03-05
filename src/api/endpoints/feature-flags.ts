import type { AxiosInstance } from "axios";
import type { ApiListResponse, FeatureFlag } from "../types.js";

export async function listFeatureFlags(
  client: AxiosInstance
): Promise<ApiListResponse<FeatureFlag>> {
  const resp = await client.get<ApiListResponse<FeatureFlag>>(
    "/api/v1/settings/features"
  );
  return resp.data;
}

export async function getFeatureFlag(
  client: AxiosInstance,
  id: string
): Promise<FeatureFlag> {
  const resp = await client.get<{ items: FeatureFlag[] }>(
    `/api/v1/settings/features/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function updateFeatureFlag(
  client: AxiosInstance,
  id: string,
  body: Record<string, unknown>
): Promise<FeatureFlag> {
  const resp = await client.patch<FeatureFlag>(
    `/api/v1/settings/features/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}
