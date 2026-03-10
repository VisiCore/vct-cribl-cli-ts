import { Command } from "commander";
import { getClient } from "../api/client.js";
import { listSources, getSource, createSource, updateSource, deleteSource } from "../api/endpoints/sources.js";
import { resolveGroup } from "../utils/group-resolver.js";
import { formatOutput } from "../output/formatter.js";
import { handleError } from "../utils/errors.js";
import { parsePort, parseJSON } from "../utils/validation.js";

export function registerSourcesCommand(program: Command): void {
  const cmd = program.command("sources").description("Manage sources");

  cmd
    .command("list")
    .description("List source configurations")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await listSources(client, group);
        console.log(formatOutput(data.items, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("get")
    .description("Get a source by ID")
    .argument("<id>", "Source ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--table", "Table output")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const data = await getSource(client, group, id);
        console.log(formatOutput(data, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("create")
    .description("Create a new source")
    .requiredOption("-t, --type <type>", "Source type (e.g. syslog, http, tcp)")
    .requiredOption("--id <id>", "Source ID")
    .option("-g, --group <name>", "Worker group name")
    .option("--host <host>", "Listen host (default: 0.0.0.0)")
    .option("--port <port>", "Listen port")
    .option("--udp-port <port>", "UDP listen port (for syslog sources)")
    .option("--tcp-port <port>", "TCP listen port (for syslog sources)")
    .option("--disabled", "Create source in disabled state")
    .option("--json-config <json>", "Full JSON config (overrides other options)")
    .option("--table", "Table output")
    .action(async (opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);

        let sourceConfig: Record<string, unknown>;
        if (opts.jsonConfig) {
          sourceConfig = parseJSON(opts.jsonConfig, "source");
        } else {
          sourceConfig = {
            id: opts.id,
            type: opts.type,
            host: opts.host ?? "0.0.0.0",
            disabled: opts.disabled ?? false,
          };
          if (opts.port) sourceConfig.port = parsePort(opts.port, "port");
          if (opts.udpPort) sourceConfig.udpPort = parsePort(opts.udpPort, "UDP port");
          if (opts.tcpPort) sourceConfig.tcpPort = parsePort(opts.tcpPort, "TCP port");
        }

        const result = await createSource(client, group, sourceConfig);
        console.log(formatOutput(result, { table: opts.table }));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("update")
    .description("Update a source")
    .argument("<id>", "Source ID")
    .argument("<json>", "Source JSON config")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, json: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        const existing = await getSource(client, group, id);
        // Strip server-computed fields that Cribl's PATCH API rejects if included
        const { status, notifications, ...cleanExisting } = existing as Record<string, unknown>;
        const merged = { ...cleanExisting, ...parseJSON(json, "source") };
        const data = await updateSource(client, group, id, merged);
        console.log(formatOutput(data));
      } catch (err) {
        handleError(err);
      }
    });

  cmd
    .command("delete")
    .description("Delete a source")
    .argument("<id>", "Source ID")
    .option("-g, --group <name>", "Worker group name")
    .action(async (id: string, opts) => {
      try {
        const client = getClient();
        const group = await resolveGroup(client, opts.group);
        await deleteSource(client, group, id);
        console.log(formatOutput({ message: `Source '${id}' deleted.` }));
      } catch (err) {
        handleError(err);
      }
    });
}
