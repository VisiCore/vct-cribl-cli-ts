import type { AxiosInstance } from "axios";
import type { WorkerGroup } from "../api/types.js";

/**
 * If no group is specified, auto-detect by listing worker groups
 * and returning the first one (or "default" as fallback).
 */
export async function resolveGroup(
  client: AxiosInstance,
  group?: string
): Promise<string> {
  if (group) return group;

  const resp = await client.get<{ items: WorkerGroup[] }>("/api/v1/master/groups");
  const groups = resp.data.items;

  if (groups.length === 0) {
    return "default";
  }

  return groups[0].id;
}
