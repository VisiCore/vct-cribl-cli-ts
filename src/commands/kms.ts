import { Command } from "commander";
import { getClient } from "../api/client.js";
import { getKmsConfig, updateKmsConfig, getKmsHealth } from "../api/endpoints/kms.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";
import { parseJSON } from "../utils/validation.js";

export function registerKmsCommand(program: Command): void {
  const cmd = program.command("kms").description("Manage KMS configuration");

  cmd
    .command("config")
    .description("Get KMS config")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getKmsConfig(getClient());
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update KMS config")
    .argument("<json>", "KMS config JSON")
    .action(async (json: string) => {
      try {
        const data = await updateKmsConfig(getClient(), parseJSON(json, "KMS config"));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("health")
    .description("Get KMS health")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getKmsHealth(getClient());
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
