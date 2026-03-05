import { Command } from "commander";
import { getClient } from "../api/client.js";
import { getProfiler, startProfiler, stopProfiler } from "../api/endpoints/profiler.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerProfilerCommand(program: Command): void {
  const cmd = program.command("profiler").description("Manage system profiler");

  cmd
    .command("get")
    .description("Get profiler status")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await getProfiler(client, group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("start")
    .description("Start the profiler")
    .option("-g, --group <name>", "Worker group name")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await startProfiler(client, group);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("stop")
    .description("Stop the profiler")
    .option("-g, --group <name>", "Worker group name")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await stopProfiler(client, group);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });
}
