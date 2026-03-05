import type { AxiosInstance } from "axios";
import type { ApiListResponse, DatasetProvider } from "../types.js";

function searchPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}/search`;
}

export async function listDatasetProviders(
  client: AxiosInstance,
  group?: string
): Promise<ApiListResponse<DatasetProvider>> {
  const g = group ?? "default_search";
  const resp = await client.get<ApiListResponse<DatasetProvider>>(
    `${searchPath(g)}/dataset-providers`
  );
  return resp.data;
}

export async function getDatasetProvider(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<DatasetProvider> {
  const g = group ?? "default_search";
  const resp = await client.get<{ items: DatasetProvider[] }>(
    `${searchPath(g)}/dataset-providers/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createDatasetProvider(
  client: AxiosInstance,
  body: Record<string, unknown>,
  group?: string
): Promise<DatasetProvider> {
  const g = group ?? "default_search";
  const resp = await client.post<DatasetProvider>(
    `${searchPath(g)}/dataset-providers`,
    body
  );
  return resp.data;
}

export async function updateDatasetProvider(
  client: AxiosInstance,
  id: string,
  body: Record<string, unknown>,
  group?: string
): Promise<DatasetProvider> {
  const g = group ?? "default_search";
  const resp = await client.patch<DatasetProvider>(
    `${searchPath(g)}/dataset-providers/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteDatasetProvider(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<void> {
  const g = group ?? "default_search";
  await client.delete(
    `${searchPath(g)}/dataset-providers/${encodeURIComponent(id)}`
  );
}
