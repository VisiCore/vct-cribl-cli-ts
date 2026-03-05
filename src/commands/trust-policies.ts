import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listTrustPolicies, getTrustPolicy, createTrustPolicy, updateTrustPolicy, deleteTrustPolicy } from "../api/endpoints/trust-policies.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerTrustPoliciesCommand(program: Command): void {
  const cmd = program.command("trust-policies").description("Manage trust policies");

  cmd
    .command("list")
    .description("List trust policies")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listTrustPolicies(getClient(), opts.group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a trust policy by ID")
    .argument("<id>", "Trust policy ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getTrustPolicy(getClient(), id, opts.group);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a trust policy from JSON")
    .argument("<json>", "Trust policy JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => {
      try {
        const data = await createTrustPolicy(getClient(), JSON.parse(json), opts.group);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a trust policy")
    .argument("<id>", "Trust policy ID")
    .argument("<json>", "Trust policy JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => {
      try {
        const data = await updateTrustPolicy(getClient(), id, JSON.parse(json), opts.group);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a trust policy")
    .argument("<id>", "Trust policy ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        await deleteTrustPolicy(getClient(), id, opts.group);
        console.log(formatOutput({ message: `Trust policy '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
