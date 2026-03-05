import type { AxiosInstance } from "axios";
import type { VersionInfo } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function getVersionInfo(
  client: AxiosInstance,
  group: string
): Promise<VersionInfo> {
  const resp = await client.get<VersionInfo>(
    `${groupPath(group)}/version/info`
  );
  return resp.data;
}

export async function getVersionStatus(
  client: AxiosInstance,
  group: string
): Promise<unknown> {
  const resp = await client.get(`${groupPath(group)}/version/status`);
  return resp.data;
}

export async function getVersionDiff(
  client: AxiosInstance,
  group: string
): Promise<unknown> {
  const resp = await client.get(`${groupPath(group)}/version/diff`);
  return resp.data;
}

export async function commitVersion(
  client: AxiosInstance,
  group: string,
  message: string
): Promise<unknown> {
  const resp = await client.post(`${groupPath(group)}/version/commit`, {
    message,
  });
  return resp.data;
}

export async function pushVersion(
  client: AxiosInstance,
  group: string
): Promise<unknown> {
  const resp = await client.post(`${groupPath(group)}/version/push`);
  return resp.data;
}

export async function syncVersion(
  client: AxiosInstance,
  group: string
): Promise<unknown> {
  const resp = await client.post(`${groupPath(group)}/version/sync`);
  return resp.data;
}

export async function listBranches(
  client: AxiosInstance,
  group: string
): Promise<unknown> {
  const resp = await client.get(`${groupPath(group)}/version/branch`);
  return resp.data;
}

export async function getCurrentBranch(
  client: AxiosInstance,
  group: string
): Promise<unknown> {
  const resp = await client.get(`${groupPath(group)}/version/current-branch`);
  return resp.data;
}
