import type { AxiosInstance } from "axios";
import type { ApiListResponse, SearchJob, SearchResult, SavedSearch } from "../types.js";
import { unwrapItem } from "../../utils/unwrap.js";

export interface RunSearchOpts {
  query: string;
  earliest?: string;
  latest?: string;
  group?: string;
}

export async function runSearch(
  client: AxiosInstance,
  opts: RunSearchOpts
): Promise<SearchJob> {
  const group = opts.group ?? "default_search";
  const resp = await client.post(
    `/api/v1/m/${encodeURIComponent(group)}/search/jobs`,
    {
      query: opts.query,
      earliest: opts.earliest ?? "-24h@h",
      latest: opts.latest ?? "now",
    }
  );
  return unwrapItem(resp.data as { items?: SearchJob[] } & SearchJob);
}

export async function listSearchJobs(
  client: AxiosInstance,
  group?: string
): Promise<ApiListResponse<SearchJob>> {
  const g = group ?? "default_search";
  const resp = await client.get<ApiListResponse<SearchJob>>(
    `/api/v1/m/${encodeURIComponent(g)}/search/jobs`
  );
  return resp.data;
}

export async function getSearchJobStatus(
  client: AxiosInstance,
  jobId: string,
  group?: string
): Promise<SearchJob> {
  const g = group ?? "default_search";
  const resp = await client.get(
    `/api/v1/m/${encodeURIComponent(g)}/search/jobs/${encodeURIComponent(jobId)}`
  );
  return unwrapItem(resp.data as { items?: SearchJob[] } & SearchJob);
}

export async function getSearchResults(
  client: AxiosInstance,
  jobId: string,
  group?: string
): Promise<SearchResult[]> {
  const g = group ?? "default_search";
  const resp = await client.get<SearchResult[]>(
    `/api/v1/m/${encodeURIComponent(g)}/search/jobs/${encodeURIComponent(jobId)}/results`
  );
  return resp.data;
}

export async function listSavedSearches(
  client: AxiosInstance,
  group?: string
): Promise<ApiListResponse<SavedSearch>> {
  const g = group ?? "default_search";
  const resp = await client.get<ApiListResponse<SavedSearch>>(
    `/api/v1/m/${encodeURIComponent(g)}/search/saved`
  );
  return resp.data;
}

export async function getSearchTimeline(
  client: AxiosInstance,
  jobId: string,
  group?: string
): Promise<unknown> {
  const g = group ?? "default_search";
  const resp = await client.get(
    `/api/v1/m/${encodeURIComponent(g)}/search/jobs/${encodeURIComponent(jobId)}/timeline`
  );
  return resp.data;
}

export async function getSearchFieldSummary(
  client: AxiosInstance,
  jobId: string,
  group?: string
): Promise<unknown> {
  const g = group ?? "default_search";
  const resp = await client.get(
    `/api/v1/m/${encodeURIComponent(g)}/search/jobs/${encodeURIComponent(jobId)}/field-summaries`
  );
  return resp.data;
}

export async function getSearchJobLogs(
  client: AxiosInstance,
  jobId: string,
  group?: string
): Promise<unknown> {
  const g = group ?? "default_search";
  const resp = await client.get(
    `/api/v1/m/${encodeURIComponent(g)}/search/jobs/${encodeURIComponent(jobId)}/logs`
  );
  return resp.data;
}

export async function getSearchJobMetrics(
  client: AxiosInstance,
  jobId: string,
  group?: string
): Promise<unknown> {
  const g = group ?? "default_search";
  const resp = await client.get(
    `/api/v1/m/${encodeURIComponent(g)}/search/jobs/${encodeURIComponent(jobId)}/metrics`
  );
  return resp.data;
}

export async function getSearchJobDiag(
  client: AxiosInstance,
  jobId: string,
  group?: string
): Promise<unknown> {
  const g = group ?? "default_search";
  const resp = await client.get(
    `/api/v1/m/${encodeURIComponent(g)}/search/jobs/${encodeURIComponent(jobId)}/diag`
  );
  return resp.data;
}
