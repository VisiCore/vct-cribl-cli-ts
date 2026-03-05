import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listTeams, getTeam, createTeam, updateTeam, deleteTeam } from "../api/endpoints/teams.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerTeamsCommand(program: Command): void {
  const cmd = program.command("teams").description("Manage teams");

  cmd.command("list").description("List teams").option("--table", "Table output")
    .action(async (opts) => { try { const d = await listTeams(getClient()); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get a team").argument("<id>", "Team ID").option("--table", "Table output")
    .action(async (id: string, opts) => { try { console.log(formatOutput(await getTeam(getClient(), id), { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("create").description("Create a team").argument("<json>", "JSON config")
    .action(async (json: string) => { try { console.log(formatOutput(await createTeam(getClient(), JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("update").description("Update a team").argument("<id>", "Team ID").argument("<json>", "JSON config")
    .action(async (id: string, json: string) => { try { console.log(formatOutput(await updateTeam(getClient(), id, JSON.parse(json)))); } catch (e) { handleError(e); } });

  cmd.command("delete").description("Delete a team").argument("<id>", "Team ID")
    .action(async (id: string) => { try { await deleteTeam(getClient(), id); console.log(formatOutput({ message: `Team '${id}' deleted.` })); } catch (e) { handleError(e); } });
}
