import type { AxiosInstance } from "axios";
import type { SystemMetrics } from "../types.js";

export interface MetricsFilter {
  filterExpr?: string;
  metricsNames?: string[];
}

export async function getMetrics(
  client: AxiosInstance,
  filter?: MetricsFilter
): Promise<SystemMetrics> {
  const params: Record<string, unknown> = {};
  if (filter?.filterExpr) params.filterExpr = filter.filterExpr;
  if (filter?.metricsNames) params.names = filter.metricsNames.join(",");

  const resp = await client.get<SystemMetrics>("/api/v1/system/metrics", { params });
  return resp.data;
}
