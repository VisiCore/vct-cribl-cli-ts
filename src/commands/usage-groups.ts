import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listUsageGroups, getUsageGroup } from "../api/endpoints/usage-groups.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerUsageGroupsCommand(program: Command): void {
  const cmd = program.command("usage-groups").description("Manage usage groups");

  cmd
    .command("list")
    .description("List usage groups")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listUsageGroups(getClient(), opts.group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a usage group by ID")
    .argument("<id>", "Usage group ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getUsageGroup(getClient(), id, opts.group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
