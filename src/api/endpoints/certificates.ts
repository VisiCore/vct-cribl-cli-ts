import type { AxiosInstance } from "axios";
import type { ApiListResponse, Certificate } from "../types.js";

function groupPath(group: string) {
  return `/api/v1/m/${encodeURIComponent(group)}`;
}

export async function listCertificates(client: AxiosInstance, group: string): Promise<ApiListResponse<Certificate>> {
  const resp = await client.get<ApiListResponse<Certificate>>(`${groupPath(group)}/system/certificates`);
  return resp.data;
}

export async function getCertificate(client: AxiosInstance, group: string, id: string): Promise<Certificate> {
  const resp = await client.get<{ items: Certificate[] }>(`${groupPath(group)}/system/certificates/${encodeURIComponent(id)}`);
  return resp.data.items?.[0] ?? resp.data;
}

export async function createCertificate(client: AxiosInstance, group: string, data: Record<string, unknown>): Promise<Certificate> {
  const resp = await client.post<Certificate>(`${groupPath(group)}/system/certificates`, data);
  return resp.data;
}

export async function deleteCertificate(client: AxiosInstance, group: string, id: string): Promise<void> {
  await client.delete(`${groupPath(group)}/system/certificates/${encodeURIComponent(id)}`);
}
