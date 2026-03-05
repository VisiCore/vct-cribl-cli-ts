import type { AxiosInstance } from "axios";
import type { KmsConfig } from "../types.js";

export async function getKmsConfig(
  client: AxiosInstance
): Promise<KmsConfig> {
  const resp = await client.get<KmsConfig>(
    "/api/v1/security/kms/config"
  );
  return resp.data;
}

export async function updateKmsConfig(
  client: AxiosInstance,
  config: Record<string, unknown>
): Promise<KmsConfig> {
  const resp = await client.patch<KmsConfig>(
    "/api/v1/security/kms/config",
    config
  );
  return resp.data;
}

export async function getKmsHealth(
  client: AxiosInstance
): Promise<unknown> {
  const resp = await client.get("/api/v1/security/kms/health");
  return resp.data;
}
