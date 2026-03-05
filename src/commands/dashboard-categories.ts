import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listDashboardCategories, getDashboardCategory, createDashboardCategory, updateDashboardCategory, deleteDashboardCategory } from "../api/endpoints/dashboard-categories.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerDashboardCategoriesCommand(program: Command): void {
  const cmd = program.command("dashboard-categories").description("Manage dashboard categories");

  cmd
    .command("list")
    .description("List dashboard categories")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listDashboardCategories(getClient(), opts.group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a dashboard category by ID")
    .argument("<id>", "Dashboard category ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getDashboardCategory(getClient(), id, opts.group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a dashboard category from JSON")
    .argument("<json>", "Dashboard category JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => {
      try {
        const data = await createDashboardCategory(getClient(), JSON.parse(json), opts.group);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a dashboard category")
    .argument("<id>", "Dashboard category ID")
    .argument("<json>", "Dashboard category JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => {
      try {
        const data = await updateDashboardCategory(getClient(), id, JSON.parse(json), opts.group);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a dashboard category")
    .argument("<id>", "Dashboard category ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        await deleteDashboardCategory(getClient(), id, opts.group);
        console.log(formatOutput({ message: `Dashboard category '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
