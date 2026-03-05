import type { AxiosInstance } from "axios";
import type { ApiListResponse, License } from "../types.js";

export async function listLicenses(client: AxiosInstance): Promise<ApiListResponse<License>> {
  const resp = await client.get<ApiListResponse<License>>("/api/v1/system/licenses");
  return resp.data;
}

export async function getLicense(client: AxiosInstance, id: string): Promise<License> {
  const resp = await client.get<{ items: License[] }>(`/api/v1/system/licenses/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function getLicenseUsage(client: AxiosInstance): Promise<unknown> {
  const resp = await client.get("/api/v1/system/licenses/usage");
  return resp.data;
}
