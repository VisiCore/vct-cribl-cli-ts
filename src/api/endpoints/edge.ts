import type { AxiosInstance } from "axios";
import type { ApiListResponse, EdgeContainer, EdgeProcess } from "../types.js";

function fleetPath(fleet: string) {
  return `/api/v1/m/${encodeURIComponent(fleet)}`;
}

export async function listContainers(
  client: AxiosInstance,
  fleet: string
): Promise<ApiListResponse<EdgeContainer>> {
  const resp = await client.get<ApiListResponse<EdgeContainer>>(
    `${fleetPath(fleet)}/edge/containers`
  );
  return resp.data;
}

export async function getContainer(
  client: AxiosInstance,
  fleet: string,
  id: string
): Promise<EdgeContainer> {
  const resp = await client.get<EdgeContainer>(
    `${fleetPath(fleet)}/edge/containers/${encodeURIComponent(id)}`
  );
  return resp.data;
}

export async function listProcesses(
  client: AxiosInstance,
  fleet: string
): Promise<ApiListResponse<EdgeProcess>> {
  const resp = await client.get<ApiListResponse<EdgeProcess>>(
    `${fleetPath(fleet)}/edge/processes`
  );
  return resp.data;
}

export async function getEdgeLogs(
  client: AxiosInstance,
  fleet: string
): Promise<unknown> {
  const resp = await client.get(`${fleetPath(fleet)}/edge/logs`);
  return resp.data;
}

export async function getEdgeMetadata(
  client: AxiosInstance,
  fleet: string
): Promise<unknown> {
  const resp = await client.get(`${fleetPath(fleet)}/edge/metadata`);
  return resp.data;
}

export async function getEdgeEvents(
  client: AxiosInstance,
  fleet: string
): Promise<unknown> {
  const resp = await client.get(`${fleetPath(fleet)}/edge/events`);
  return resp.data;
}

export async function getEdgeFile(
  client: AxiosInstance,
  fleet: string,
  filePath: string
): Promise<unknown> {
  const resp = await client.get(`${fleetPath(fleet)}/edge/file/${encodeURIComponent(filePath)}`);
  return resp.data;
}

export async function listEdgeFiles(
  client: AxiosInstance,
  fleet: string,
  dirPath: string
): Promise<unknown> {
  const resp = await client.get(`${fleetPath(fleet)}/edge/ls`, { params: { path: dirPath } });
  return resp.data;
}

export async function getEdgeKubeLogs(
  client: AxiosInstance,
  fleet: string
): Promise<unknown> {
  const resp = await client.get(`${fleetPath(fleet)}/edge/kube-logs`);
  return resp.data;
}
