import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listScripts, getScript, createScript, deleteScript } from "../api/endpoints/scripts.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerScriptsCommand(program: Command): void {
  const cmd = program.command("scripts").description("Manage scripts");

  cmd.command("list").description("List scripts")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); const d = await listScripts(c, g); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get a script").argument("<id>", "Script ID")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await getScript(c, g, id), { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("create").description("Create a script").argument("<json>", "JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await createScript(c, g, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("delete").description("Delete a script").argument("<id>", "Script ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); await deleteScript(c, g, id); console.log(formatOutput({ message: `Script '${id}' deleted.` })); } catch (e) { handleError(e); } });
}
