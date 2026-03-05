import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listEventBreakers, getEventBreaker, createEventBreaker, updateEventBreaker, deleteEventBreaker } from "../api/endpoints/event-breakers.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerEventBreakersCommand(program: Command): void {
  const cmd = program.command("event-breakers").description("Manage event breaker rulesets");

  cmd.command("list").description("List event breaker rulesets")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); const d = await listEventBreakers(c, g); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get an event breaker ruleset").argument("<id>", "Ruleset ID")
    .option("-g, --group <name>", "Worker group name").option("--table", "Table output")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); const d = await getEventBreaker(c, g, id); console.log(formatOutput(d, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("create").description("Create an event breaker ruleset").argument("<json>", "JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await createEventBreaker(c, g, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("update").description("Update an event breaker ruleset").argument("<id>", "Ruleset ID").argument("<json>", "JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); console.log(formatOutput(await updateEventBreaker(c, g, id, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("delete").description("Delete an event breaker ruleset").argument("<id>", "Ruleset ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => { try { const c = getClient(); const g = await resolveGroup(c, opts.group); await deleteEventBreaker(c, g, id); console.log(formatOutput({ message: `Event breaker '${id}' deleted.` })); } catch (e) { handleError(e); } });
}
