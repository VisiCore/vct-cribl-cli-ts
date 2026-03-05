import type { AxiosInstance } from "axios";
import type { ApiListResponse, Executor } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listExecutors(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<Executor>> {
  const resp = await client.get<ApiListResponse<Executor>>(
    `${groupPath(group)}/executors`
  );
  return resp.data;
}

export async function getExecutor(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<Executor> {
  const resp = await client.get<{ items: Executor[] }>(
    `${groupPath(group)}/executors/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}
