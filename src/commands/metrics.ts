import { Command } from "commander";
import { getClient } from "../api/client.js";
import { getMetrics } from "../api/endpoints/metrics.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerMetricsCommand(program: Command): void {
  const metrics = program.command("metrics").description("System metrics");

  metrics
    .command("get")
    .description("Get system metrics")
    .option("--filter <expr>", "Filter expression")
    .option("--names <names>", "Comma-separated metric names")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getMetrics(getClient(), {
          filterExpr: opts.filter,
          metricsNames: opts.names ? (opts.names as string).split(",") : undefined,
        });
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
