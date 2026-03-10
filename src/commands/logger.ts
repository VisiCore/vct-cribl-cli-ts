import { Command } from "commander";
import { getClient } from "../api/client.js";
import { getLogger, setLogger } from "../api/endpoints/logger.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";
import { parseJSON } from "../utils/validation.js";

export function registerLoggerCommand(program: Command): void {
  const cmd = program.command("logger").description("Manage system logger");

  cmd
    .command("get")
    .description("Get logger configuration")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await getLogger(client, group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("set")
    .description("Update logger configuration")
    .argument("<json>", "Logger JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await setLogger(client, group, parseJSON(json, "logger"));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });
}
