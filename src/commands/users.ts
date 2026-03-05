import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "../api/endpoints/users.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerUsersCommand(program: Command): void {
  const cmd = program.command("users").description("Manage users");

  cmd
    .command("list")
    .description("List users")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listUsers(getClient());
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a user by ID")
    .argument("<id>", "User ID")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getUser(getClient(), id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a user from JSON")
    .argument("<json>", "User JSON config")
    .action(async (json: string) => {
      try {
        const data = await createUser(getClient(), JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a user")
    .argument("<id>", "User ID")
    .argument("<json>", "User JSON config")
    .action(async (id: string, json: string) => {
      try {
        const data = await updateUser(getClient(), id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a user")
    .argument("<id>", "User ID")
    .action(async (id: string) => {
      try {
        await deleteUser(getClient(), id);
        console.log(formatOutput({ message: `User '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
