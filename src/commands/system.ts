import { Command } from "commander";
import { getClient } from "../api/client.js";
import { getSystemInfo, getSystemSettings, getHealth, getInstanceInfo, getWorkerHealth, getSystemLogs, getSystemLog, getSystemDiag, sendSystemDiag, restartSystem, reloadConfig, upgradeSystem } from "../api/endpoints/system.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerSystemCommand(program: Command): void {
  const cmd = program.command("system").description("System information and settings");

  cmd
    .command("info")
    .description("Get system information")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getSystemInfo(getClient());
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("settings")
    .description("Get system settings")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getSystemSettings(getClient());
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("health")
    .description("Get system health")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getHealth(getClient());
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("instance")
    .description("Get instance information")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getInstanceInfo(getClient());
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("worker-health")
    .description("Get worker health")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getWorkerHealth(getClient());
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("logs")
    .description("List system logs")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getSystemLogs(getClient());
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("log")
    .description("Get a specific system log")
    .argument("<id>", "Log ID")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getSystemLog(getClient(), id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("diag")
    .description("Get diagnostic bundle")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await getSystemDiag(getClient());
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("diag-send")
    .description("Send diagnostics to Cribl support")
    .action(async () => {
      try {
        const data = await sendSystemDiag(getClient());
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("restart")
    .description("Restart system")
    .action(async () => {
      try {
        const data = await restartSystem(getClient());
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("reload")
    .description("Reload configuration")
    .action(async () => {
      try {
        const data = await reloadConfig(getClient());
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("upgrade")
    .description("Check for system upgrade")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await upgradeSystem(getClient());
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });
}
