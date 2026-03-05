import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listPolicies, getPolicy, createPolicy, updatePolicy, deletePolicy } from "../api/endpoints/policies.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerPoliciesCommand(program: Command): void {
  const cmd = program.command("policies").description("Manage RBAC policies");

  cmd.command("list").description("List policies").option("--table", "Table output")
    .action(async (opts) => { try { const d = await listPolicies(getClient()); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get a policy").argument("<id>", "Policy ID").option("--table", "Table output")
    .action(async (id: string, opts) => { try { console.log(formatOutput(await getPolicy(getClient(), id), { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("create").description("Create a policy").argument("<json>", "JSON config")
    .action(async (json: string) => { try { console.log(formatOutput(await createPolicy(getClient(), JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("update").description("Update a policy").argument("<id>", "Policy ID").argument("<json>", "JSON config")
    .action(async (id: string, json: string) => { try { console.log(formatOutput(await updatePolicy(getClient(), id, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("delete").description("Delete a policy").argument("<id>", "Policy ID")
    .action(async (id: string) => { try { await deletePolicy(getClient(), id); console.log(formatOutput({ message: `Policy '${id}' deleted.` })); } catch (e) { handleError(e); } });
}
