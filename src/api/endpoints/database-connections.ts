import type { AxiosInstance } from "axios";
import type { ApiListResponse, DatabaseConnection } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listDatabaseConnections(client: AxiosInstance, group: string): Promise<ApiListResponse<DatabaseConnection>> {
  const resp = await client.get<ApiListResponse<DatabaseConnection>>(`${groupPath(group)}/lib/database-connections`);
  return resp.data;
}

export async function getDatabaseConnection(client: AxiosInstance, group: string, id: string): Promise<DatabaseConnection> {
  const resp = await client.get<{ items: DatabaseConnection[] }>(`${groupPath(group)}/lib/database-connections/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function createDatabaseConnection(client: AxiosInstance, group: string, data: Record<string, unknown>): Promise<DatabaseConnection> {
  const resp = await client.post<DatabaseConnection>(`${groupPath(group)}/lib/database-connections`, data);
  return resp.data;
}

export async function updateDatabaseConnection(client: AxiosInstance, group: string, id: string, data: Record<string, unknown>): Promise<DatabaseConnection> {
  const resp = await client.patch<DatabaseConnection>(`${groupPath(group)}/lib/database-connections/${encodeURIComponent(id)}`, data);
  return resp.data;
}

export async function deleteDatabaseConnection(client: AxiosInstance, group: string, id: string): Promise<void> {
  await client.delete(`${groupPath(group)}/lib/database-connections/${encodeURIComponent(id)}`);
}

export async function testDatabaseConnection(client: AxiosInstance, group: string, data: Record<string, unknown>): Promise<unknown> {
  const resp = await client.post(`${groupPath(group)}/lib/database-connections/test`, data);
  return resp.data;
}
