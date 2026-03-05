import type { AxiosInstance } from "axios";
import type { ApiListResponse, Condition } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listConditions(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<Condition>> {
  const resp = await client.get<ApiListResponse<Condition>>(
    `${groupPath(group)}/conditions`
  );
  return resp.data;
}

export async function getCondition(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<Condition> {
  const resp = await client.get<{ items: Condition[] }>(
    `${groupPath(group)}/conditions/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createCondition(
  client: AxiosInstance,
  group: string,
  body: Record<string, unknown>
): Promise<Condition> {
  const resp = await client.post<Condition>(
    `${groupPath(group)}/conditions`,
    body
  );
  return resp.data;
}

export async function updateCondition(
  client: AxiosInstance,
  group: string,
  id: string,
  body: Record<string, unknown>
): Promise<Condition> {
  const resp = await client.patch<Condition>(
    `${groupPath(group)}/conditions/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteCondition(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<void> {
  await client.delete(
    `${groupPath(group)}/conditions/${encodeURIComponent(id)}`
  );
}
