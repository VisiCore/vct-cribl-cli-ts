import type { AxiosInstance } from "axios";
import type { ApiListResponse, Notebook } from "../types.js";

function searchPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}/search`;
}

export async function listNotebooks(
  client: AxiosInstance,
  group?: string
): Promise<ApiListResponse<Notebook>> {
  const g = group ?? "default_search";
  const resp = await client.get<ApiListResponse<Notebook>>(
    `${searchPath(g)}/notebooks`
  );
  return resp.data;
}

export async function getNotebook(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<Notebook> {
  const g = group ?? "default_search";
  const resp = await client.get<{ items: Notebook[] }>(
    `${searchPath(g)}/notebooks/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
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
    `${searchPath(g)}/notebooks/${encodeURIComponent(opts.notebookId)}`,
    {
      query: opts.query,
      name: opts.name,
    }
  );
  return resp.data;
}

export interface CreateNotebookOpts {
  name: string;
  markdown?: string;
  group?: string;
}

export async function createNotebook(
  client: AxiosInstance,
  opts: CreateNotebookOpts
): Promise<Notebook> {
  const g = opts.group ?? "default_search";
  const crypto = await import("node:crypto");
  const notebookId = `notebook-${crypto.randomUUID()}`;
  const createResp = await client.post<Notebook>(
    `${searchPath(g)}/notebooks`,
    { id: notebookId, info: { name: opts.name }, sections: [] }
  );
  const created = (createResp.data as Record<string, unknown> & { items?: Notebook[] }).items?.[0] ?? createResp.data;

  const now = Date.now();
  const patchBody: Record<string, unknown> = {
    info: {
      name: opts.name,
      created: now,
      modified: now,
    },
    sections: opts.markdown
      ? [
          {
            id: `section-${crypto.randomUUID()}`,
            type: "markdown.default",
            variant: "markdown",
            config: { markdown: opts.markdown },
            info: {
              title: "",
              created: now,
              modified: now,
            },
          },
        ]
      : [],
  };
  const patchResp = await client.patch<Notebook>(
    `${searchPath(g)}/notebooks/${encodeURIComponent(created.id)}`,
    patchBody
  );
  return (patchResp.data as Record<string, unknown> & { items?: Notebook[] }).items?.[0] ?? patchResp.data;
}

export async function deleteNotebook(
  client: AxiosInstance,
  id: string,
  group?: string
): Promise<void> {
  const g = group ?? "default_search";
  await client.delete(
    `${searchPath(g)}/notebooks/${encodeURIComponent(id)}`
  );
}
