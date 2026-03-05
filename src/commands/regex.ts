import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listRegex, getRegex, createRegex, updateRegex, deleteRegex } from "../api/endpoints/regex.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerRegexCommand(program: Command): void {
  const cmd = program.command("regex").description("Manage regex patterns");

  cmd.command("list").description("List regex patterns")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); const d = await listRegex(c, g); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get a regex pattern").argument("<id>", "Pattern ID")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await getRegex(c, g, id), { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("create").description("Create a regex pattern").argument("<json>", "JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await createRegex(c, g, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("update").description("Update a regex pattern").argument("<id>", "Pattern ID").argument("<json>", "JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await updateRegex(c, g, id, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("delete").description("Delete a regex pattern").argument("<id>", "Pattern ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); await deleteRegex(c, g, id); console.log(formatOutput({ message: `Regex '${id}' deleted.` })); } catch (e) { handleError(e); } });
}
