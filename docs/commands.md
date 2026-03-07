# Command Reference

Full list of all `cribl` CLI commands. All group-scoped commands accept `-g <group>` (defaults to first worker group). Most commands support `--table` for human-readable output. All commands support `--dry-run` to preview the HTTP request without executing it.

The `update` subcommand on all resources uses **merge-on-update**: it fetches the existing config, merges your changes on top, then PATCHes — so you only need to send the fields you want to change.

## Configuration

| Command | Description |
|---|---|
| `cribl config set [options]` | Configure credentials for a profile |
| `cribl config show [-n name]` | Show current configuration (secrets masked) |
| `cribl config use <name>` | Switch active profile |

## Worker Groups

| Command | Description |
|---|---|
| `cribl workers list` | List all worker groups |
| `cribl workers get <id>` | Get a worker group by ID |
| `cribl workers deploy [-g group]` | Deploy committed config to workers |

## Sources

| Command | Description |
|---|---|
| `cribl sources list [-g group]` | List source configurations |
| `cribl sources get <id> [-g group]` | Get a source by ID |
| `cribl sources create [options] [-g group]` | Create a source (`--type`, `--id`, `--json-config`) |
| `cribl sources update <id> <json> [-g group]` | Update a source (merge-on-update) |
| `cribl sources delete <id> [-g group]` | Delete a source |

## Destinations

| Command | Description |
|---|---|
| `cribl destinations list [-g group]` | List destination configurations |
| `cribl destinations get <id> [-g group]` | Get a destination by ID |
| `cribl destinations create [options] [-g group]` | Create a destination (`--type`, `--id`, `--json-config`) |
| `cribl destinations update <id> <json> [-g group]` | Update a destination (merge-on-update) |
| `cribl destinations delete <id> [-g group]` | Delete a destination |

## Pipelines

| Command | Description |
|---|---|
| `cribl pipelines list [-g group]` | List pipelines |
| `cribl pipelines get <id> [-g group]` | Get a pipeline by ID |
| `cribl pipelines create <json> [-g group]` | Create a pipeline from JSON |
| `cribl pipelines update <id> <json> [-g group]` | Update a pipeline |
| `cribl pipelines clone <id> --from <group> --to <group>` | Clone a pipeline between groups |
| `cribl pipelines delete <id> [-g group]` | Delete a pipeline |

## Routes

| Command | Description |
|---|---|
| `cribl routes list [-g group]` | List routes |
| `cribl routes get <id> [-g group]` | Get a route by ID |
| `cribl routes create <json> [-g group]` | Create a route (appends before catch-all) |
| `cribl routes update <id> <json> [-g group]` | Update a route (merge-on-update, updates in place) |
| `cribl routes delete <id> [-g group]` | Delete a route |

## Search

| Command | Description |
|---|---|
| `cribl search run <query> [--wait]` | Run a search query |
| `cribl search jobs [-g group]` | List search jobs |
| `cribl search results <job-id>` | Get search job results |
| `cribl search saved [-g group]` | List saved searches |
| `cribl search timeline <job-id>` | Get search job timeline |
| `cribl search field-summary <job-id>` | Get search job field summary |
| `cribl search job-logs <job-id>` | Get search job logs |
| `cribl search job-metrics <job-id>` | Get search job metrics |
| `cribl search job-diag <job-id>` | Get search job diagnostics |

## Jobs

| Command | Description |
|---|---|
| `cribl jobs list [-g group]` | List running jobs |
| `cribl jobs get <id> [-g group]` | Get a job by ID |
| `cribl jobs run <json> [-g group]` | Start a job from JSON config |
| `cribl jobs cancel <id> [-g group]` | Cancel a running job |
| `cribl jobs pause <id> [-g group]` | Pause a running job |
| `cribl jobs resume <id> [-g group]` | Resume a paused job |
| `cribl jobs configs [-g group]` | List saved job configurations |

## Notebooks

| Command | Description |
|---|---|
| `cribl notebooks list [-g group]` | List search notebooks |
| `cribl notebooks get <id> [-g group]` | Get a notebook by ID |
| `cribl notebooks add --notebook-id <id> --query <q>` | Add query to a notebook |
| `cribl notebooks delete <id> [-g group]` | Delete a notebook |

## Version Control

| Command | Description |
|---|---|
| `cribl version info [-g group]` | Get version info |
| `cribl version status [-g group]` | Get version status |
| `cribl version diff [-g group]` | Get version diff |
| `cribl version commit <message> [-g group]` | Commit changes |
| `cribl version push [-g group]` | Push committed changes |
| `cribl version sync [-g group]` | Sync with remote |
| `cribl version branches [-g group]` | List branches |
| `cribl version deploy <message> [-g group]` | Commit and deploy to workers in one step |
| `cribl version current-branch [-g group]` | Get current branch |

## System

| Command | Description |
|---|---|
| `cribl system info` | Get system information |
| `cribl system settings` | Get system settings |
| `cribl system health` | Get system health |
| `cribl system instance` | Get instance information |
| `cribl system worker-health` | Get worker health |
| `cribl system logs` | List system logs |
| `cribl system log <id>` | Get a specific system log |
| `cribl system diag` | Get diagnostics |
| `cribl system diag-send` | Send diagnostics to Cribl |
| `cribl system restart` | Restart the system |
| `cribl system reload` | Reload configuration |
| `cribl system upgrade` | Check for upgrades |

## Metrics

| Command | Description |
|---|---|
| `cribl metrics get [--filter expr] [--names n1,n2]` | Get system metrics |

## Edge

See [docs/edge.md](edge.md) for the full Edge guide.

