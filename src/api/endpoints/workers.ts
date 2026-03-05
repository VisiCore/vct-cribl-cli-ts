import type { AxiosInstance } from "axios";
import type { ApiListResponse, WorkerGroup } from "../types.js";

export async function listWorkerGroups(
  client: AxiosInstance
): Promise<ApiListResponse<WorkerGroup>> {
  const resp = await client.get<ApiListResponse<WorkerGroup>>("/api/v1/master/groups");
  return resp.data;
}
