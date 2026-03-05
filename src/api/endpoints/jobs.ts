import type { AxiosInstance } from "axios";
import type { ApiListResponse, Job, JobConfig } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listJobs(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<Job>> {
  const resp = await client.get<ApiListResponse<Job>>(
    `${groupPath(group)}/jobs`
  );
  return resp.data;
}

export async function getJob(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<Job> {
  const resp = await client.get<{ items: Job[] }>(
    `${groupPath(group)}/jobs/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function runJob(
  client: AxiosInstance,
  group: string,
  job: Record<string, unknown>
): Promise<Job> {
  const resp = await client.post<Job>(
    `${groupPath(group)}/jobs`,
    job
  );
  return resp.data;
}

export async function cancelJob(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<Job> {
  const resp = await client.patch<Job>(
    `${groupPath(group)}/jobs/${encodeURIComponent(id)}/cancel`
  );
  return resp.data;
}

export async function pauseJob(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<Job> {
  const resp = await client.patch<Job>(
    `${groupPath(group)}/jobs/${encodeURIComponent(id)}/pause`
  );
  return resp.data;
}

export async function resumeJob(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<Job> {
  const resp = await client.patch<Job>(
    `${groupPath(group)}/jobs/${encodeURIComponent(id)}/resume`
  );
  return resp.data;
}

export async function listJobConfigs(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<JobConfig>> {
  const resp = await client.get<ApiListResponse<JobConfig>>(
    `${groupPath(group)}/lib/jobs`
  );
  return resp.data;
}
