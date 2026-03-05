import type { AxiosInstance } from "axios";
import type { ApiListResponse, AiSettings } from "../types.js";

export async function listAiSettings(
  client: AxiosInstance
): Promise<ApiListResponse<AiSettings>> {
  const resp = await client.get<ApiListResponse<AiSettings>>(
    "/api/v1/ai/settings/features"
  );
  return resp.data;
}

export async function getAiSetting(
  client: AxiosInstance,
  id: string
): Promise<AiSettings> {
  const resp = await client.get<{ items: AiSettings[] }>(
    `/api/v1/ai/settings/features/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function updateAiSetting(
  client: AxiosInstance,
  id: string,
  body: Record<string, unknown>
): Promise<AiSettings> {
  const resp = await client.patch<AiSettings>(
    `/api/v1/ai/settings/features/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}
