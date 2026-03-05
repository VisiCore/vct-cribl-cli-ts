import type { AxiosInstance } from "axios";
import type { ProfilerInfo } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function getProfiler(
  client: AxiosInstance,
  group: string
): Promise<ProfilerInfo> {
  const resp = await client.get<ProfilerInfo>(
    `${groupPath(group)}/system/profiler`
  );
  return resp.data;
}

export async function startProfiler(
  client: AxiosInstance,
  group: string
): Promise<ProfilerInfo> {
  const resp = await client.post<ProfilerInfo>(
    `${groupPath(group)}/system/profiler`
  );
  return resp.data;
}

export async function stopProfiler(
  client: AxiosInstance,
  group: string
): Promise<ProfilerInfo> {
  const resp = await client.patch<ProfilerInfo>(
    `${groupPath(group)}/system/profiler`,
    { active: false }
  );
  return resp.data;
}
