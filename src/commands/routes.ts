import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listRoutes, getRoute } from "../api/endpoints/routes.js";
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
}
