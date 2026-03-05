import type { AxiosInstance } from "axios";

export interface PaginationOpts {
  offset?: number;
  limit?: number;
  all?: boolean;
}

const DEFAULT_LIMIT = 100;

export async function paginatedGet<T>(
  client: AxiosInstance,
  url: string,
  opts: PaginationOpts = {},
  params: Record<string, unknown> = {}
): Promise<{ items: T[]; count?: number }> {
  if (!opts.all) {
    const resp = await client.get(url, {
      params: { ...params, offset: opts.offset ?? 0, limit: opts.limit ?? DEFAULT_LIMIT },
    });
    return resp.data;
  }

  // Auto-paginate
  const allItems: T[] = [];
  let offset = 0;
  const limit = opts.limit ?? DEFAULT_LIMIT;

  while (true) {
    const resp = await client.get(url, {
      params: { ...params, offset, limit },
    });
    const data = resp.data as { items: T[]; count?: number };
    allItems.push(...data.items);

    if (data.items.length < limit) break;
    offset += limit;
  }

  return { items: allItems, count: allItems.length };
}
