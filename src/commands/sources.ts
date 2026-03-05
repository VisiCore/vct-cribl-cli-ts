import { Command } from "commander";
import { getClient } from "../api/client.js";
import { getSources } from "../api/endpoints/sources.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerSourcesCommand(program: Command): void {
  const sources = program.command("sources").description("Manage sources");

  sources
    .command("get")
    .description("Get source configurations")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await getSources(client, group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
