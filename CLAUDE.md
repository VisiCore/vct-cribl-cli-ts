# Cribl CLI — Developer Guide

TypeScript/Node.js CLI for the Cribl Cloud REST API. Uses ESM modules (`"type": "module"`), Commander.js v12 for CLI framework, axios for HTTP, vitest + nock for testing.

## Quick Commands

```bash
npm run build        # tsc — compile TypeScript
npm run dev -- <cmd> # tsx — run without building (e.g. npm run dev -- workers list)
npm test             # vitest run — unit tests
npm run test:watch   # vitest — watch mode
npm run lint         # tsc --noEmit — type check only
```

## Architecture

The CLI uses a **factory pattern** to eliminate boilerplate. ~49 standard CRUD commands are generated from a declarative registry, while ~19 commands with custom logic remain hand-written.

```
bin/cribl.ts                     → Entry point (#!/usr/bin/env node)
src/cli.ts                       → Commander program setup, --dry-run flag, registers commands
src/config/                      → Config loading (CLI flags > env vars > ~/.criblrc profiles)
src/auth/oauth.ts                → OAuth2 cloud + local auth with token caching
src/api/client.ts                → Axios client with auth interceptor + dry-run interceptor
src/api/endpoint-factory.ts      → Generic CRUD endpoint factory (group/global/search/lake scopes)
src/api/types.ts                 → Shared API response types (ListResponse, etc.)
src/api/endpoints/               → Hand-written endpoints for special resources (19 files)
src/commands/command-factory.ts  → Generates Commander CRUD subcommands from config
src/commands/registry.ts         → Declarative list of ~49 standard commands
src/commands/                    → Hand-written commands for special resources (19 files)
src/output/formatter.ts          → JSON (default) + --table mode (cli-table3)
src/utils/errors.ts              → handleError() + DryRunAbort — formats errors to stderr as JSON
src/utils/pagination.ts          → Pagination helpers
src/utils/group-resolver.ts      → resolveGroup() — defaults to first worker group if -g omitted
```

## How to Add a New Command Group

### Standard CRUD command (preferred)

Just add one line to `src/commands/registry.ts`:

```typescript
{ name: "my-resource", description: "Manage my resources", scope: "group", path: "lib/my-resource" }
```

This generates `list`, `get`, `create`, `update`, `delete` subcommands with group resolution, error handling, merge-on-update, and `--table` output.

Supported scopes:
- `group` → `/api/v1/m/{group}/{path}`
- `global` → `/api/v1/{path}`
- `search` → `/api/v1/m/{group}/search/{path}` (defaults to `default_search`)
- `lake` → `/api/v1/products/lake/lakes/{id}/{path}` (requires `--lake`)

For operation subsets: `operations: ["list", "get"]`

### Custom command (escape hatch)

For commands with non-CRUD logic (routes, edge, search, etc.):

1. **Endpoint file** — Create `src/api/endpoints/<resource>.ts` with custom functions
2. **Command file** — Create `src/commands/<resource>.ts` with `registerXCommand(program)`
3. **Register** — Add import + `registerXCommand(program)` call in `src/cli.ts`
4. **Tests** — Add nock-based tests in `test/unit/`

## API Endpoint Patterns

| Scope | URL Pattern | Examples |
|-------|-------------|----------|
| **Global** (no group) | `/api/v1/<resource>` | users, roles, system, licenses, teams, policies |
| **Group-scoped** | `/api/v1/m/{group}/<resource>` | pipelines, routes, sources, destinations, packs, lookups, secrets, version, credentials |
| **Search-scoped** | `/api/v1/m/{search_group}/search/<resource>` | datasets, dashboards, notebooks, saved searches, search jobs |
| **Lake-scoped** | `/api/v1/products/lake/lakes/{id}/<resource>` | lake-datasets, storage-locations |

## Key Behaviors

- **Merge-on-update** — All `update` commands (sources, destinations, routes, and all factory-generated) fetch the existing config, merge the user's changes on top, then PATCH. This prevents the Cribl API from stripping unspecified fields.
- **--dry-run** — Root-level flag that prints `{ dry_run, method, url, headers, body }` to stderr and exits 0 without making any API call. Uses `DryRunAbort` error class.
- **Routes create** — Fetches existing route table, inserts before the catch-all route, then PATCHes the whole table.
- **Routes update** — Fetches the route table, finds the route by ID, merges changes, PATCHes the whole table.

