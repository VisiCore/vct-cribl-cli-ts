import type { AxiosInstance } from "axios";
import type { ApiListResponse, EventBreakerRuleset } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listEventBreakers(client: AxiosInstance, group: string): Promise<ApiListResponse<EventBreakerRuleset>> {
  const resp = await client.get<ApiListResponse<EventBreakerRuleset>>(`${groupPath(group)}/lib/breakers`);
  return resp.data;
}

export async function getEventBreaker(client: AxiosInstance, group: string, id: string): Promise<EventBreakerRuleset> {
  const resp = await client.get<{ items: EventBreakerRuleset[] }>(`${groupPath(group)}/lib/breakers/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function createEventBreaker(client: AxiosInstance, group: string, data: Record<string, unknown>): Promise<EventBreakerRuleset> {
  const resp = await client.post<EventBreakerRuleset>(`${groupPath(group)}/lib/breakers`, data);
  return resp.data;
}

export async function updateEventBreaker(client: AxiosInstance, group: string, id: string, data: Record<string, unknown>): Promise<EventBreakerRuleset> {
  const resp = await client.patch<EventBreakerRuleset>(`${groupPath(group)}/lib/breakers/${encodeURIComponent(id)}`, data);
  return resp.data;
}

export async function deleteEventBreaker(client: AxiosInstance, group: string, id: string): Promise<void> {
  await client.delete(`${groupPath(group)}/lib/breakers/${encodeURIComponent(id)}`);
}
