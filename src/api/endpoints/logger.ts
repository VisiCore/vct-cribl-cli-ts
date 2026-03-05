import type { AxiosInstance } from "axios";
import type { LoggerConfig } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function getLogger(
  client: AxiosInstance,
  group: string
): Promise<LoggerConfig> {
  const resp = await client.get<LoggerConfig>(
    `${groupPath(group)}/system/logger`
  );
  return resp.data;
}

export async function setLogger(
  client: AxiosInstance,
  group: string,
  config: Record<string, unknown>
): Promise<LoggerConfig> {
  const resp = await client.patch<LoggerConfig>(
    `${groupPath(group)}/system/logger`,
    config
  );
  return resp.data;
}
