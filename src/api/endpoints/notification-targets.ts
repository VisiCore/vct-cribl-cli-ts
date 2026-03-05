import type { AxiosInstance } from "axios";
import type { ApiListResponse, NotificationTarget } from "../types.js";

export async function listNotificationTargets(client: AxiosInstance): Promise<ApiListResponse<NotificationTarget>> {
  const resp = await client.get<ApiListResponse<NotificationTarget>>("/api/v1/notification-targets");
  return resp.data;
}

export async function getNotificationTarget(client: AxiosInstance, id: string): Promise<NotificationTarget> {
  const resp = await client.get<{ items: NotificationTarget[] }>(`/api/v1/notification-targets/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function createNotificationTarget(client: AxiosInstance, data: Record<string, unknown>): Promise<NotificationTarget> {
  const resp = await client.post<NotificationTarget>("/api/v1/notification-targets", data);
  return resp.data;
}

export async function updateNotificationTarget(client: AxiosInstance, id: string, data: Record<string, unknown>): Promise<NotificationTarget> {
  const resp = await client.patch<NotificationTarget>(`/api/v1/notification-targets/${encodeURIComponent(id)}`, data);
  return resp.data;
}

export async function deleteNotificationTarget(client: AxiosInstance, id: string): Promise<void> {
  await client.delete(`/api/v1/notification-targets/${encodeURIComponent(id)}`);
}
