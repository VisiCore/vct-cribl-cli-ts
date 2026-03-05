import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listEncryptionKeys, getEncryptionKey, createEncryptionKey, updateEncryptionKey, deleteEncryptionKey } from "../api/endpoints/encryption-keys.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerEncryptionKeysCommand(program: Command): void {
  const cmd = program.command("encryption-keys").description("Manage encryption keys");

  cmd
    .command("list")
    .description("List encryption keys")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listEncryptionKeys(getClient());
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get an encryption key by ID")
    .argument("<id>", "Encryption key ID")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getEncryptionKey(getClient(), id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create an encryption key from JSON")
    .argument("<json>", "Encryption key JSON config")
    .action(async (json: string) => {
      try {
        const data = await createEncryptionKey(getClient(), JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update an encryption key")
    .argument("<id>", "Encryption key ID")
    .argument("<json>", "Encryption key JSON config")
    .action(async (id: string, json: string) => {
      try {
        const data = await updateEncryptionKey(getClient(), id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete an encryption key")
    .argument("<id>", "Encryption key ID")
    .action(async (id: string) => {
      try {
        await deleteEncryptionKey(getClient(), id);
        console.log(formatOutput({ message: `Encryption key '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
