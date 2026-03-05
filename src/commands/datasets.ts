import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listDatasets } from "../api/endpoints/datasets.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerDatasetsCommand(program: Command): void {
  const datasets = program.command("datasets").description("Search datasets");

  datasets
    .command("list")
    .description("List search datasets")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listDatasets(getClient(), opts.group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
