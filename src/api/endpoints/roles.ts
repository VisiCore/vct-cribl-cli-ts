import type { AxiosInstance } from "axios";
import type { ApiListResponse, Role } from "../types.js";

export async function listRoles(
  client: AxiosInstance
): Promise<ApiListResponse<Role>> {
  const resp = await client.get<ApiListResponse<Role>>(
    "/api/v1/system/roles"
  );
  return resp.data;
}

export async function getRole(
  client: AxiosInstance,
  id: string
): Promise<Role> {
  const resp = await client.get<{ items: Role[] }>(
    `/api/v1/system/roles/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createRole(
  client: AxiosInstance,
  role: Record<string, unknown>
): Promise<Role> {
  const resp = await client.post<Role>("/api/v1/system/roles", role);
  return resp.data;
}

export async function updateRole(
  client: AxiosInstance,
  id: string,
  role: Record<string, unknown>
): Promise<Role> {
  const resp = await client.patch<Role>(
    `/api/v1/system/roles/${encodeURIComponent(id)}`,
    role
  );
  return resp.data;
}

export async function deleteRole(
  client: AxiosInstance,
  id: string
): Promise<void> {
  await client.delete(`/api/v1/system/roles/${encodeURIComponent(id)}`);
}
