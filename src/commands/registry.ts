import type { CommandConfig } from "./command-factory.js";

/**
 * Declarative list of all standard CRUD commands.
 * Each entry generates a full command group with list/get/create/update/delete
 * (or a subset specified by `operations`).
 *
 * Commands with custom logic (routes, pipelines, edge, search, etc.)
 * are registered separately in cli.ts.
 */
export const standardCommands: CommandConfig[] = [
  // ── Group-scoped: full CRUD ────────────────────────────────────
  { name: "parsers",          description: "Manage parsers",                   scope: "group", path: "lib/parsers" },
  { name: "schemas",          description: "Manage schemas",                   scope: "group", path: "lib/schemas" },
  { name: "regex",            description: "Manage regex patterns",            scope: "group", path: "lib/regex" },
  { name: "grok",             description: "Manage grok patterns",             scope: "group", path: "lib/grok" },
  { name: "event-breakers",   description: "Manage event breaker rulesets",    scope: "group", path: "lib/breakers" },
  { name: "global-vars",      description: "Manage global variables",          scope: "group", path: "lib/vars" },
  { name: "db-connections",   description: "Manage database connections",      scope: "group", path: "lib/database-connections" },
  { name: "secrets",          description: "Manage secrets",                   scope: "group", path: "system/secrets" },
  { name: "credentials",      description: "Manage credentials",              scope: "group", path: "system/credentials" },
  { name: "collectors",       description: "Manage collectors",                scope: "group", path: "collectors" },
  { name: "conditions",       description: "Manage conditions",                scope: "group", path: "conditions" },
  { name: "parquet-schemas",   description: "Manage Parquet schemas",          scope: "group", path: "lib/parquet-schemas" },
  { name: "protobuf-libs",    description: "Manage Protobuf libraries",       scope: "group", path: "lib/protobuf-libraries" },
  { name: "sds-rules",        description: "Manage SDS rules",                scope: "group", path: "lib/sds-rules" },
  { name: "sds-rulesets",     description: "Manage SDS rulesets",             scope: "group", path: "lib/sds-rulesets" },
  { name: "appscope",         description: "Manage AppScope configurations",  scope: "group", path: "lib/appscope-configs" },

  // ── Group-scoped: limited operations ───────────────────────────
  { name: "certificates",     description: "Manage certificates",             scope: "group", path: "system/certificates",     operations: ["list", "get", "create", "delete"] },
  { name: "samples",          description: "Manage sample data",              scope: "group", path: "system/samples",           operations: ["list", "get", "create", "delete"] },
  { name: "scripts",          description: "Manage scripts",                  scope: "group", path: "system/scripts",           operations: ["list", "get", "create", "delete"] },
  { name: "lookups",          description: "Manage lookup tables",            scope: "group", path: "system/lookups",           operations: ["list", "get", "create", "delete"] },
  { name: "packs",            description: "Manage packs",                    scope: "group", path: "packs",                    operations: ["list", "get", "create", "delete"] },
  { name: "executors",        description: "Manage executors",                scope: "group", path: "executors",                operations: ["list", "get"] },
  { name: "hmac-functions",   description: "Manage HMAC functions",           scope: "group", path: "lib/hmac-functions",       operations: ["list", "get"] },
  { name: "functions",        description: "List available functions",         scope: "group", path: "functions",                operations: ["list", "get"] },

  // ── Global: full CRUD ──────────────────────────────────────────
  { name: "users",             description: "Manage users",                   scope: "global", path: "system/users" },
  { name: "roles",             description: "Manage RBAC roles",              scope: "global", path: "system/roles" },
  { name: "teams",             description: "Manage teams",                   scope: "global", path: "system/teams" },
  { name: "policies",          description: "Manage RBAC policies",           scope: "global", path: "system/policies" },
  { name: "banners",           description: "Manage system banners",          scope: "global", path: "system/banners" },
  { name: "encryption-keys",   description: "Manage encryption keys",        scope: "global", path: "system/keys" },
  { name: "notification-targets", description: "Manage notification targets", scope: "global", path: "notification-targets" },
  { name: "workspaces",        description: "Manage workspaces",              scope: "global", path: "workspaces" },

  // ── Global: limited operations ─────────────────────────────────
  { name: "messages",          description: "Manage system messages",         scope: "global", path: "system/messages",          operations: ["list", "get", "create", "delete"] },
  { name: "licenses",          description: "Manage licenses",                scope: "global", path: "system/licenses",          operations: ["list", "get"] },
  { name: "subscriptions",     description: "Manage subscriptions",           scope: "global", path: "system/subscriptions",     operations: ["list", "get"] },
  { name: "outposts",          description: "Manage outposts",                scope: "global", path: "master/outposts",          operations: ["list", "get"] },
  { name: "alerts",            description: "Alert notifications",            scope: "global", path: "notifications",            operations: ["list"] },
  { name: "feature-flags",     description: "Manage feature flags",           scope: "global", path: "settings/features",        operations: ["list", "get", "update"] },
  { name: "ai-settings",       description: "Manage AI settings",            scope: "global", path: "ai/settings/features",     operations: ["list", "get", "update"] },

  // ── Search-scoped ──────────────────────────────────────────────
  { name: "macros",              description: "Manage search macros",         scope: "search", path: "macros" },
  { name: "dataset-providers",   description: "Manage dataset providers",    scope: "search", path: "dataset-providers" },
  { name: "dashboard-categories", description: "Manage dashboard categories", scope: "search", path: "dashboard-categories" },
  { name: "trust-policies",     description: "Manage trust policies",         scope: "search", path: "trust-policies" },
  { name: "datatypes",          description: "Manage datatypes",              scope: "search", path: "datatypes" },
  { name: "datasets",           description: "Search datasets",               scope: "search", path: "datasets",                operations: ["list"] },
  { name: "dashboards",         description: "Search dashboards",             scope: "search", path: "dashboards",              operations: ["list", "get", "create", "delete"] },
  { name: "usage-groups",       description: "Manage usage groups",           scope: "search", path: "usage-groups",            operations: ["list", "get"] },

  // ── Lake-scoped ────────────────────────────────────────────────
  { name: "lake-datasets",      description: "Manage lake datasets",          scope: "lake", path: "datasets" },
  { name: "storage-locations",   description: "Manage lake storage locations", scope: "lake", path: "storage-locations" },
];
