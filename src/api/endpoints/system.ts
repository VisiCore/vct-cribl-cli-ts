import type { AxiosInstance } from "axios";
import type { SystemInfo } from "../types.js";

export async function getSystemInfo(
  client: AxiosInstance
): Promise<SystemInfo> {
  const resp = await client.get<SystemInfo>("/api/v1/system/info");
  return resp.data;
}

export async function getSystemSettings(
  client: AxiosInstance
): Promise<unknown> {
  const resp = await client.get("/api/v1/system/settings");
  return resp.data;
}

export async function getHealth(
  client: AxiosInstance
): Promise<unknown> {
  const resp = await client.get("/api/v1/health");
  return resp.data;
}

export async function getInstanceInfo(
  client: AxiosInstance
): Promise<unknown> {
  const resp = await client.get("/api/v1/system/instance");
  return resp.data;
}

export async function getWorkerHealth(
  client: AxiosInstance
): Promise<unknown> {
  const resp = await client.get("/api/v1/health/workers");
  return resp.data;
}

export async function getSystemLogs(
  client: AxiosInstance
): Promise<unknown> {
  const resp = await client.get("/api/v1/system/logs");
  return resp.data;
}

export async function getSystemLog(
  client: AxiosInstance,
  id: string
): Promise<unknown> {
  const resp = await client.get(`/api/v1/system/logs/${encodeURIComponent(id)}`);
  return resp.data;
}

export async function getSystemDiag(
  client: AxiosInstance
): Promise<unknown> {
  const resp = await client.get("/api/v1/system/diag");
  return resp.data;
}

export async function sendSystemDiag(
  client: AxiosInstance
): Promise<unknown> {
  const resp = await client.post("/api/v1/system/diag/send");
  return resp.data;
}

export async function restartSystem(
  client: AxiosInstance
): Promise<unknown> {
  const resp = await client.post("/api/v1/system/settings/restart");
  return resp.data;
}

export async function reloadConfig(
  client: AxiosInstance
): Promise<unknown> {
  const resp = await client.post("/api/v1/system/settings/reload");
  return resp.data;
}

export async function upgradeSystem(
  client: AxiosInstance
): Promise<unknown> {
  const resp = await client.get("/api/v1/system/settings/upgrade");
  return resp.data;
}
