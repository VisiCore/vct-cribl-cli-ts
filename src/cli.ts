import { Command } from "commander";
import { loadConfig } from "./config/index.js";
import { createClient, setConfigError } from "./api/client.js";

// Standard commands via factory + registry
import { registerCrudCommand } from "./commands/command-factory.js";
import { standardCommands } from "./commands/registry.js";

// Special commands (custom logic, not factory-generated)
import { registerConfigCommand } from "./commands/config-cmd.js";
import { registerWorkersCommand } from "./commands/workers.js";
import { registerSourcesCommand } from "./commands/sources.js";
import { registerDestinationsCommand } from "./commands/destinations.js";
import { registerMetricsCommand } from "./commands/metrics.js";
import { registerSearchCommand } from "./commands/search.js";
import { registerNotebooksCommand } from "./commands/notebooks.js";
import { registerPipelinesCommand } from "./commands/pipelines.js";
import { registerRoutesCommand } from "./commands/routes.js";
import { registerJobsCommand } from "./commands/jobs.js";
import { registerVersionCommand } from "./commands/version.js";
import { registerSystemCommand } from "./commands/system.js";
import { registerEdgeCommand } from "./commands/edge.js";
// Singleton-style resources (no standard CRUD pattern)
import { registerKmsCommand } from "./commands/kms.js";
import { registerPreviewCommand } from "./commands/preview.js";
import { registerLoggerCommand } from "./commands/logger.js";
import { registerProfilerCommand } from "./commands/profiler.js";

export function buildProgram(): Command {
  const program = new Command();

  program
    .name("cribl")
    .description("CLI for Cribl Cloud REST API")
    .version("0.1.0")
    .enablePositionalOptions()
    .option("-p, --profile <name>", "Config profile to use")
    .option("--base-url <url>", "Cribl base URL")
    .option("--client-id <id>", "OAuth client ID")
    .option("--client-secret <secret>", "OAuth client secret")
    .option("--verbose", "Enable verbose request logging")
    .option("--dry-run", "Show the HTTP request without executing it")
    .hook("preAction", (thisCommand, actionCommand) => {
      // Walk up the parent chain to see if this is a config subcommand
      let cmd: Command | null = actionCommand;
      while (cmd) {
        if (cmd.name() === "config") return;
        cmd = cmd.parent;
      }

      const opts = program.opts();
      try {
        const config = loadConfig({
          profile: opts.profile,
          baseUrl: opts.baseUrl,
          clientId: opts.clientId,
          clientSecret: opts.clientSecret,
        });

        const client = createClient(config, { dryRun: opts.dryRun });

        if (opts.verbose) {
          client.interceptors.request.use((req) => {
            process.stderr.write(`> ${req.method?.toUpperCase()} ${req.baseURL}${req.url}\n`);
            return req;
          });
          client.interceptors.response.use((res) => {
            process.stderr.write(`< ${res.status} ${res.statusText}\n`);
            return res;
          });
        }
      } catch (err) {
        // Store config error so getClient() can surface it with the original message
        if (err instanceof Error) setConfigError(err);
      }
    });

  // Register special commands (custom logic)
  registerConfigCommand(program);
  registerWorkersCommand(program);
  registerSourcesCommand(program);
  registerDestinationsCommand(program);
  registerMetricsCommand(program);
  registerSearchCommand(program);
  registerNotebooksCommand(program);
  registerPipelinesCommand(program);
  registerRoutesCommand(program);
  registerJobsCommand(program);
  registerVersionCommand(program);
  registerSystemCommand(program);
  registerEdgeCommand(program);
  registerKmsCommand(program);
  registerPreviewCommand(program);
  registerLoggerCommand(program);
  registerProfilerCommand(program);

  // Register all standard CRUD commands from the registry
  for (const config of standardCommands) {
    registerCrudCommand(program, config);
  }

  return program;
}
