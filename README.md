# cribl-cli

A command-line interface for the Cribl Cloud REST API. Manage worker groups, pipelines, routes, search, and more directly from your terminal.

## Why a CLI Instead of MCP?

Cribl ships an [MCP server](https://docs.cribl.io/copilot/cribl-mcp-server/) for AI assistants. MCP is great for discovery — an agent can browse available tools and figure out what to call. But once you know *what* you need, a CLI is simpler, faster, and more useful.

**A CLI is just a shell command.** Any AI agent with terminal access (Claude Code, Cursor, Windsurf, etc.) can call it directly — no protocol layer, no JSON-RPC, no server to run. The agent runs `cribl sources list -g prod`, gets JSON back, and moves on. That's it. No handshake, no tool registration, no schema negotiation.

**CLIs work for humans too.** MCP only works inside an AI host. A CLI works everywhere — shell scripts, cron jobs, CI/CD pipelines, `jq` pipelines, and your terminal. One tool, every context.

**Debugging is trivial.** When something breaks, you re-run the command and see exactly what happened. With MCP, you're digging through protocol logs to figure out what the agent sent and what the server returned.

For a deeper take on this, see [Why CLIs Beat MCP for AI Agents](https://medium.com/@rentierdigital/why-clis-beat-mcp-for-ai-agents-and-how-to-build-your-own-cli-army-6c27b0aec969).

```bash
# AI agent or human — same command, same output
cribl sources list -g prod | jq '.[].id'

# Automate in CI/CD
cribl version deploy -g prod "Deploy from GitHub Actions"

# Monitor in cron
cribl system health | jq -e '.status == "healthy"' || alert "Cribl down"
```

## Quick Start

```bash
npm install
npm run build

# Configure credentials (Cribl Cloud)
node dist/bin/cribl.js config set \
  --base-url https://your-org.cribl.cloud \
  --client-id YOUR_CLIENT_ID \
  --client-secret YOUR_CLIENT_SECRET

# List worker groups
node dist/bin/cribl.js workers list

# Formatted table output
node dist/bin/cribl.js workers list --table

# Pipe JSON to jq
node dist/bin/cribl.js pipelines list -g default | jq '.[].id'
```

## Authentication

### Cribl Cloud (OAuth2)

```bash
cribl config set \
  --base-url https://your-org.cribl.cloud \
  --client-id YOUR_CLIENT_ID \
  --client-secret YOUR_CLIENT_SECRET
```

Or via environment variables:

```bash
export CRIBL_BASE_URL=https://your-org.cribl.cloud
export CRIBL_CLIENT_ID=your-client-id
export CRIBL_CLIENT_SECRET=your-client-secret
```

### On-Prem / Local

```bash
cribl config set \
  --base-url https://your-cribl:9000 \
  --username admin \
  --password YOUR_PASSWORD \
  --auth-type local
```

### Profiles

Credentials are stored in `~/.criblrc`. You can manage multiple environments:

```bash
cribl config set -n prod --base-url https://prod.cribl.cloud --client-id ... --client-secret ...
cribl config set -n dev --base-url https://dev.cribl.cloud --client-id ... --client-secret ...
cribl config use prod
cribl config show
```

Config priority: CLI flags > environment variables > `~/.criblrc` profile.

## Commands

### Configuration

| Command | Description |
|---|---|
| `cribl config set [options]` | Configure credentials for a profile |
| `cribl config show [-n name]` | Show current configuration (secrets masked) |
| `cribl config use <name>` | Switch active profile |

### Worker Groups

| Command | Description |
|---|---|
| `cribl workers list` | List all worker groups |
| `cribl workers get <id>` | Get a worker group by ID |
| `cribl workers deploy [-g group]` | Deploy committed config to workers |

### Sources

| Command | Description |
|---|---|
| `cribl sources list [-g group]` | List source configurations |
| `cribl sources get <id> [-g group]` | Get a source by ID |
| `cribl sources create [options] [-g group]` | Create a source (`--type`, `--id`, `--json-config`) |
| `cribl sources update <id> <json> [-g group]` | Update a source |
| `cribl sources delete <id> [-g group]` | Delete a source |

### Destinations

| Command | Description |
|---|---|
| `cribl destinations list [-g group]` | List destination configurations |
| `cribl destinations get <id> [-g group]` | Get a destination by ID |
| `cribl destinations create [options] [-g group]` | Create a destination (`--type`, `--id`, `--json-config`) |
| `cribl destinations update <id> <json> [-g group]` | Update a destination |
| `cribl destinations delete <id> [-g group]` | Delete a destination |

### Pipelines

| Command | Description |
|---|---|
| `cribl pipelines list [-g group]` | List pipelines |
| `cribl pipelines get <id> [-g group]` | Get a pipeline by ID |
| `cribl pipelines create <json> [-g group]` | Create a pipeline from JSON |
| `cribl pipelines update <id> <json> [-g group]` | Update a pipeline |
| `cribl pipelines clone <id> --from <group> --to <group>` | Clone a pipeline between groups |
| `cribl pipelines delete <id> [-g group]` | Delete a pipeline |

### Routes

| Command | Description |
|---|---|
| `cribl routes list [-g group]` | List routes |
| `cribl routes get <id> [-g group]` | Get a route by ID |
| `cribl routes create <json> [-g group]` | Create a route |
| `cribl routes update <id> <json> [-g group]` | Update a route |
| `cribl routes delete <id> [-g group]` | Delete a route |

### Packs

| Command | Description |
|---|---|
| `cribl packs list [-g group]` | List packs |
| `cribl packs get <id> [-g group]` | Get a pack by ID |
| `cribl packs create <json> [-g group]` | Create a pack |
| `cribl packs delete <id> [-g group]` | Delete a pack |
| `cribl packs export <id> [-g group]` | Export a pack |

### Lookups

| Command | Description |
|---|---|
| `cribl lookups list [-g group]` | List lookup tables |
| `cribl lookups get <id> [-g group]` | Get a lookup by ID |
| `cribl lookups create <json> [-g group]` | Create a lookup |
| `cribl lookups delete <id> [-g group]` | Delete a lookup |

### Search

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

### Datasets

| Command | Description |
|---|---|
| `cribl datasets list [-g group]` | List search datasets |

### Notebooks

| Command | Description |
|---|---|
| `cribl notebooks list [-g group]` | List search notebooks |
| `cribl notebooks get <id> [-g group]` | Get a notebook by ID |
| `cribl notebooks add --notebook-id <id> --query <q>` | Add query to a notebook |
| `cribl notebooks delete <id> [-g group]` | Delete a notebook |

### Dashboards

| Command | Description |
|---|---|
| `cribl dashboards list [-g group]` | List dashboards |
| `cribl dashboards get <id> [-g group]` | Get a dashboard by ID |
| `cribl dashboards create <json> [-g group]` | Create a dashboard |
| `cribl dashboards delete <id> [-g group]` | Delete a dashboard |

### Alerts

| Command | Description |
|---|---|
| `cribl alerts list` | List alert notifications |

### Jobs

| Command | Description |
|---|---|
| `cribl jobs list [-g group]` | List running jobs |
| `cribl jobs get <id> [-g group]` | Get a job by ID |
| `cribl jobs run <json> [-g group]` | Start a job from JSON config |
| `cribl jobs cancel <id> [-g group]` | Cancel a running job |
| `cribl jobs pause <id> [-g group]` | Pause a running job |
| `cribl jobs resume <id> [-g group]` | Resume a paused job |
| `cribl jobs configs [-g group]` | List saved job configurations |

### Users & Roles

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

### Secrets

| Command | Description |
|---|---|
| `cribl secrets list [-g group]` | List secrets |
| `cribl secrets get <id> [-g group]` | Get a secret by ID |
| `cribl secrets create <json> [-g group]` | Create a secret |
| `cribl secrets update <id> <json> [-g group]` | Update a secret |
| `cribl secrets delete <id> [-g group]` | Delete a secret |

### Version Control

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

### System

| Command | Description |
|---|---|
| `cribl system info` | Get system information |
| `cribl system settings` | Get system settings |
| `cribl system health` | Get system health |
| `cribl system instance` | Get instance information |
| `cribl system worker-health` | Get worker health |

### Metrics

| Command | Description |
|---|---|
| `cribl metrics get [--filter expr] [--names n1,n2]` | Get system metrics |

### Edge

#### Fleet-scoped

| Command | Description |
|---|---|
| `cribl edge containers -f <fleet>` | List containers on edge nodes |
| `cribl edge processes -f <fleet>` | List processes on edge nodes |
| `cribl edge logs -f <fleet>` | Get edge node logs |
| `cribl edge metadata -f <fleet>` | Get edge node metadata |
| `cribl edge events -f <fleet>` | Get edge events |
| `cribl edge files <path> -f <fleet>` | Browse edge files |
| `cribl edge ls <path> -f <fleet>` | List edge directory contents |
| `cribl edge kube-logs -f <fleet>` | Get Kubernetes logs |

#### Node-scoped

| Command | Description |
|---|---|
| `cribl edge nodes [-f <fleet>]` | List edge nodes (optionally filtered by fleet) |
| `cribl edge system-info <node>` | Get system info (CPU, memory, disk, network) |
| `cribl edge system-info-raw <node>` | Get raw system info JSON |
| `cribl edge inputs <node>` | Get inputs/sources for a node |
| `cribl edge outputs <node>` | Get outputs/destinations for a node |
| `cribl edge metrics <node> [-d duration] [--summary]` | Historical metrics (CPU, memory, disk, load) |
| `cribl edge fileinspect <node> <path>` | Inspect a file (stat, MD5, SHA256, head, hexdump) |
| `cribl edge node-ls <node> <path> [--stats]` | List directory contents on a specific node |
| `cribl edge file-search <node> <path> [-q query] [-l limit]` | Search or read file contents on a node |

### Event Breakers

| Command | Description |
|---|---|
| `cribl event-breakers list [-g group]` | List event breaker rulesets |
| `cribl event-breakers get <id> [-g group]` | Get an event breaker ruleset |

### Parsers

| Command | Description |
|---|---|
| `cribl parsers list [-g group]` | List parsers |
| `cribl parsers get <id> [-g group]` | Get a parser |

### Global Variables

| Command | Description |
|---|---|
| `cribl global-vars list [-g group]` | List global variables |
| `cribl global-vars get <id> [-g group]` | Get a global variable |
| `cribl global-vars create <json> [-g group]` | Create a global variable |
| `cribl global-vars update <id> <json> [-g group]` | Update a global variable |
| `cribl global-vars delete <id> [-g group]` | Delete a global variable |

### Schemas

| Command | Description |
|---|---|
| `cribl schemas list [-g group]` | List schemas |
| `cribl schemas get <id> [-g group]` | Get a schema |

### Regex Library

| Command | Description |
|---|---|
| `cribl regex list [-g group]` | List regex patterns |
| `cribl regex get <id> [-g group]` | Get a regex pattern |

### Grok Patterns

| Command | Description |
|---|---|
| `cribl grok list [-g group]` | List grok patterns |
| `cribl grok get <id> [-g group]` | Get a grok pattern |

### Database Connections

| Command | Description |
|---|---|
| `cribl db-connections list [-g group]` | List database connections |
| `cribl db-connections get <id> [-g group]` | Get a database connection |
| `cribl db-connections create <json> [-g group]` | Create a database connection |
| `cribl db-connections update <id> <json> [-g group]` | Update a database connection |
| `cribl db-connections delete <id> [-g group]` | Delete a database connection |

### Functions

| Command | Description |
|---|---|
| `cribl functions list [-g group]` | List pipeline functions |
| `cribl functions get <id> [-g group]` | Get a function |

### Certificates

| Command | Description |
|---|---|
| `cribl certificates list [-g group]` | List certificates |
| `cribl certificates get <id> [-g group]` | Get a certificate |
| `cribl certificates create <json> [-g group]` | Create a certificate |
| `cribl certificates delete <id> [-g group]` | Delete a certificate |

### Credentials

| Command | Description |
|---|---|
| `cribl credentials list [-g group]` | List credentials |
| `cribl credentials get <id> [-g group]` | Get a credential |
| `cribl credentials create <json> [-g group]` | Create a credential |
| `cribl credentials update <id> <json> [-g group]` | Update a credential |
| `cribl credentials delete <id> [-g group]` | Delete a credential |

### Samples

| Command | Description |
|---|---|
| `cribl samples list [-g group]` | List sample data files |
| `cribl samples get <id> [-g group]` | Get a sample file |

### Scripts

| Command | Description |
|---|---|
| `cribl scripts list [-g group]` | List scripts |
| `cribl scripts get <id> [-g group]` | Get a script |
| `cribl scripts create <json> [-g group]` | Create a script |
| `cribl scripts delete <id> [-g group]` | Delete a script |

### Licenses

| Command | Description |
|---|---|
| `cribl licenses list` | List licenses |
| `cribl licenses get <id>` | Get a license |

### Teams

| Command | Description |
|---|---|
| `cribl teams list` | List teams |
| `cribl teams get <id>` | Get a team |
| `cribl teams create <json>` | Create a team |
| `cribl teams update <id> <json>` | Update a team |
| `cribl teams delete <id>` | Delete a team |

### Policies

| Command | Description |
|---|---|
| `cribl policies list` | List RBAC policies |
| `cribl policies get <id>` | Get a policy |
| `cribl policies create <json>` | Create a policy |
| `cribl policies update <id> <json>` | Update a policy |
| `cribl policies delete <id>` | Delete a policy |

### Notification Targets

| Command | Description |
|---|---|
| `cribl notification-targets list` | List notification targets |
| `cribl notification-targets get <id>` | Get a notification target |
| `cribl notification-targets create <json>` | Create a notification target |
| `cribl notification-targets update <id> <json>` | Update a notification target |
| `cribl notification-targets delete <id>` | Delete a notification target |

## Global Options

| Flag | Description |
|---|---|
| `-p, --profile <name>` | Use a specific config profile |
| `--base-url <url>` | Override Cribl base URL |
| `--client-id <id>` | Override OAuth client ID |
| `--client-secret <secret>` | Override OAuth client secret |
| `--verbose` | Log HTTP requests/responses to stderr |
| `--table` | Format output as a table (available on most commands) |

## Output

- **JSON** (default): Structured JSON to stdout, suitable for piping to `jq`
- **Table** (`--table`): Human-readable table format
- **Errors**: Written to stderr as JSON

```bash
# JSON output piped to jq
cribl workers list | jq '.[] | {id, type, workerCount}'

# Table output
cribl pipelines list -g default --table

# Verbose mode shows HTTP traffic on stderr
cribl workers list --verbose 2>debug.log
```

## Development

```bash
npm install
npm run build        # Compile TypeScript
npm run dev -- workers list   # Run via tsx (no build needed)
npm test             # Run unit tests
npm run test:watch   # Watch mode
npm run lint         # Type check
```

## Project Structure

```
bin/cribl.ts                  # Entry point
src/
  cli.ts                      # Commander program setup
  config/                     # Config loading + types
  auth/oauth.ts               # OAuth2 + token caching
  api/
    client.ts                 # Axios client with auth interceptor
    types.ts                  # API response types
    endpoints/                # One file per API resource
  commands/                   # One file per command group
  output/formatter.ts         # JSON + table formatting
  utils/                      # Errors, pagination, group resolver
test/
  unit/                       # Unit tests (vitest + nock)
  integration/                # Live API tests (CRIBL_INTEGRATION_TEST=true)
  fixtures/                   # Mock API responses
```

## License

MIT
