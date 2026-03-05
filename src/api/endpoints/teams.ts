import type { AxiosInstance } from "axios";
import type { ApiListResponse, Team } from "../types.js";

export async function listTeams(client: AxiosInstance): Promise<ApiListResponse<Team>> {
  const resp = await client.get<ApiListResponse<Team>>("/api/v1/system/teams");
  return resp.data;
}

export async function getTeam(client: AxiosInstance, id: string): Promise<Team> {
  const resp = await client.get<{ items: Team[] }>(`/api/v1/system/teams/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function createTeam(client: AxiosInstance, data: Record<string, unknown>): Promise<Team> {
  const resp = await client.post<Team>("/api/v1/system/teams", data);
  return resp.data;
}

export async function updateTeam(client: AxiosInstance, id: string, data: Record<string, unknown>): Promise<Team> {
  const resp = await client.patch<Team>(`/api/v1/system/teams/${encodeURIComponent(id)}`, data);
  return resp.data;
}

export async function deleteTeam(client: AxiosInstance, id: string): Promise<void> {
  await client.delete(`/api/v1/system/teams/${encodeURIComponent(id)}`);
}
