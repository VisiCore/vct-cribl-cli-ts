import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listGrok, getGrok, createGrok, updateGrok, deleteGrok } from "../api/endpoints/grok.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerGrokCommand(program: Command): void {
  const cmd = program.command("grok").description("Manage grok patterns");

  cmd.command("list").description("List grok patterns")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); const d = await listGrok(c, g); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get a grok pattern").argument("<id>", "Pattern ID")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await getGrok(c, g, id), { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("create").description("Create a grok pattern").argument("<json>", "JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await createGrok(c, g, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("update").description("Update a grok pattern").argument("<id>", "Pattern ID").argument("<json>", "JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await updateGrok(c, g, id, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("delete").description("Delete a grok pattern").argument("<id>", "Pattern ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); await deleteGrok(c, g, id); console.log(formatOutput({ message: `Grok pattern '${id}' deleted.` })); } catch (e) { handleError(e); } });
}
