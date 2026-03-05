import type { AxiosInstance } from "axios";
import type { ApiListResponse, SdsRule } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listSdsRules(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<SdsRule>> {
  const resp = await client.get<ApiListResponse<SdsRule>>(
    `${groupPath(group)}/lib/sds-rules`
  );
  return resp.data;
}

export async function getSdsRule(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<SdsRule> {
  const resp = await client.get<{ items: SdsRule[] }>(
    `${groupPath(group)}/lib/sds-rules/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createSdsRule(
  client: AxiosInstance,
  group: string,
  body: Record<string, unknown>
): Promise<SdsRule> {
  const resp = await client.post<SdsRule>(
    `${groupPath(group)}/lib/sds-rules`,
    body
  );
  return resp.data;
}

export async function updateSdsRule(
  client: AxiosInstance,
  group: string,
  id: string,
  body: Record<string, unknown>
): Promise<SdsRule> {
  const resp = await client.patch<SdsRule>(
    `${groupPath(group)}/lib/sds-rules/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteSdsRule(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<void> {
  await client.delete(
    `${groupPath(group)}/lib/sds-rules/${encodeURIComponent(id)}`
  );
}
