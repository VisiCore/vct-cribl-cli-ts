import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listLicenses, getLicense, getLicenseUsage } from "../api/endpoints/licenses.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerLicensesCommand(program: Command): void {
  const cmd = program.command("licenses").description("Manage licenses");

  cmd.command("list").description("List licenses").option("--table", "Table output")
    .action(async (opts) => { try { const d = await listLicenses(getClient()); console.log(formatOutput(d.items, { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("get").description("Get a license").argument("<id>", "License ID").option("--table", "Table output")
    .action(async (id: string, opts) => { try { console.log(formatOutput(await getLicense(getClient(), id), { table: opts.table })); } catch (e) { handleError(e); } });

  cmd.command("usage").description("Get license usage").option("--table", "Table output")
    .action(async (opts) => { try { console.log(formatOutput(await getLicenseUsage(getClient()), { table: opts.table })); } catch (e) { handleError(e); } });
}
