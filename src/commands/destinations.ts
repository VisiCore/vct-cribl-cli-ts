import { Command } from "commander";
import { getClient } from "../api/client.js";
import { getDestinations } from "../api/endpoints/destinations.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerDestinationsCommand(program: Command): void {
  const destinations = program.command("destinations").description("Manage destinations");

  destinations
    .command("get")
    .description("Get destination configurations")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await getDestinations(client, group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
