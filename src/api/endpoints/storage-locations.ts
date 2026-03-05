import type { AxiosInstance } from "axios";
import type { ApiListResponse, StorageLocation } from "../types.js";

function lakePath(lakeId: string) {
  return `/api/v1/products/lake/lakes/${encodeURIComponent(lakeId)}`;
}

export async function listStorageLocations(
  client: AxiosInstance,
  lakeId: string
): Promise<ApiListResponse<StorageLocation>> {
  const resp = await client.get<ApiListResponse<StorageLocation>>(
    `${lakePath(lakeId)}/storage-locations`
  );
  return resp.data;
}

export async function getStorageLocation(
  client: AxiosInstance,
  lakeId: string,
  id: string
): Promise<StorageLocation> {
  const resp = await client.get<{ items: StorageLocation[] }>(
    `${lakePath(lakeId)}/storage-locations/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createStorageLocation(
  client: AxiosInstance,
  lakeId: string,
  body: Record<string, unknown>
): Promise<StorageLocation> {
  const resp = await client.post<StorageLocation>(
    `${lakePath(lakeId)}/storage-locations`,
    body
  );
  return resp.data;
}

export async function updateStorageLocation(
  client: AxiosInstance,
  lakeId: string,
  id: string,
  body: Record<string, unknown>
): Promise<StorageLocation> {
  const resp = await client.patch<StorageLocation>(
    `${lakePath(lakeId)}/storage-locations/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteStorageLocation(
  client: AxiosInstance,
  lakeId: string,
  id: string
): Promise<void> {
  await client.delete(
    `${lakePath(lakeId)}/storage-locations/${encodeURIComponent(id)}`
  );
}
