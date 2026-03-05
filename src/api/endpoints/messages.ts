import type { AxiosInstance } from "axios";
import type { ApiListResponse, Message } from "../types.js";

export async function listMessages(
  client: AxiosInstance
): Promise<ApiListResponse<Message>> {
  const resp = await client.get<ApiListResponse<Message>>(
    "/api/v1/system/messages"
  );
  return resp.data;
}

export async function getMessage(
  client: AxiosInstance,
  id: string
): Promise<Message> {
  const resp = await client.get<{ items: Message[] }>(
    `/api/v1/system/messages/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createMessage(
  client: AxiosInstance,
  body: Record<string, unknown>
): Promise<Message> {
  const resp = await client.post<Message>("/api/v1/system/messages", body);
  return resp.data;
}

export async function deleteMessage(
  client: AxiosInstance,
  id: string
): Promise<void> {
  await client.delete(`/api/v1/system/messages/${encodeURIComponent(id)}`);
}
