import type { AxiosInstance } from "axios";
import type { ApiListResponse, Dataset } from "../types.js";

export async function listDatasets(
  client: AxiosInstance,
  group?: string
): Promise<ApiListResponse<Dataset>> {
  const g = group ?? "default_search";
  const resp = await client.get<ApiListResponse<Dataset>>(
    `/api/v1/m/${encodeURIComponent(g)}/search/datasets`
  );
  return resp.data;
}
