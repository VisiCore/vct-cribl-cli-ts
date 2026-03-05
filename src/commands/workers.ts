import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listWorkerGroups } from "../api/endpoints/workers.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerWorkersCommand(program: Command): void {
  const workers = program.command("workers").description("Manage worker groups");

  workers
    .command("list")
    .description("List worker groups")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listWorkerGroups(getClient());
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
