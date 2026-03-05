import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listWorkspaces, getWorkspace, createWorkspace, updateWorkspace, deleteWorkspace } from "../api/endpoints/workspaces.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerWorkspacesCommand(program: Command): void {
  const cmd = program.command("workspaces").description("Manage workspaces");

  cmd
    .command("list")
    .description("List workspaces")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listWorkspaces(getClient());
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a workspace by ID")
    .argument("<id>", "Workspace ID")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getWorkspace(getClient(), id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a workspace from JSON")
    .argument("<json>", "Workspace JSON config")
    .action(async (json: string) => {
      try {
        const data = await createWorkspace(getClient(), JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a workspace")
    .argument("<id>", "Workspace ID")
    .argument("<json>", "Workspace JSON config")
    .action(async (id: string, json: string) => {
      try {
        const data = await updateWorkspace(getClient(), id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a workspace")
    .argument("<id>", "Workspace ID")
    .action(async (id: string) => {
      try {
        await deleteWorkspace(getClient(), id);
        console.log(formatOutput({ message: `Workspace '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
