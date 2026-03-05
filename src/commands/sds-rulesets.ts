import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listSdsRulesets, getSdsRuleset, createSdsRuleset, updateSdsRuleset, deleteSdsRuleset } from "../api/endpoints/sds-rulesets.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerSdsRulesetsCommand(program: Command): void {
  const cmd = program.command("sds-rulesets").description("Manage SDS rulesets");

  cmd
    .command("list")
    .description("List SDS rulesets")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await listSdsRulesets(client, group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get an SDS ruleset by ID")
    .argument("<id>", "SDS ruleset ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await getSdsRuleset(client, group, id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create an SDS ruleset from JSON")
    .argument("<json>", "SDS ruleset JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await createSdsRuleset(client, group, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update an SDS ruleset")
    .argument("<id>", "SDS ruleset ID")
    .argument("<json>", "SDS ruleset JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await updateSdsRuleset(client, group, id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete an SDS ruleset")
    .argument("<id>", "SDS ruleset ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        await deleteSdsRuleset(client, group, id);
        console.log(formatOutput({ message: `SDS ruleset '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
