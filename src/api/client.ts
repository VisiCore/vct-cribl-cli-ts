import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import type { CriblConfig } from "../config/types.js";
import { getAccessToken } from "../auth/oauth.js";

let clientInstance: AxiosInstance | null = null;
let currentConfig: CriblConfig | null = null;

export function createClient(config: CriblConfig): AxiosInstance {
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
