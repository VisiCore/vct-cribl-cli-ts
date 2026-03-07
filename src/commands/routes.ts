import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listRoutes, getRoute, updateRoute, deleteRoute } from "../api/endpoints/routes.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerRoutesCommand(program: Command): void {
  const cmd = program.command("routes").description("Manage routes");

  cmd
    .command("list")
    .description("List routes")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await listRoutes(client, group);
        // Routes response has a `routes` array inside
        const routes = (data as Record<string, unknown>).routes ?? data;
        console.log(formatOutput(routes, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a route by ID")
    .argument("<id>", "Route ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await getRoute(client, group, id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a route (appends to existing route table)")
    .argument("<json>", "Route JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const newRoute = JSON.parse(json);

        // Fetch existing route table and append the new route
        const existing = await getRoute(client, group, "default") as Record<string, unknown>;
        const items = (existing.items ?? [existing]) as Record<string, unknown>[];
        const routeTable = items[0] ?? existing;
        const existingRoutes = ((routeTable.routes ?? []) as Record<string, unknown>[]).slice();

        // Insert before the last route if it's a catch-all (filter: "true", final: true)
        const lastRoute = existingRoutes[existingRoutes.length - 1];
        if (lastRoute && lastRoute.filter === "true" && lastRoute.final === true) {
          existingRoutes.splice(existingRoutes.length - 1, 0, newRoute);
        } else {
          existingRoutes.push(newRoute);
        }

        const data = await updateRoute(client, group, "default", { routes: existingRoutes });
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a route")
    .argument("<id>", "Route ID")
    .argument("<json>", "Route JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const changes = JSON.parse(json);

        // Fetch existing route table, find the route, merge, and update the whole table
        const existing = await getRoute(client, group, "default") as Record<string, unknown>;
        const items = (existing.items ?? [existing]) as Record<string, unknown>[];
        const routeTable = items[0] ?? existing;
        const routes = ((routeTable.routes ?? []) as Record<string, unknown>[]).slice();

        const idx = routes.findIndex((r) => r.id === id);
        if (idx === -1) {
          throw new Error(`Route '${id}' not found in the route table.`);
        }
        routes[idx] = { ...routes[idx], ...changes };

        const data = await updateRoute(client, group, "default", { routes });
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a route")
    .argument("<id>", "Route ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        await deleteRoute(client, group, id);
        console.log(formatOutput({ message: `Route '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
