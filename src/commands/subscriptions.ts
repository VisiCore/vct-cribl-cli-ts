import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listSubscriptions, getSubscription } from "../api/endpoints/subscriptions.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerSubscriptionsCommand(program: Command): void {
  const cmd = program.command("subscriptions").description("Manage subscriptions");

  cmd
    .command("list")
    .description("List subscriptions")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listSubscriptions(getClient());
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a subscription by ID")
    .argument("<id>", "Subscription ID")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getSubscription(getClient(), id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
