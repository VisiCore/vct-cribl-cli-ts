import type { AxiosInstance } from "axios";
import type { ApiListResponse, ProtobufLib } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listProtobufLibs(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<ProtobufLib>> {
  const resp = await client.get<ApiListResponse<ProtobufLib>>(
    `${groupPath(group)}/lib/protobuf-libraries`
  );
  return resp.data;
}

export async function getProtobufLib(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<ProtobufLib> {
  const resp = await client.get<{ items: ProtobufLib[] }>(
    `${groupPath(group)}/lib/protobuf-libraries/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createProtobufLib(
  client: AxiosInstance,
  group: string,
  body: Record<string, unknown>
): Promise<ProtobufLib> {
  const resp = await client.post<ProtobufLib>(
    `${groupPath(group)}/lib/protobuf-libraries`,
    body
  );
  return resp.data;
}

export async function updateProtobufLib(
  client: AxiosInstance,
  group: string,
  id: string,
  body: Record<string, unknown>
): Promise<ProtobufLib> {
  const resp = await client.patch<ProtobufLib>(
    `${groupPath(group)}/lib/protobuf-libraries/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteProtobufLib(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<void> {
  await client.delete(
    `${groupPath(group)}/lib/protobuf-libraries/${encodeURIComponent(id)}`
  );
}
