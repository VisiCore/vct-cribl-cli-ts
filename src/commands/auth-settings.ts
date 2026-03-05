import { Command } from "commander";
import { getClient } from "../api/client.js";
import { getAuthSettings, updateAuthSettings } from "../api/endpoints/auth-settings.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerAuthSettingsCommand(program: Command): void {
  const cmd = program.command("auth-settings").description("Manage auth settings");

  cmd
    .command("get")
    .description("Get auth settings")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getAuthSettings(getClient());
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update auth settings")
    .argument("<json>", "Auth settings JSON")
    .action(async (json: string) => {
      try {
        const data = await updateAuthSettings(getClient(), JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });
}
