import type { AxiosInstance } from "axios";
import type { ApiListResponse, Secret } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listSecrets(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<Secret>> {
  const resp = await client.get<ApiListResponse<Secret>>(
    `${groupPath(group)}/system/secrets`
  );
  return resp.data;
}

export async function getSecret(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<Secret> {
  const resp = await client.get<{ items: Secret[] }>(
    `${groupPath(group)}/system/secrets/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createSecret(
  client: AxiosInstance,
  group: string,
  secret: Record<string, unknown>
): Promise<Secret> {
  const resp = await client.post<Secret>(
    `${groupPath(group)}/system/secrets`,
    secret
  );
  return resp.data;
}

export async function updateSecret(
  client: AxiosInstance,
  group: string,
  id: string,
  secret: Record<string, unknown>
): Promise<Secret> {
  const resp = await client.patch<Secret>(
    `${groupPath(group)}/system/secrets/${encodeURIComponent(id)}`,
    secret
  );
  return resp.data;
}

export async function deleteSecret(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<void> {
  await client.delete(
    `${groupPath(group)}/system/secrets/${encodeURIComponent(id)}`
  );
}
