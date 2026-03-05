import type { AxiosInstance } from "axios";
import type { ApiListResponse, EncryptionKey } from "../types.js";

export async function listEncryptionKeys(
  client: AxiosInstance
): Promise<ApiListResponse<EncryptionKey>> {
  const resp = await client.get<ApiListResponse<EncryptionKey>>(
    "/api/v1/system/keys"
  );
  return resp.data;
}

export async function getEncryptionKey(
  client: AxiosInstance,
  id: string
): Promise<EncryptionKey> {
  const resp = await client.get<{ items: EncryptionKey[] }>(
    `/api/v1/system/keys/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createEncryptionKey(
  client: AxiosInstance,
  body: Record<string, unknown>
): Promise<EncryptionKey> {
  const resp = await client.post<EncryptionKey>("/api/v1/system/keys", body);
  return resp.data;
}

export async function updateEncryptionKey(
  client: AxiosInstance,
  id: string,
  body: Record<string, unknown>
): Promise<EncryptionKey> {
  const resp = await client.patch<EncryptionKey>(
    `/api/v1/system/keys/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteEncryptionKey(
  client: AxiosInstance,
  id: string
): Promise<void> {
  await client.delete(`/api/v1/system/keys/${encodeURIComponent(id)}`);
}
