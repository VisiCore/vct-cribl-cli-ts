import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listCredentials, getCredential } from "../api/endpoints/credentials.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerCredentialsCommand(program: Command): void {
  const cmd = program.command("credentials").description("Manage credentials");

  cmd.command("list").description("List credentials")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); const d = await listCredentials(c, g); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get a credential").argument("<id>", "Credential ID")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await getCredential(c, g, id), { table: opts.table })); } catch (e) { handleError(e); } });
}
