import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import type { CriblConfig } from "../config/types.js";
import { getAccessToken } from "../auth/oauth.js";
import { DryRunAbort } from "../utils/errors.js";

let clientInstance: AxiosInstance | null = null;
let currentConfig: CriblConfig | null = null;

export interface ClientOptions {
  dryRun?: boolean;
}

export function createClient(config: CriblConfig, options?: ClientOptions): AxiosInstance {
  const client = axios.create({
    baseURL: config.baseUrl,
    timeout: 30_000,
    headers: { "Content-Type": "application/json" },
  });

  client.interceptors.request.use(async (req: InternalAxiosRequestConfig) => {
    const token = await getAccessToken(config);
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });

  if (options?.dryRun) {
    client.interceptors.request.use((req: InternalAxiosRequestConfig) => {
      const headers = { ...req.headers } as Record<string, unknown>;
      delete headers.Authorization;

      const info: Record<string, unknown> = {
        dry_run: true,
        method: req.method?.toUpperCase(),
        url: `${req.baseURL ?? ""}${req.url ?? ""}`,
        headers,
      };
      if (req.data) {
        info.body = req.data;
      }

      process.stderr.write(JSON.stringify(info, null, 2) + "\n");
      throw new DryRunAbort();
    });
  }

  clientInstance = client;
  currentConfig = config;
  return client;
}

export function getClient(): AxiosInstance {
  if (!clientInstance) {
    throw new Error("API client not initialized. Run a config command first.");
  }
  return clientInstance;
}

export function getConfig(): CriblConfig {
  if (!currentConfig) {
    throw new Error("Config not loaded.");
  }
  return currentConfig;
}
