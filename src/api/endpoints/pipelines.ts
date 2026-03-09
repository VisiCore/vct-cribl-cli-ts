import type { AxiosInstance } from "axios";
import type { ApiListResponse, Pipeline } from "../types.js";
import { unwrapItem } from "../../utils/unwrap.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listPipelines(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<Pipeline>> {
  const resp = await client.get<ApiListResponse<Pipeline>>(
    `${groupPath(group)}/pipelines`
  );
  return resp.data;
}

export async function getPipeline(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<Pipeline> {
  const resp = await client.get<{ items: Pipeline[] }>(
    `${groupPath(group)}/pipelines/${encodeURIComponent(id)}`
  );
  return unwrapItem(resp.data as { items?: Pipeline[] } & Pipeline);
}

export async function createPipeline(
  client: AxiosInstance,
  group: string,
  pipeline: Record<string, unknown>
): Promise<Pipeline> {
  const resp = await client.post<Pipeline>(
    `${groupPath(group)}/pipelines`,
    pipeline
  );
  return resp.data;
}

export async function updatePipeline(
  client: AxiosInstance,
  group: string,
  id: string,
  pipeline: Record<string, unknown>
): Promise<Pipeline> {
  const resp = await client.patch<Pipeline>(
    `${groupPath(group)}/pipelines/${encodeURIComponent(id)}`,
    pipeline
  );
  return resp.data;
}

export async function deletePipeline(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<void> {
  await client.delete(
    `${groupPath(group)}/pipelines/${encodeURIComponent(id)}`
  );
}
