import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listCertificates, getCertificate, createCertificate, deleteCertificate } from "../api/endpoints/certificates.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerCertificatesCommand(program: Command): void {
  const cmd = program.command("certificates").description("Manage certificates");

  cmd.command("list").description("List certificates")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); const d = await listCertificates(c, g); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get a certificate").argument("<id>", "Certificate ID")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await getCertificate(c, g, id), { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("create").description("Create a certificate").argument("<json>", "JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await createCertificate(c, g, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("delete").description("Delete a certificate").argument("<id>", "Certificate ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); await deleteCertificate(c, g, id); console.log(formatOutput({ message: `Certificate '${id}' deleted.` })); } catch (e) { handleError(e); } });
}
