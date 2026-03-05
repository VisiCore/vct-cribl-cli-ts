import type { AxiosInstance } from "axios";
import type { ApiListResponse, User } from "../types.js";

export async function listUsers(
  client: AxiosInstance
): Promise<ApiListResponse<User>> {
  const resp = await client.get<ApiListResponse<User>>(
    "/api/v1/system/users"
  );
  return resp.data;
}

export async function getUser(
  client: AxiosInstance,
  id: string
): Promise<User> {
  const resp = await client.get<{ items: User[] }>(
    `/api/v1/system/users/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createUser(
  client: AxiosInstance,
  user: Record<string, unknown>
): Promise<User> {
  const resp = await client.post<User>("/api/v1/system/users", user);
  return resp.data;
}

export async function updateUser(
  client: AxiosInstance,
  id: string,
  user: Record<string, unknown>
): Promise<User> {
  const resp = await client.patch<User>(
    `/api/v1/system/users/${encodeURIComponent(id)}`,
    user
  );
  return resp.data;
}

export async function deleteUser(
  client: AxiosInstance,
  id: string
): Promise<void> {
  await client.delete(`/api/v1/system/users/${encodeURIComponent(id)}`);
}
