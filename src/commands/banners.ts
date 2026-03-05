import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listBanners, getBanner, createBanner, updateBanner, deleteBanner } from "../api/endpoints/banners.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";

export function registerBannersCommand(program: Command): void {
  const cmd = program.command("banners").description("Manage system banners");

  cmd
    .command("list")
    .description("List banners")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const data = await listBanners(getClient());
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a banner by ID")
    .argument("<id>", "Banner ID")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const data = await getBanner(getClient(), id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a banner from JSON")
    .argument("<json>", "Banner JSON config")
    .action(async (json: string) => {
      try {
        const data = await createBanner(getClient(), JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a banner")
    .argument("<id>", "Banner ID")
    .argument("<json>", "Banner JSON config")
    .action(async (id: string, json: string) => {
      try {
        const data = await updateBanner(getClient(), id, JSON.parse(json));
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a banner")
    .argument("<id>", "Banner ID")
    .action(async (id: string) => {
      try {
        await deleteBanner(getClient(), id);
        console.log(formatOutput({ message: `Banner '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