## Key Gotchas

- **Cloud OAuth audience** must be `https://api.cribl.cloud` (not the org-specific URL)
- Root command uses `enablePositionalOptions()` — required for `-g` option on subcommands
- Config command uses `passThroughOptions()` to avoid option name conflicts with root
- Config set/show uses `-n, --name` (not `--profile`) to avoid conflict with root `-p, --profile`
- `preAction` hook walks the parent chain to skip auth init for `config` subcommands
- `getClient()` is a singleton — the `preAction` hook initializes it before command execution
- Source/destination `create` commands accept `--type`/`--id` flags OR `--json-config` for full JSON
- The Cribl API treats PATCH as a full replace (validates entire schema) — that's why merge-on-update is needed

## Test Patterns

- **Unit tests**: vitest + nock for HTTP mocking (207 tests)
- Config tests mock `node:fs` to isolate from real `~/.criblrc`
- Integration tests gated behind `CRIBL_INTEGRATION_TEST=true` env var
- Test fixtures in `test/fixtures/`
- Nock interceptors match against `https://test.cribl.cloud` or `https://mock.cribl.cloud` base URL
- Endpoint factory tests cover all 4 scopes × 5 operations

## Answering Questions About Nodes

When the user asks about CPU, memory, disk, load, or network for a Cribl node (Edge or hybrid worker), use the CLI to fetch live data. These commands work for **any managed node** — Edge nodes, hybrid workers, etc.

```bash
# List all managed nodes (Edge + hybrid workers)
npx tsx bin/cribl.ts edge nodes

# Filter to a specific fleet
npx tsx bin/cribl.ts edge nodes -f pi

# Get system summary (CPU%, memory, disk, load avg, uptime) by hostname
npx tsx bin/cribl.ts edge system-info <hostname>

# Get full raw JSON (per-CPU times, network interfaces, all details)
npx tsx bin/cribl.ts edge system-info-raw <hostname>

# Get sources/inputs running on a node
npx tsx bin/cribl.ts edge inputs <hostname>

# Get destinations/outputs on a node
npx tsx bin/cribl.ts edge outputs <hostname>

# Historical metrics (CPU, memory, disk, load) — time series
npx tsx bin/cribl.ts edge metrics <hostname> -d 1h        # last hour (default)
npx tsx bin/cribl.ts edge metrics <hostname> -d 15m       # last 15 min
npx tsx bin/cribl.ts edge metrics <hostname> -d 4h        # last 4 hours
# Durations: 5m, 10m, 15m, 30m, 1h, 4h, 12h, 1d

# Summary (min/max/avg) instead of full time series
npx tsx bin/cribl.ts edge metrics <hostname> -d 1h --summary

# Inspect a file on an Edge node (stat, hashes, head, hexdump) — Edge nodes only
npx tsx bin/cribl.ts edge fileinspect <hostname> <path>

# List directory contents on a specific node
npx tsx bin/cribl.ts edge node-ls <hostname> <path>
npx tsx bin/cribl.ts edge node-ls <hostname> <path> --stats  # include size, permissions, timestamps

# Search or read file contents on a node
npx tsx bin/cribl.ts edge file-search <hostname> <path>                  # read all lines
npx tsx bin/cribl.ts edge file-search <hostname> <path> -q "error"       # search for string
npx tsx bin/cribl.ts edge file-search <hostname> <path> -l 100           # limit lines (default 50)
npx tsx bin/cribl.ts edge file-search <hostname> <path> --raw            # print only _raw content

# Fleet-level commands (require -f <fleet>)
npx tsx bin/cribl.ts edge containers -f <fleet>    # list containers
npx tsx bin/cribl.ts edge processes -f <fleet>     # list processes
npx tsx bin/cribl.ts edge logs -f <fleet>          # get edge logs
npx tsx bin/cribl.ts edge metadata -f <fleet>      # get edge metadata
npx tsx bin/cribl.ts edge events -f <fleet>        # get edge events
npx tsx bin/cribl.ts edge files <path> -f <fleet>  # browse edge files
npx tsx bin/cribl.ts edge ls <path> -f <fleet>     # list directory contents
npx tsx bin/cribl.ts edge kube-logs -f <fleet>     # get Kubernetes logs
```

