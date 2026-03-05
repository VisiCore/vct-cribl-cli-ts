import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listLakeDatasets, getLakeDataset, createLakeDataset, updateLakeDataset, deleteLakeDataset } from "../api/endpoints/lake-datasets.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerLakeDatasetsCommand(program: Command): void {
  const cmd = program.command("lake-datasets").description("Manage lake datasets");

  cmd
    .command("list")
    .description("List lake datasets")
    .requiredOption("--lake <id>", "Lake ID")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listLakeDatasets(getClient(), opts.lake);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a lake dataset by ID")
    .argument("<id>", "Dataset ID")
    .requiredOption("--lake <id>", "Lake ID")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getLakeDataset(getClient(), opts.lake, id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a lake dataset from JSON")
    .argument("<json>", "Dataset JSON config")
    .requiredOption("--lake <id>", "Lake ID")
    .action(async (json: string, opts) => {
      try {
        const data = await createLakeDataset(getClient(), opts.lake, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a lake dataset")
    .argument("<id>", "Dataset ID")
    .argument("<json>", "Dataset JSON config")
    .requiredOption("--lake <id>", "Lake ID")
    .action(async (id: string, json: string, opts) => {
      try {
        const data = await updateLakeDataset(getClient(), opts.lake, id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a lake dataset")
    .argument("<id>", "Dataset ID")
    .requiredOption("--lake <id>", "Lake ID")
    .action(async (id: string, opts) => {
      try {
        await deleteLakeDataset(getClient(), opts.lake, id);
        console.log(formatOutput({ message: `Lake dataset '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
