import type { AxiosInstance } from "axios";
import type { AuthSettings } from "../types.js";

export async function getAuthSettings(
  client: AxiosInstance
): Promise<AuthSettings> {
  const resp = await client.get<AuthSettings>(
    "/api/v1/system/settings/auth"
  );
  return resp.data;
}

export async function updateAuthSettings(
  client: AxiosInstance,
  settings: Record<string, unknown>
): Promise<AuthSettings> {
  const resp = await client.patch<AuthSettings>(
    "/api/v1/system/settings/auth",
    settings
  );
  return resp.data;
}
