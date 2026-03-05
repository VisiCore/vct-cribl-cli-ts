import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listPacks, getPack, createPack, deletePack, exportPack } from "../api/endpoints/packs.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerPacksCommand(program: Command): void {
  const cmd = program.command("packs").description("Manage packs");

  cmd
    .command("list")
    .description("List packs")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await listPacks(client, group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a pack by ID")
    .argument("<id>", "Pack ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await getPack(client, group, id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a pack from JSON")
    .argument("<json>", "Pack JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await createPack(client, group, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a pack")
    .argument("<id>", "Pack ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        await deletePack(client, group, id);
        console.log(formatOutput({ message: `Pack '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("export")
    .description("Export a pack")
    .argument("<id>", "Pack ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await exportPack(client, group, id);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });
}
