import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listDatasetProviders, getDatasetProvider, createDatasetProvider, updateDatasetProvider, deleteDatasetProvider } from "../api/endpoints/dataset-providers.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerDatasetProvidersCommand(program: Command): void {
  const cmd = program.command("dataset-providers").description("Manage dataset providers");

  cmd
    .command("list")
    .description("List dataset providers")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listDatasetProviders(getClient(), opts.group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a dataset provider by ID")
    .argument("<id>", "Dataset provider ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getDatasetProvider(getClient(), id, opts.group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a dataset provider from JSON")
    .argument("<json>", "Dataset provider JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => {
      try {
        const data = await createDatasetProvider(getClient(), JSON.parse(json), opts.group);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a dataset provider")
    .argument("<id>", "Dataset provider ID")
    .argument("<json>", "Dataset provider JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => {
      try {
        const data = await updateDatasetProvider(getClient(), id, JSON.parse(json), opts.group);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a dataset provider")
    .argument("<id>", "Dataset provider ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        await deleteDatasetProvider(getClient(), id, opts.group);
        console.log(formatOutput({ message: `Dataset provider '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
