import type { AxiosInstance } from "axios";
import type { ApiListResponse, Banner } from "../types.js";

export async function listBanners(
  client: AxiosInstance
): Promise<ApiListResponse<Banner>> {
  const resp = await client.get<ApiListResponse<Banner>>(
    "/api/v1/system/banners"
  );
  return resp.data;
}

export async function getBanner(
  client: AxiosInstance,
  id: string
): Promise<Banner> {
  const resp = await client.get<{ items: Banner[] }>(
    `/api/v1/system/banners/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createBanner(
  client: AxiosInstance,
  body: Record<string, unknown>
): Promise<Banner> {
  const resp = await client.post<Banner>("/api/v1/system/banners", body);
  return resp.data;
}

export async function updateBanner(
  client: AxiosInstance,
  id: string,
  body: Record<string, unknown>
): Promise<Banner> {
  const resp = await client.patch<Banner>(
    `/api/v1/system/banners/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteBanner(
  client: AxiosInstance,
  id: string
): Promise<void> {
  await client.delete(`/api/v1/system/banners/${encodeURIComponent(id)}`);
}
