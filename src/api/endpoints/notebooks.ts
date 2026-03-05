import type { AxiosInstance } from "axios";
import type { ApiListResponse, Notebook } from "../types.js";

export async function listNotebooks(
  client: AxiosInstance,
  group?: string
): Promise<ApiListResponse<Notebook>> {
  const g = group ?? "default_search";
  const resp = await client.get<ApiListResponse<Notebook>>(
    `/api/v1/m/${encodeURIComponent(g)}/search/notebooks`
  );
  return resp.data;
}

export interface AddToNotebookOpts {
  notebookId: string;
  query: string;
  name?: string;
  group?: string;
}

export async function addToNotebook(
  client: AxiosInstance,
  opts: AddToNotebookOpts
): Promise<Notebook> {
  const g = opts.group ?? "default_search";
  const resp = await client.patch<Notebook>(
    `/api/v1/m/${encodeURIComponent(g)}/search/notebooks/${encodeURIComponent(opts.notebookId)}`,
    {
      query: opts.query,
      name: opts.name,
    }
  );
  return resp.data;
}
