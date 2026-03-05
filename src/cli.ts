import { Command } from "commander";
import { loadConfig } from "./config/index.js";
import { createClient } from "./api/client.js";
import { registerConfigCommand } from "./commands/config-cmd.js";
import { registerWorkersCommand } from "./commands/workers.js";
import { registerSourcesCommand } from "./commands/sources.js";
import { registerDestinationsCommand } from "./commands/destinations.js";
import { registerMetricsCommand } from "./commands/metrics.js";
import { registerSearchCommand } from "./commands/search.js";
import { registerDatasetsCommand } from "./commands/datasets.js";
import { registerNotebooksCommand } from "./commands/notebooks.js";
import { registerAlertsCommand } from "./commands/alerts.js";
import { registerPipelinesCommand } from "./commands/pipelines.js";
import { registerRoutesCommand } from "./commands/routes.js";
import { registerPacksCommand } from "./commands/packs.js";
import { registerLookupsCommand } from "./commands/lookups.js";
import { registerJobsCommand } from "./commands/jobs.js";
import { registerUsersCommand } from "./commands/users.js";
import { registerRolesCommand } from "./commands/roles.js";
import { registerSecretsCommand } from "./commands/secrets.js";
import { registerVersionCommand } from "./commands/version.js";
import { registerSystemCommand } from "./commands/system.js";
import { registerDashboardsCommand } from "./commands/dashboards.js";
import { registerEdgeCommand } from "./commands/edge.js";
import { registerEventBreakersCommand } from "./commands/event-breakers.js";
import { registerParsersCommand } from "./commands/parsers.js";
import { registerGlobalVariablesCommand } from "./commands/global-variables.js";
import { registerSchemasCommand } from "./commands/schemas.js";
import { registerRegexCommand } from "./commands/regex.js";
import { registerGrokCommand } from "./commands/grok.js";
import { registerDatabaseConnectionsCommand } from "./commands/database-connections.js";
import { registerFunctionsCommand } from "./commands/functions.js";
import { registerCertificatesCommand } from "./commands/certificates.js";
import { registerCredentialsCommand } from "./commands/credentials.js";
import { registerSamplesCommand } from "./commands/samples.js";
import { registerScriptsCommand } from "./commands/scripts.js";
import { registerLicensesCommand } from "./commands/licenses.js";
import { registerTeamsCommand } from "./commands/teams.js";
import { registerPoliciesCommand } from "./commands/policies.js";
import { registerNotificationTargetsCommand } from "./commands/notification-targets.js";
import { registerDatasetProvidersCommand } from "./commands/dataset-providers.js";
import { registerMacrosCommand } from "./commands/macros.js";
import { registerDashboardCategoriesCommand } from "./commands/dashboard-categories.js";
import { registerTrustPoliciesCommand } from "./commands/trust-policies.js";
import { registerUsageGroupsCommand } from "./commands/usage-groups.js";
import { registerDatatypesCommand } from "./commands/datatypes.js";
import { registerLakeDatasetsCommand } from "./commands/lake-datasets.js";
import { registerStorageLocationsCommand } from "./commands/storage-locations.js";
// Batch 1.1 - Group-scoped
import { registerCollectorsCommand } from "./commands/collectors.js";
import { registerConditionsCommand } from "./commands/conditions.js";
import { registerExecutorsCommand } from "./commands/executors.js";
import { registerParquetSchemasCommand } from "./commands/parquet-schemas.js";
import { registerProtobufLibsCommand } from "./commands/protobuf-libs.js";
import { registerHmacFunctionsCommand } from "./commands/hmac-functions.js";
import { registerSdsRulesCommand } from "./commands/sds-rules.js";
import { registerSdsRulesetsCommand } from "./commands/sds-rulesets.js";
import { registerAppscopeCommand } from "./commands/appscope.js";
import { registerPreviewCommand } from "./commands/preview.js";
import { registerLoggerCommand } from "./commands/logger.js";
import { registerProfilerCommand } from "./commands/profiler.js";
// Batch 1.2 - Global
import { registerBannersCommand } from "./commands/banners.js";
import { registerEncryptionKeysCommand } from "./commands/encryption-keys.js";
import { registerMessagesCommand } from "./commands/messages.js";
import { registerSubscriptionsCommand } from "./commands/subscriptions.js";
import { registerKmsCommand } from "./commands/kms.js";
import { registerFeatureFlagsCommand } from "./commands/feature-flags.js";
import { registerAuthSettingsCommand } from "./commands/auth-settings.js";
import { registerGitSettingsCommand } from "./commands/git-settings.js";
import { registerAiSettingsCommand } from "./commands/ai-settings.js";
import { registerWorkspacesCommand } from "./commands/workspaces.js";
import { registerOutpostsCommand } from "./commands/outposts.js";

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

        const client = createClient(config);

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
      } catch {
        // Config will throw if not set — that's fine, error will surface at call time
      }
    });

  // Register all command groups
  registerConfigCommand(program);
  registerWorkersCommand(program);
  registerSourcesCommand(program);
  registerDestinationsCommand(program);
  registerMetricsCommand(program);
  registerSearchCommand(program);
  registerDatasetsCommand(program);
  registerNotebooksCommand(program);
  registerAlertsCommand(program);
  registerPipelinesCommand(program);
  registerRoutesCommand(program);
  registerPacksCommand(program);
  registerLookupsCommand(program);
  registerJobsCommand(program);
  registerUsersCommand(program);
  registerRolesCommand(program);
  registerSecretsCommand(program);
  registerVersionCommand(program);
  registerSystemCommand(program);
  registerDashboardsCommand(program);
  registerEdgeCommand(program);
  registerEventBreakersCommand(program);
  registerParsersCommand(program);
  registerGlobalVariablesCommand(program);
  registerSchemasCommand(program);
  registerRegexCommand(program);
  registerGrokCommand(program);
  registerDatabaseConnectionsCommand(program);
  registerFunctionsCommand(program);
  registerCertificatesCommand(program);
  registerCredentialsCommand(program);
  registerSamplesCommand(program);
  registerScriptsCommand(program);
  registerLicensesCommand(program);
  registerTeamsCommand(program);
  registerPoliciesCommand(program);
  registerNotificationTargetsCommand(program);
  registerDatasetProvidersCommand(program);
  registerMacrosCommand(program);
  registerDashboardCategoriesCommand(program);
  registerTrustPoliciesCommand(program);
  registerUsageGroupsCommand(program);
  registerDatatypesCommand(program);
  registerLakeDatasetsCommand(program);
  registerStorageLocationsCommand(program);
  // Batch 1.1 - Group-scoped
  registerCollectorsCommand(program);
  registerConditionsCommand(program);
  registerExecutorsCommand(program);
  registerParquetSchemasCommand(program);
  registerProtobufLibsCommand(program);
  registerHmacFunctionsCommand(program);
  registerSdsRulesCommand(program);
  registerSdsRulesetsCommand(program);
  registerAppscopeCommand(program);
  registerPreviewCommand(program);
  registerLoggerCommand(program);
  registerProfilerCommand(program);
  // Batch 1.2 - Global
  registerBannersCommand(program);
  registerEncryptionKeysCommand(program);
  registerMessagesCommand(program);
  registerSubscriptionsCommand(program);
  registerKmsCommand(program);
  registerFeatureFlagsCommand(program);
  registerAuthSettingsCommand(program);
  registerGitSettingsCommand(program);
  registerAiSettingsCommand(program);
  registerWorkspacesCommand(program);
  registerOutpostsCommand(program);

  return program;
}
