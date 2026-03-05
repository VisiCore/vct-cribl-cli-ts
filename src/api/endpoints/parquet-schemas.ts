import type { AxiosInstance } from "axios";
import type { ApiListResponse, ParquetSchema } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listParquetSchemas(
  client: AxiosInstance,
  group: string
): Promise<ApiListResponse<ParquetSchema>> {
  const resp = await client.get<ApiListResponse<ParquetSchema>>(
    `${groupPath(group)}/lib/parquet-schemas`
  );
  return resp.data;
}

export async function getParquetSchema(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<ParquetSchema> {
  const resp = await client.get<{ items: ParquetSchema[] }>(
    `${groupPath(group)}/lib/parquet-schemas/${encodeURIComponent(id)}`
  );
  return resp.data.items?.[0] ?? resp.data;
}

export async function createParquetSchema(
  client: AxiosInstance,
  group: string,
  body: Record<string, unknown>
): Promise<ParquetSchema> {
  const resp = await client.post<ParquetSchema>(
    `${groupPath(group)}/lib/parquet-schemas`,
    body
  );
  return resp.data;
}

export async function updateParquetSchema(
  client: AxiosInstance,
  group: string,
  id: string,
  body: Record<string, unknown>
): Promise<ParquetSchema> {
  const resp = await client.patch<ParquetSchema>(
    `${groupPath(group)}/lib/parquet-schemas/${encodeURIComponent(id)}`,
    body
  );
  return resp.data;
}

export async function deleteParquetSchema(
  client: AxiosInstance,
  group: string,
  id: string
): Promise<void> {
  await client.delete(
    `${groupPath(group)}/lib/parquet-schemas/${encodeURIComponent(id)}`
  );
}
