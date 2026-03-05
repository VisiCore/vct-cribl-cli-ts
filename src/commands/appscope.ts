import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listAppscopeConfigs, getAppscopeConfig, createAppscopeConfig, updateAppscopeConfig, deleteAppscopeConfig } from "../api/endpoints/appscope.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerAppscopeCommand(program: Command): void {
  const cmd = program.command("appscope").description("Manage AppScope configurations");

  cmd
    .command("list")
    .description("List AppScope configurations")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await listAppscopeConfigs(client, group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get an AppScope configuration by ID")
    .argument("<id>", "AppScope configuration ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await getAppscopeConfig(client, group, id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create an AppScope configuration from JSON")
    .argument("<json>", "AppScope configuration JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await createAppscopeConfig(client, group, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update an AppScope configuration")
    .argument("<id>", "AppScope configuration ID")
    .argument("<json>", "AppScope configuration JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await updateAppscopeConfig(client, group, id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete an AppScope configuration")
    .argument("<id>", "AppScope configuration ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        await deleteAppscopeConfig(client, group, id);
        console.log(formatOutput({ message: `AppScope configuration '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
