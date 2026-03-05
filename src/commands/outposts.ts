import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listOutposts, getOutpost } from "../api/endpoints/outposts.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerOutpostsCommand(program: Command): void {
  const cmd = program.command("outposts").description("Manage outposts");

  cmd
    .command("list")
    .description("List outposts")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listOutposts(getClient());
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get an outpost by ID")
    .argument("<id>", "Outpost ID")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getOutpost(getClient(), id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
