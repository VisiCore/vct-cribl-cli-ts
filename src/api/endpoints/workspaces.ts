import type { AxiosInstance } from "axios";
import type { ApiListResponse, Workspace } from "../types.js";

export async function listWorkspaces(
  client: AxiosInstance
): Promise<ApiListResponse<Workspace>> {
  const resp = await client.get<ApiListResponse<Workspace>>(
    "/api/v1/workspaces"
  );
  return resp.data;
}

export async function getWorkspace(
  client: AxiosInstance,
  id: string
): Promise<Workspace> {
  const resp = await client.get<{ items: Workspace[] }>(
    `/api/v1/workspaces/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createWorkspace(
  client: AxiosInstance,
  body: Record<string, unknown>
): Promise<Workspace> {
  const resp = await client.post<Workspace>("/api/v1/workspaces", body);
  return resp.data;
}

export async function updateWorkspace(
  client: AxiosInstance,
  id: string,
  body: Record<string, unknown>
): Promise<Workspace> {
  const resp = await client.patch<Workspace>(
    `/api/v1/workspaces/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteWorkspace(
  client: AxiosInstance,
  id: string
): Promise<void> {
  await client.delete(`/api/v1/workspaces/${encodeURIComponent(id)}`);
}
