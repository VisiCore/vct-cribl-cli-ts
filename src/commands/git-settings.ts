import { Command } from "commander";
import { getClient } from "../api/client.js";
import { getGitSettings, updateGitSettings } from "../api/endpoints/git-settings.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerGitSettingsCommand(program: Command): void {
  const cmd = program.command("git-settings").description("Manage git settings");

  cmd
    .command("get")
    .description("Get git settings")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getGitSettings(getClient());
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update git settings")
    .argument("<json>", "Git settings JSON")
    .action(async (json: string) => {
      try {
        const data = await updateGitSettings(getClient(), JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });
}
