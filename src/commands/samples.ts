import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listSamples, getSample, getSampleContent, createSample, deleteSample } from "../api/endpoints/samples.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerSamplesCommand(program: Command): void {
  const cmd = program.command("samples").description("Manage sample data");

  cmd.command("list").description("List samples")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); const d = await listSamples(c, g); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get a sample").argument("<id>", "Sample ID")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await getSample(c, g, id), { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("content").description("Get sample content").argument("<id>", "Sample ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await getSampleContent(c, g, id))); } catch (e) { handleError(e); } });

  cmd.command("create").description("Create a sample").argument("<json>", "JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await createSample(c, g, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("delete").description("Delete a sample").argument("<id>", "Sample ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); await deleteSample(c, g, id); console.log(formatOutput({ message: `Sample '${id}' deleted.` })); } catch (e) { handleError(e); } });
}