**How to answer node questions:**

1. If the user names a host, run `edge system-info <hostname>` for a current snapshot
2. If unclear which node, run `edge nodes` to list them and ask or infer
3. For trend/spike questions ("any CPU spikes?", "memory usage over time"), use `edge metrics <hostname> -d <duration> --summary` to get min/max/avg, or without `--summary` for the full minute-by-minute time series
4. The `--summary` output shows min/max/avg for CPU%, memory%, disk%, and load avg — a max CPU much higher than avg indicates spikes
5. For deeper analysis (per-core breakdown, network interface details), use `system-info-raw`
6. For file inspection questions (hashes, contents, permissions), use `edge fileinspect <hostname> <path>` (Edge nodes only)
7. To browse files on a node, use `edge node-ls <hostname> <path>` (add `--stats` for details)
8. To search or read file contents, use `edge file-search <hostname> <path>` (with `-q` to search, `--raw` for plain output)
9. For fleet-wide data (containers, processes, logs, metadata, events), use the fleet-level commands with `-f <fleet>`
10. `fileinspect` and `node-ls` work on Edge nodes. For hybrid workers, `node-ls` falls back to listing Cribl log files, and `file-search` searches via the system/logs API
11. Hostnames are case-insensitive — `pi5-cribl` and `Pi5-Cribl` both work
12. Data resolution is 1 minute. Available history depends on node uptime and metrics retention

## Contributing

### Setup

```bash
git clone <repo-url> && cd cribl-cli
npm install
npm test              # verify everything passes
```

### Development Workflow

1. **Run without building** — Use `npm run dev -- <command>` (tsx) during development instead of `npm run build` + `node dist/bin/cribl.js`
2. **Type check** — Run `npm run lint` before committing to catch type errors
3. **Test** — Run `npm test` to run the full suite (207 unit tests, ~1 second)
4. **Integration tests** — Require a live Cribl instance: `CRIBL_INTEGRATION_TEST=true npm test`

### Adding a New Command

**Standard CRUD (most common)** — Add one line to `src/commands/registry.ts`. No endpoint or command file needed. See "How to Add a New Command Group" above for scope options.

**Custom command** — For non-CRUD logic, create an endpoint file (`src/api/endpoints/`), a command file (`src/commands/`), register it in `src/cli.ts`, and add tests in `test/unit/`.

### Writing Tests

- Use **vitest + nock** for HTTP mocking — see any existing test in `test/unit/` for the pattern
- Mock against `https://test.cribl.cloud` or `https://mock.cribl.cloud` as the base URL
- Config tests should mock `node:fs` to avoid touching the real `~/.criblrc`
- Add fixtures in `test/fixtures/` for reusable API response data

### Code Style

- **ESM only** — No CommonJS (`require`/`module.exports`). Use `import`/`export`
- **Strict TypeScript** — `strict: true` in tsconfig. No `any` unless absolutely necessary
- **URL-encode IDs** — Always use `encodeURIComponent()` for group names and resource IDs in URL paths
- **Merge-on-update** — All update commands must fetch existing config, merge changes, then PATCH. Never send a partial PATCH without merging first (the Cribl API validates the entire schema)
- **Error handling** — Use `handleError()` from `src/utils/errors.ts`. Errors go to stderr as JSON
- **No unnecessary dependencies** — The production dependency list is intentionally minimal (axios, commander, cli-table3)

### Project Structure Rules

- Factory-generated commands live in `registry.ts` — don't create separate files for standard CRUD
- Hand-written commands are the escape hatch for custom logic only
- Keep endpoints and commands in separate layers (`src/api/endpoints/` vs `src/commands/`)
- One registration call per command in `src/cli.ts`

## Workflow Skills

Agent workflow guides are in `skills/` — each `SKILL.md` teaches how to compose commands for common tasks. See `skills/cribl-shared/SKILL.md` for the base skill (auth, flags, output).
