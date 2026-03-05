import type { AxiosInstance } from "axios";
import type { GitSettings } from "../types.js";

export async function getGitSettings(
  client: AxiosInstance
): Promise<GitSettings> {
  const resp = await client.get<GitSettings>(
    "/api/v1/system/settings/git-settings"
  );
  return resp.data;
}

export async function updateGitSettings(
  client: AxiosInstance,
  settings: Record<string, unknown>
): Promise<GitSettings> {
  const resp = await client.patch<GitSettings>(
    "/api/v1/system/settings/git-settings",
    settings
  );
  return resp.data;
}
