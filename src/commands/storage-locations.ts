import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listStorageLocations, getStorageLocation, createStorageLocation, updateStorageLocation, deleteStorageLocation } from "../api/endpoints/storage-locations.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerStorageLocationsCommand(program: Command): void {
  const cmd = program.command("storage-locations").description("Manage lake storage locations");

  cmd
    .command("list")
    .description("List storage locations")
    .requiredOption("--lake <id>", "Lake ID")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listStorageLocations(getClient(), opts.lake);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a storage location by ID")
    .argument("<id>", "Storage location ID")
    .requiredOption("--lake <id>", "Lake ID")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getStorageLocation(getClient(), opts.lake, id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a storage location from JSON")
    .argument("<json>", "Storage location JSON config")
    .requiredOption("--lake <id>", "Lake ID")
    .action(async (json: string, opts) => {
      try {
        const data = await createStorageLocation(getClient(), opts.lake, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a storage location")
    .argument("<id>", "Storage location ID")
    .argument("<json>", "Storage location JSON config")
    .requiredOption("--lake <id>", "Lake ID")
    .action(async (id: string, json: string, opts) => {
      try {
        const data = await updateStorageLocation(getClient(), opts.lake, id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a storage location")
    .argument("<id>", "Storage location ID")
    .requiredOption("--lake <id>", "Lake ID")
    .action(async (id: string, opts) => {
      try {
        await deleteStorageLocation(getClient(), opts.lake, id);
        console.log(formatOutput({ message: `Storage location '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
