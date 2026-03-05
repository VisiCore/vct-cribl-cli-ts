import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listSchemas, getSchema, createSchema, updateSchema, deleteSchema } from "../api/endpoints/schemas.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerSchemasCommand(program: Command): void {
  const cmd = program.command("schemas").description("Manage schemas");

  cmd.command("list").description("List schemas")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); const d = await listSchemas(c, g); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get a schema").argument("<id>", "Schema ID")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await getSchema(c, g, id), { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("create").description("Create a schema").argument("<json>", "JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await createSchema(c, g, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("update").description("Update a schema").argument("<id>", "Schema ID").argument("<json>", "JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await updateSchema(c, g, id, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("delete").description("Delete a schema").argument("<id>", "Schema ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); await deleteSchema(c, g, id); console.log(formatOutput({ message: `Schema '${id}' deleted.` })); } catch (e) { handleError(e); } });
}