| Command | Description |
|---|---|
| `cribl edge nodes [-f fleet]` | List managed edge nodes |
| `cribl edge system-info <host>` | System summary (CPU, memory, disk) |
| `cribl edge system-info-raw <host>` | Full raw system info JSON |
| `cribl edge inputs <host>` | List sources on a node |
| `cribl edge outputs <host>` | List destinations on a node |
| `cribl edge metrics <host> [-d duration]` | Historical metrics time series |
| `cribl edge containers [-f fleet]` | List containers |
| `cribl edge processes [-f fleet]` | List processes |
| `cribl edge events [-f fleet]` | List events |
| `cribl edge files <host>` | Inspect files on a node |
| `cribl edge ls <host> [path]` | List directory on a node |
| `cribl edge file-search <host> <query>` | Search files on a node |
| `cribl edge kube-logs [-f fleet]` | Get Kubernetes logs |

## Singleton Settings (Hand-Written)

These resources are single-config endpoints (get/update), not standard CRUD:

| Command | Description |
|---|---|
| `cribl auth-settings get` | Get authentication settings |
| `cribl auth-settings update <json>` | Update authentication settings |
| `cribl git-settings get` | Get git settings |
| `cribl git-settings update <json>` | Update git settings |
| `cribl kms get` | Get KMS configuration |
| `cribl kms update <json>` | Update KMS configuration |
| `cribl kms health` | Get KMS health status |
| `cribl logger get [-g group]` | Get logger configuration |
| `cribl logger set <json> [-g group]` | Set logger configuration |
| `cribl profiler get [-g group]` | Get profiler status |
| `cribl profiler start [-g group]` | Start profiler |
| `cribl profiler stop [-g group]` | Stop profiler |
| `cribl preview run <json> [-g group]` | Run a data preview |

## Standard CRUD Commands (Factory-Generated)

The following commands are generated from a declarative registry. Each has `list`, `get`, `create`, `update`, `delete` subcommands unless noted otherwise. All `update` commands use merge-on-update.

### Group-Scoped (accept `-g <group>`)

| Command | Operations | API Path |
|---|---|---|
| `cribl parsers` | full CRUD | `lib/parsers` |
| `cribl schemas` | full CRUD | `lib/schemas` |
| `cribl regex` | full CRUD | `lib/regex` |
| `cribl grok` | full CRUD | `lib/grok` |
| `cribl event-breakers` | full CRUD | `lib/breakers` |
| `cribl global-vars` | full CRUD | `lib/vars` |
| `cribl db-connections` | full CRUD | `lib/database-connections` |
| `cribl secrets` | full CRUD | `system/secrets` |
| `cribl credentials` | full CRUD | `system/credentials` |
| `cribl collectors` | full CRUD | `collectors` |
| `cribl conditions` | full CRUD | `conditions` |
| `cribl parquet-schemas` | full CRUD | `lib/parquet-schemas` |
| `cribl protobuf-libs` | full CRUD | `lib/protobuf-libraries` |
| `cribl sds-rules` | full CRUD | `lib/sds-rules` |
| `cribl sds-rulesets` | full CRUD | `lib/sds-rulesets` |
| `cribl appscope` | full CRUD | `lib/appscope-configs` |
| `cribl certificates` | list, get, create, delete | `system/certificates` |
| `cribl samples` | list, get, create, delete | `system/samples` |
| `cribl scripts` | list, get, create, delete | `system/scripts` |
| `cribl lookups` | list, get, create, delete | `system/lookups` |
| `cribl packs` | list, get, create, delete | `packs` |
| `cribl executors` | list, get | `executors` |
| `cribl hmac-functions` | list, get | `lib/hmac-functions` |
| `cribl functions` | list, get | `functions` |

### Global (no group required)

| Command | Operations | API Path |
|---|---|---|
| `cribl users` | full CRUD | `system/users` |
| `cribl roles` | full CRUD | `system/roles` |
| `cribl teams` | full CRUD | `system/teams` |
| `cribl policies` | full CRUD | `system/policies` |
| `cribl banners` | full CRUD | `system/banners` |
| `cribl encryption-keys` | full CRUD | `system/keys` |
| `cribl notification-targets` | full CRUD | `notification-targets` |
| `cribl workspaces` | full CRUD | `workspaces` |
| `cribl messages` | list, get, create, delete | `system/messages` |
| `cribl licenses` | list, get | `system/licenses` |
| `cribl subscriptions` | list, get | `system/subscriptions` |
| `cribl outposts` | list, get | `master/outposts` |
| `cribl alerts` | list | `notifications` |
| `cribl feature-flags` | list, get, update | `settings/features` |
| `cribl ai-settings` | list, get, update | `ai/settings/features` |

### Search-Scoped (accept `-g <group>`, defaults to `default_search`)

| Command | Operations | API Path |
|---|---|---|
| `cribl macros` | full CRUD | `search/macros` |
| `cribl dataset-providers` | full CRUD | `search/dataset-providers` |
| `cribl dashboard-categories` | full CRUD | `search/dashboard-categories` |
| `cribl trust-policies` | full CRUD | `search/trust-policies` |
| `cribl datatypes` | full CRUD | `search/datatypes` |
| `cribl datasets` | list | `search/datasets` |
| `cribl dashboards` | list, get, create, delete | `search/dashboards` |
| `cribl usage-groups` | list, get | `search/usage-groups` |

### Lake-Scoped (require `--lake <id>`)

| Command | Operations | API Path |
|---|---|---|
| `cribl lake-datasets` | full CRUD | `products/lake/lakes/{id}/datasets` |
| `cribl storage-locations` | full CRUD | `products/lake/lakes/{id}/storage-locations` |
