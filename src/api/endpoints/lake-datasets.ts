import type { AxiosInstance } from "axios";
import type { ApiListResponse, LakeDataset } from "../types.js";

function lakePath(lakeId: string) {
  return `/api/v1/products/lake/lakes/${encodeURIComponent(lakeId)}`;
}

export async function listLakeDatasets(
  client: AxiosInstance,
  lakeId: string
): Promise<ApiListResponse<LakeDataset>> {
  const resp = await client.get<ApiListResponse<LakeDataset>>(
    `${lakePath(lakeId)}/datasets`
  );
  return resp.data;
}

export async function getLakeDataset(
  client: AxiosInstance,
  lakeId: string,
  id: string
): Promise<LakeDataset> {
  const resp = await client.get<{ items: LakeDataset[] }>(
    `${lakePath(lakeId)}/datasets/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createLakeDataset(
  client: AxiosInstance,
  lakeId: string,
  body: Record<string, unknown>
): Promise<LakeDataset> {
  const resp = await client.post<LakeDataset>(
    `${lakePath(lakeId)}/datasets`,
    body
  );
  return resp.data;
}

export async function updateLakeDataset(
  client: AxiosInstance,
  lakeId: string,
  id: string,
  body: Record<string, unknown>
): Promise<LakeDataset> {
  const resp = await client.patch<LakeDataset>(
    `${lakePath(lakeId)}/datasets/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteLakeDataset(
  client: AxiosInstance,
  lakeId: string,
  id: string
): Promise<void> {
  await client.delete(
    `${lakePath(lakeId)}/datasets/${encodeURIComponent(id)}`
  );
}
