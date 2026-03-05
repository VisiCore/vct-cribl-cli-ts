import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listAlerts } from "../api/endpoints/alerts.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerAlertsCommand(program: Command): void {
  const alerts = program.command("alerts").description("Alert notifications");

  alerts
    .command("list")
    .description("List alerts")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listAlerts(getClient());
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
