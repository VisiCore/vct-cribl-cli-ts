import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listFeatureFlags, getFeatureFlag, updateFeatureFlag } from "../api/endpoints/feature-flags.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerFeatureFlagsCommand(program: Command): void {
  const cmd = program.command("feature-flags").description("Manage feature flags");

  cmd
    .command("list")
    .description("List feature flags")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listFeatureFlags(getClient());
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a feature flag by ID")
    .argument("<id>", "Feature flag ID")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getFeatureFlag(getClient(), id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a feature flag")
    .argument("<id>", "Feature flag ID")
    .argument("<json>", "Feature flag JSON config")
    .action(async (id: string, json: string) => {
      try {
        const data = await updateFeatureFlag(getClient(), id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });
}
