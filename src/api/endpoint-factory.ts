import type { AxiosInstance } from "axios";
import type { ApiListResponse } from "./types.js";
import { unwrapItem } from "../utils/unwrap.js";

export type EndpointScope = "group" | "global" | "search" | "lake";

export interface EndpointConfig {
  scope: EndpointScope;
  path: string;
  singleton?: boolean;
}

export interface CrudEndpoints {
  list(client: AxiosInstance, groupOrLake: string): Promise<ApiListResponse<Record<string, unknown>>>;
  get(client: AxiosInstance, groupOrLake: string, id: string): Promise<Record<string, unknown>>;
  create(client: AxiosInstance, groupOrLake: string, data: Record<string, unknown>): Promise<Record<string, unknown>>;
  update(client: AxiosInstance, groupOrLake: string, id: string, data: Record<string, unknown>): Promise<Record<string, unknown>>;
  delete(client: AxiosInstance, groupOrLake: string, id: string): Promise<void>;
}

function buildBasePath(scope: EndpointScope, groupOrLake: string, path: string): string {
  const encoded = encodeURIComponent(groupOrLake);
  switch (scope) {
    case "group":
      return `/api/v1/m/${encoded}/${path}`;
    case "global":
      return `/api/v1/${path}`;
    case "search":
      return `/api/v1/m/${encoded}/search/${path}`;
    case "lake":
      return `/api/v1/products/lake/lakes/${encoded}/${path}`;
  }
}

export function createEndpoints(config: EndpointConfig): CrudEndpoints {
  const { scope, path, singleton } = config;

  return {
    async list(client, groupOrLake) {
      const base = buildBasePath(scope, groupOrLake, path);
      const resp = await client.get<ApiListResponse<Record<string, unknown>>>(base);
      return resp.data;
    },

    async get(client, groupOrLake, id) {
      const base = buildBasePath(scope, groupOrLake, path);
      if (singleton) {
        const resp = await client.get<Record<string, unknown>>(base);
        return resp.data;
      }
      const resp = await client.get<{ items: Record<string, unknown>[] }>(
        `${base}/${encodeURIComponent(id)}`
      );
      return unwrapItem(resp.data as { items?: Record<string, unknown>[] } & Record<string, unknown>);
    },

    async create(client, groupOrLake, data) {
      const base = buildBasePath(scope, groupOrLake, path);
      const resp = await client.post<Record<string, unknown>>(base, data);
      return resp.data;
    },

    async update(client, groupOrLake, id, data) {
      const base = buildBasePath(scope, groupOrLake, path);
      if (singleton) {
        const resp = await client.patch<Record<string, unknown>>(base, data);
        return resp.data;
      }
      const resp = await client.patch<Record<string, unknown>>(
        `${base}/${encodeURIComponent(id)}`,
        data
      );
      return resp.data;
    },

    async delete(client, groupOrLake, id) {
      const base = buildBasePath(scope, groupOrLake, path);
      await client.delete(`${base}/${encodeURIComponent(id)}`);
    },
  };
}
