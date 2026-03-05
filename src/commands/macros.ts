import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listMacros, getMacro, createMacro, updateMacro, deleteMacro } from "../api/endpoints/macros.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerMacrosCommand(program: Command): void {
  const cmd = program.command("macros").description("Manage search macros");

  cmd
    .command("list")
    .description("List macros")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listMacros(getClient(), opts.group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a macro by ID")
    .argument("<id>", "Macro ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getMacro(getClient(), id, opts.group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a macro from JSON")
    .argument("<json>", "Macro JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => {
      try {
        const data = await createMacro(getClient(), JSON.parse(json), opts.group);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a macro")
    .argument("<id>", "Macro ID")
    .argument("<json>", "Macro JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => {
      try {
        const data = await updateMacro(getClient(), id, JSON.parse(json), opts.group);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a macro")
    .argument("<id>", "Macro ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        await deleteMacro(getClient(), id, opts.group);
        console.log(formatOutput({ message: `Macro '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
