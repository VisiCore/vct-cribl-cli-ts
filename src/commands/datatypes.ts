import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listDatatypes, getDatatype, createDatatype, updateDatatype, deleteDatatype } from "../api/endpoints/datatypes.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerDatatypesCommand(program: Command): void {
  const cmd = program.command("datatypes").description("Manage datatypes");

  cmd
    .command("list")
    .description("List datatypes")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listDatatypes(getClient(), opts.group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a datatype by ID")
    .argument("<id>", "Datatype ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getDatatype(getClient(), id, opts.group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a datatype from JSON")
    .argument("<json>", "Datatype JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => {
      try {
        const data = await createDatatype(getClient(), JSON.parse(json), opts.group);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a datatype")
    .argument("<id>", "Datatype ID")
    .argument("<json>", "Datatype JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => {
      try {
        const data = await updateDatatype(getClient(), id, JSON.parse(json), opts.group);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a datatype")
    .argument("<id>", "Datatype ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        await deleteDatatype(getClient(), id, opts.group);
        console.log(formatOutput({ message: `Datatype '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
