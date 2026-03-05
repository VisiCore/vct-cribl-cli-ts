import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listSdsRules, getSdsRule, createSdsRule, updateSdsRule, deleteSdsRule } from "../api/endpoints/sds-rules.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerSdsRulesCommand(program: Command): void {
  const cmd = program.command("sds-rules").description("Manage SDS rules");

  cmd
    .command("list")
    .description("List SDS rules")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await listSdsRules(client, group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get an SDS rule by ID")
    .argument("<id>", "SDS rule ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await getSdsRule(client, group, id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create an SDS rule from JSON")
    .argument("<json>", "SDS rule JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await createSdsRule(client, group, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update an SDS rule")
    .argument("<id>", "SDS rule ID")
    .argument("<json>", "SDS rule JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await updateSdsRule(client, group, id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete an SDS rule")
    .argument("<id>", "SDS rule ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        await deleteSdsRule(client, group, id);
        console.log(formatOutput({ message: `SDS rule '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
