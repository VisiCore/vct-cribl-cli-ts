import { Command } from "commander";
import { getClient } from "../api/client.js";
import { runPreview } from "../api/endpoints/preview.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerPreviewCommand(program: Command): void {
  const cmd = program.command("preview").description("Preview data processing");

  cmd
    .command("run")
    .description("Run a preview")
    .argument("<json>", "Preview JSON config")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await runPreview(client, group, JSON.parse(json));
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
