import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listRoles, getRole, createRole, updateRole, deleteRole } from "../api/endpoints/roles.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerRolesCommand(program: Command): void {
  const cmd = program.command("roles").description("Manage RBAC roles");

  cmd
    .command("list")
    .description("List roles")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listRoles(getClient());
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a role by ID")
    .argument("<id>", "Role ID")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getRole(getClient(), id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a role from JSON")
    .argument("<json>", "Role JSON config")
    .action(async (json: string) => {
      try {
        const data = await createRole(getClient(), JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a role")
    .argument("<id>", "Role ID")
    .argument("<json>", "Role JSON config")
    .action(async (id: string, json: string) => {
      try {
        const data = await updateRole(getClient(), id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a role")
    .argument("<id>", "Role ID")
    .action(async (id: string) => {
      try {
        await deleteRole(getClient(), id);
        console.log(formatOutput({ message: `Role '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
