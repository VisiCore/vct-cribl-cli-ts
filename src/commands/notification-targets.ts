import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listNotificationTargets, getNotificationTarget, createNotificationTarget, updateNotificationTarget, deleteNotificationTarget } from "../api/endpoints/notification-targets.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerNotificationTargetsCommand(program: Command): void {
  const cmd = program.command("notification-targets").description("Manage notification targets");

  cmd.command("list").description("List notification targets").option("--table", "Table output")
    .action(async (opts) => { try { const d = await listNotificationTargets(getClient()); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get a notification target").argument("<id>", "Target ID").option("--table", "Table output")
    .action(async (id: string, opts) => { try { console.log(formatOutput(await getNotificationTarget(getClient(), id), { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("create").description("Create a notification target").argument("<json>", "JSON config")
    .action(async (json: string) => { try { console.log(formatOutput(await createNotificationTarget(getClient(), JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("update").description("Update a notification target").argument("<id>", "Target ID").argument("<json>", "JSON config")
    .action(async (id: string, json: string) => { try { console.log(formatOutput(await updateNotificationTarget(getClient(), id, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("delete").description("Delete a notification target").argument("<id>", "Target ID")
    .action(async (id: string) => { try { await deleteNotificationTarget(getClient(), id); console.log(formatOutput({ message: `Target '${id}' deleted.` })); } catch (e) { handleError(e); } });
}
