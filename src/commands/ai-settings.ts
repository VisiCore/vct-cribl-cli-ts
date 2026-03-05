import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listAiSettings, getAiSetting, updateAiSetting } from "../api/endpoints/ai-settings.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerAiSettingsCommand(program: Command): void {
  const cmd = program.command("ai-settings").description("Manage AI settings");

  cmd
    .command("list")
    .description("List AI settings")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listAiSettings(getClient());
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get an AI setting by ID")
    .argument("<id>", "AI setting ID")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getAiSetting(getClient(), id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update an AI setting")
    .argument("<id>", "AI setting ID")
    .argument("<json>", "AI setting JSON config")
    .action(async (id: string, json: string) => {
      try {
        const data = await updateAiSetting(getClient(), id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });
}
