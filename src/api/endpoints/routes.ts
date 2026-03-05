import type { AxiosInstance } from "axios";
import type { Route } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listRoutes(
  client: AxiosInstance,
  group: string
): Promise<Route> {
  const resp = await client.get<Route>(`${groupPath(group)}/routes`);
  return resp.data;
}

export async function getRoute(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<Route> {
  const resp = await client.get<Route>(
    `${groupPath(group)}/routes/${encodeURIComponent(id)}`
  );
  return resp.data;
}

export async function updateRoute(
  client: AxiosInstance,
  group: string,
  id: string,
  route: Record<string, unknown>
): Promise<Route> {
  const resp = await client.patch<Route>(
    `${groupPath(group)}/routes/${encodeURIComponent(id)}`,
    route
  );
  return resp.data;
}
