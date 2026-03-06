# Command Reference

Full list of all `cribl` CLI commands. All group-scoped commands accept `-g <group>` (defaults to first worker group). Most commands support `--table` for human-readable output.

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
| `cribl sources update <id> <json> [-g group]` | Update a source |
| `cribl sources delete <id> [-g group]` | Delete a source |

## Destinations

| Command | Description |
|---|---|
| `cribl destinations list [-g group]` | List destination configurations |
| `cribl destinations get <id> [-g group]` | Get a destination by ID |
| `cribl destinations create [options] [-g group]` | Create a destination (`--type`, `--id`, `--json-config`) |
| `cribl destinations update <id> <json> [-g group]` | Update a destination |
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
| `cribl routes update <id> <json> [-g group]` | Update a route |
| `cribl routes delete <id> [-g group]` | Delete a route |

## Packs

| Command | Description |
|---|---|
| `cribl packs list [-g group]` | List packs |
| `cribl packs get <id> [-g group]` | Get a pack by ID |
| `cribl packs create <json> [-g group]` | Create a pack |
| `cribl packs delete <id> [-g group]` | Delete a pack |
| `cribl packs export <id> [-g group]` | Export a pack |

## Lookups

| Command | Description |
|---|---|
| `cribl lookups list [-g group]` | List lookup tables |
| `cribl lookups get <id> [-g group]` | Get a lookup by ID |
| `cribl lookups create <json> [-g group]` | Create a lookup |
| `cribl lookups delete <id> [-g group]` | Delete a lookup |

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

## Datasets

| Command | Description |
|---|---|
| `cribl datasets list [-g group]` | List search datasets |

## Notebooks

| Command | Description |
|---|---|
| `cribl notebooks list [-g group]` | List search notebooks |
| `cribl notebooks get <id> [-g group]` | Get a notebook by ID |
| `cribl notebooks add --notebook-id <id> --query <q>` | Add query to a notebook |
| `cribl notebooks delete <id> [-g group]` | Delete a notebook |

## Dashboards

| Command | Description |
|---|---|
| `cribl dashboards list [-g group]` | List dashboards |
| `cribl dashboards get <id> [-g group]` | Get a dashboard by ID |
| `cribl dashboards create <json> [-g group]` | Create a dashboard |
| `cribl dashboards delete <id> [-g group]` | Delete a dashboard |

## Alerts

| Command | Description |
|---|---|
| `cribl alerts list` | List alert notifications |

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

## Users & Roles

| Command | Description |
|---|---|
| `cribl users list` | List users |
| `cribl users get <id>` | Get a user by ID |
| `cribl users create <json>` | Create a user |
| `cribl users update <id> <json>` | Update a user |
| `cribl users delete <id>` | Delete a user |
| `cribl roles list` | List RBAC roles |
| `cribl roles get <id>` | Get a role by ID |
| `cribl roles create <json>` | Create a role |
| `cribl roles update <id> <json>` | Update a role |
| `cribl roles delete <id>` | Delete a role |

## Secrets

| Command | Description |
|---|---|
| `cribl secrets list [-g group]` | List secrets |
| `cribl secrets get <id> [-g group]` | Get a secret by ID |
| `cribl secrets create <json> [-g group]` | Create a secret |
| `cribl secrets update <id> <json> [-g group]` | Update a secret |
| `cribl secrets delete <id> [-g group]` | Delete a secret |

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

## Metrics

| Command | Description |
|---|---|
| `cribl metrics get [--filter expr] [--names n1,n2]` | Get system metrics |

## Event Breakers

| Command | Description |
|---|---|
| `cribl event-breakers list [-g group]` | List event breaker rulesets |
| `cribl event-breakers get <id> [-g group]` | Get an event breaker ruleset |

## Parsers

| Command | Description |
|---|---|
| `cribl parsers list [-g group]` | List parsers |
| `cribl parsers get <id> [-g group]` | Get a parser |

## Global Variables

| Command | Description |
|---|---|
| `cribl global-vars list [-g group]` | List global variables |
| `cribl global-vars get <id> [-g group]` | Get a global variable |
| `cribl global-vars create <json> [-g group]` | Create a global variable |
| `cribl global-vars update <id> <json> [-g group]` | Update a global variable |
| `cribl global-vars delete <id> [-g group]` | Delete a global variable |

## Schemas

| Command | Description |
|---|---|
| `cribl schemas list [-g group]` | List schemas |
| `cribl schemas get <id> [-g group]` | Get a schema |

## Regex Library

| Command | Description |
|---|---|
| `cribl regex list [-g group]` | List regex patterns |
| `cribl regex get <id> [-g group]` | Get a regex pattern |

## Grok Patterns

| Command | Description |
|---|---|
| `cribl grok list [-g group]` | List grok patterns |
| `cribl grok get <id> [-g group]` | Get a grok pattern |

## Database Connections

| Command | Description |
|---|---|
| `cribl db-connections list [-g group]` | List database connections |
| `cribl db-connections get <id> [-g group]` | Get a database connection |
| `cribl db-connections create <json> [-g group]` | Create a database connection |
| `cribl db-connections update <id> <json> [-g group]` | Update a database connection |
| `cribl db-connections delete <id> [-g group]` | Delete a database connection |

## Functions

| Command | Description |
|---|---|
| `cribl functions list [-g group]` | List pipeline functions |
| `cribl functions get <id> [-g group]` | Get a function |

## Certificates

| Command | Description |
|---|---|
| `cribl certificates list [-g group]` | List certificates |
| `cribl certificates get <id> [-g group]` | Get a certificate |
| `cribl certificates create <json> [-g group]` | Create a certificate |
| `cribl certificates delete <id> [-g group]` | Delete a certificate |

## Credentials

| Command | Description |
|---|---|
| `cribl credentials list [-g group]` | List credentials |
| `cribl credentials get <id> [-g group]` | Get a credential |
| `cribl credentials create <json> [-g group]` | Create a credential |
| `cribl credentials update <id> <json> [-g group]` | Update a credential |
| `cribl credentials delete <id> [-g group]` | Delete a credential |

## Samples

| Command | Description |
|---|---|
| `cribl samples list [-g group]` | List sample data files |
| `cribl samples get <id> [-g group]` | Get a sample file |

## Scripts

| Command | Description |
|---|---|
| `cribl scripts list [-g group]` | List scripts |
| `cribl scripts get <id> [-g group]` | Get a script |
| `cribl scripts create <json> [-g group]` | Create a script |
| `cribl scripts delete <id> [-g group]` | Delete a script |

## Licenses

| Command | Description |
|---|---|
| `cribl licenses list` | List licenses |
| `cribl licenses get <id>` | Get a license |

## Teams

| Command | Description |
|---|---|
| `cribl teams list` | List teams |
| `cribl teams get <id>` | Get a team |
| `cribl teams create <json>` | Create a team |
| `cribl teams update <id> <json>` | Update a team |
| `cribl teams delete <id>` | Delete a team |

## Policies

| Command | Description |
|---|---|
| `cribl policies list` | List RBAC policies |
| `cribl policies get <id>` | Get a policy |
| `cribl policies create <json>` | Create a policy |
| `cribl policies update <id> <json>` | Update a policy |
| `cribl policies delete <id>` | Delete a policy |

## Notification Targets

| Command | Description |
|---|---|
| `cribl notification-targets list` | List notification targets |
| `cribl notification-targets get <id>` | Get a notification target |
| `cribl notification-targets create <json>` | Create a notification target |
| `cribl notification-targets update <id> <json>` | Update a notification target |
| `cribl notification-targets delete <id>` | Delete a notification target |
