import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listProtobufLibs, getProtobufLib, createProtobufLib, updateProtobufLib, deleteProtobufLib } from "../api/endpoints/protobuf-libs.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerProtobufLibsCommand(program: Command): void {
  const cmd = program.command("protobuf-libs").description("Manage Protobuf libraries");

  cmd
    .command("list")
    .description("List Protobuf libraries")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await listProtobufLibs(client, group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a Protobuf library by ID")
    .argument("<id>", "Protobuf library ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await getProtobufLib(client, group, id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a Protobuf library from JSON")
    .argument("<json>", "Protobuf library JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await createProtobufLib(client, group, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a Protobuf library")
    .argument("<id>", "Protobuf library ID")
    .argument("<json>", "Protobuf library JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await updateProtobufLib(client, group, id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a Protobuf library")
    .argument("<id>", "Protobuf library ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        await deleteProtobufLib(client, group, id);
        console.log(formatOutput({ message: `Protobuf library '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
