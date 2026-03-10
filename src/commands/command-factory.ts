import { Command } from "commander";
import { getClient } from "../api/client.js";
import { createEndpoints, type EndpointScope, type CrudEndpoints } from "../api/endpoint-factory.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";
import { parseJSON } from "../utils/validation.js";

export type CrudOperation = "list" | "get" | "create" | "update" | "delete";

export interface CommandConfig {
  name: string;
  description: string;
  scope: EndpointScope;
  path: string;
  operations?: CrudOperation[];
  singleton?: boolean;
}

const DEFAULT_OPS: CrudOperation[] = ["list", "get", "create", "update", "delete"];

function singularName(plural: string): string {
  // "parsers" -> "parser", "policies" -> "policy", "entries" -> "entry"
  if (plural.endsWith("ies")) return plural.slice(0, -3) + "y";
  if (plural.endsWith("ses") || plural.endsWith("xes") || plural.endsWith("zes")) return plural.slice(0, -2);
  if (plural.endsWith("s")) return plural.slice(0, -1);
  return plural;
}

function getResourceLabel(name: string): string {
  // "db-connections" -> "db connection", "sds-rules" -> "SDS rule"
  const parts = name.split("-");
  const last = parts[parts.length - 1];
  const singular = singularName(last);
  parts[parts.length - 1] = singular;
  return parts.join(" ");
}

async function resolveGroupForScope(
  client: ReturnType<typeof getClient>,
  scope: EndpointScope,
  groupOpt?: string
): Promise<string> {
  if (scope === "global") return "_global_";
  if (scope === "search") return groupOpt ?? "default_search";
  if (scope === "lake") return groupOpt ?? "";
  return resolveGroup(client, groupOpt);
}

export function registerCrudCommand(program: Command, config: CommandConfig): void {
  const { name, description, scope, path } = config;
  const ops = config.operations ?? DEFAULT_OPS;
  const endpoints = createEndpoints({ scope, path, singleton: config.singleton });
  const label = getResourceLabel(name);
  const cmd = program.command(name).description(description);

  const needsGroup = scope === "group" || scope === "search";
  const needsLake = scope === "lake";

  function addGroupOption(sub: Command): Command {
    if (needsGroup) sub.option("-g, --group <name>", "Worker group name");
    if (needsLake) sub.requiredOption("--lake <id>", "Lake ID");
    return sub;
  }

  function getGroupOrLake(opts: Record<string, unknown>): string | undefined {
    if (needsLake) return opts.lake as string;
    return opts.group as string | undefined;
  }

  if (ops.includes("list")) {
    const sub = cmd.command("list").description(`List ${name}`);
    addGroupOption(sub).option("--table", "Table output");
    sub.action(async (opts) => {
      try {
        const client = getClient();
        const g = await resolveGroupForScope(client, scope, getGroupOrLake(opts));
        const data = await endpoints.list(client, g);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (e) { handleError(e); }
    });
  }

  if (ops.includes("get")) {
    if (config.singleton) {
      const sub = cmd.command("get").description(`Get ${label}`);
      addGroupOption(sub).option("--table", "Table output");
      sub.action(async (opts) => {
        try {
          const client = getClient();
          const g = await resolveGroupForScope(client, scope, getGroupOrLake(opts));
          console.log(formatOutput(await endpoints.get(client, g, ""), { table: opts.table }));
        } catch (e) { handleError(e); }
      });
    } else {
      const sub = cmd.command("get").description(`Get a ${label} by ID`).argument("<id>", `${label} ID`);
      addGroupOption(sub).option("--table", "Table output");
      sub.action(async (id: string, opts) => {
        try {
          const client = getClient();
          const g = await resolveGroupForScope(client, scope, getGroupOrLake(opts));
          console.log(formatOutput(await endpoints.get(client, g, id), { table: opts.table }));
        } catch (e) { handleError(e); }
      });
    }
  }

  if (ops.includes("create")) {
    const sub = cmd.command("create").description(`Create a ${label} from JSON`).argument("<json>", `${label} JSON config`);
    addGroupOption(sub);
    sub.action(async (json: string, opts) => {
      try {
        const client = getClient();
        const g = await resolveGroupForScope(client, scope, getGroupOrLake(opts));
        console.log(formatOutput(await endpoints.create(client, g, parseJSON(json, label))));
      } catch (e) { handleError(e); }
    });
  }

  if (ops.includes("update")) {
    if (config.singleton) {
      const sub = cmd.command("update").description(`Update ${label}`).argument("<json>", `${label} JSON config`);
      addGroupOption(sub);
      sub.action(async (json: string, opts) => {
        try {
          const client = getClient();
          const g = await resolveGroupForScope(client, scope, getGroupOrLake(opts));
          const existing = await endpoints.get(client, g, "");
          // Strip server-computed fields that Cribl's PATCH API rejects if included
          const { status, notifications, ...cleanExisting } = existing;
          const merged = { ...cleanExisting, ...parseJSON(json, label) };
          console.log(formatOutput(await endpoints.update(client, g, "", merged)));
        } catch (e) { handleError(e); }
      });
    } else {
      const sub = cmd.command("update").description(`Update a ${label}`).argument("<id>", `${label} ID`).argument("<json>", `${label} JSON config`);
      addGroupOption(sub);
      sub.action(async (id: string, json: string, opts) => {
        try {
          const client = getClient();
          const g = await resolveGroupForScope(client, scope, getGroupOrLake(opts));
          const existing = await endpoints.get(client, g, id);
          // Strip server-computed fields that Cribl's PATCH API rejects if included
          const { status, notifications, ...cleanExisting } = existing;
          const merged = { ...cleanExisting, ...parseJSON(json, label) };
          console.log(formatOutput(await endpoints.update(client, g, id, merged)));
        } catch (e) { handleError(e); }
      });
    }
  }

  if (ops.includes("delete")) {
    const sub = cmd.command("delete").description(`Delete a ${label}`).argument("<id>", `${label} ID`);
    addGroupOption(sub);
    sub.action(async (id: string, opts) => {
      try {
        const client = getClient();
        const g = await resolveGroupForScope(client, scope, getGroupOrLake(opts));
        await endpoints.delete(client, g, id);
        console.log(formatOutput({ message: `${label} '${id}' deleted.` }));
      } catch (e) { handleError(e); }
    });
  }
}
