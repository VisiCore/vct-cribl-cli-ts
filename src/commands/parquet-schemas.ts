import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listParquetSchemas, getParquetSchema, createParquetSchema, updateParquetSchema, deleteParquetSchema } from "../api/endpoints/parquet-schemas.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerParquetSchemasCommand(program: Command): void {
  const cmd = program.command("parquet-schemas").description("Manage Parquet schemas");

  cmd
    .command("list")
    .description("List Parquet schemas")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await listParquetSchemas(client, group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a Parquet schema by ID")
    .argument("<id>", "Parquet schema ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await getParquetSchema(client, group, id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a Parquet schema from JSON")
    .argument("<json>", "Parquet schema JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await createParquetSchema(client, group, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a Parquet schema")
    .argument("<id>", "Parquet schema ID")
    .argument("<json>", "Parquet schema JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await updateParquetSchema(client, group, id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a Parquet schema")
    .argument("<id>", "Parquet schema ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        await deleteParquetSchema(client, group, id);
        console.log(formatOutput({ message: `Parquet schema '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
