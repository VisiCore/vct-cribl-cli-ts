import type { AxiosInstance } from "axios";
import type { ApiListResponse, SdsRuleset } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listSdsRulesets(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<SdsRuleset>> {
  const resp = await client.get<ApiListResponse<SdsRuleset>>(
    `${groupPath(group)}/lib/sds-rulesets`
  );
  return resp.data;
}

export async function getSdsRuleset(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<SdsRuleset> {
  const resp = await client.get<{ items: SdsRuleset[] }>(
    `${groupPath(group)}/lib/sds-rulesets/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createSdsRuleset(
  client: AxiosInstance,
  group: string,
  body: Record<string, unknown>
): Promise<SdsRuleset> {
  const resp = await client.post<SdsRuleset>(
    `${groupPath(group)}/lib/sds-rulesets`,
    body
  );
  return resp.data;
}

export async function updateSdsRuleset(
  client: AxiosInstance,
  group: string,
  id: string,
  body: Record<string, unknown>
): Promise<SdsRuleset> {
  const resp = await client.patch<SdsRuleset>(
    `${groupPath(group)}/lib/sds-rulesets/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteSdsRuleset(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<void> {
  await client.delete(
    `${groupPath(group)}/lib/sds-rulesets/${encodeURIComponent(id)}`
  );
}
