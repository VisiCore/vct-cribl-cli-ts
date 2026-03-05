import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listMessages, getMessage, createMessage, deleteMessage } from "../api/endpoints/messages.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerMessagesCommand(program: Command): void {
  const cmd = program.command("messages").description("Manage system messages");

  cmd
    .command("list")
    .description("List messages")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listMessages(getClient());
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a message by ID")
    .argument("<id>", "Message ID")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getMessage(getClient(), id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a message from JSON")
    .argument("<json>", "Message JSON config")
    .action(async (json: string) => {
      try {
        const data = await createMessage(getClient(), JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a message")
    .argument("<id>", "Message ID")
    .action(async (id: string) => {
      try {
        await deleteMessage(getClient(), id);
        console.log(formatOutput({ message: `Message '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
