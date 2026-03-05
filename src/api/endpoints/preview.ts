import type { AxiosInstance } from "axios";
import type { PreviewResult } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function runPreview(
  client: AxiosInstance,
  group: string,
  body: Record<string, unknown>
): Promise<PreviewResult> {
  const resp = await client.post<PreviewResult>(
    `${groupPath(group)}/preview`,
    body
  );
  return resp.data;
}
