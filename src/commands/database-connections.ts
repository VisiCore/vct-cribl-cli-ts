import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listDatabaseConnections, getDatabaseConnection, createDatabaseConnection, updateDatabaseConnection, deleteDatabaseConnection, testDatabaseConnection } from "../api/endpoints/database-connections.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerDatabaseConnectionsCommand(program: Command): void {
  const cmd = program.command("db-connections").description("Manage database connections");

  cmd.command("list").description("List database connections")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); const d = await listDatabaseConnections(c, g); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get a database connection").argument("<id>", "Connection ID")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await getDatabaseConnection(c, g, id), { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("create").description("Create a database connection").argument("<json>", "JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await createDatabaseConnection(c, g, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("update").description("Update a database connection").argument("<id>", "Connection ID").argument("<json>", "JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await updateDatabaseConnection(c, g, id, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("delete").description("Delete a database connection").argument("<id>", "Connection ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); await deleteDatabaseConnection(c, g, id); console.log(formatOutput({ message: `Connection '${id}' deleted.` })); } catch (e) { handleError(e); } });

  cmd.command("test").description("Test a database connection").argument("<json>", "Connection JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await testDatabaseConnection(c, g, JSON.parse(json)))); } catch (e) { handleError(e); } });
}
