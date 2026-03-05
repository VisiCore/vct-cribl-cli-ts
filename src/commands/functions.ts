import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listFunctions, getFunction } from "../api/endpoints/functions.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerFunctionsCommand(program: Command): void {
  const cmd = program.command("functions").description("List available functions");

  cmd.command("list").description("List functions")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); const d = await listFunctions(c, g); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get a function").argument("<id>", "Function ID")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await getFunction(c, g, id), { table: opts.table })); } catch (e) { handleError(e); } });
}
