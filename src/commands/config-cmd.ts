import { Command } from "commander";
import { loadRc, saveRc } from "../config/index.js";
import { formatOutput } from "../output/formatter.js";
import type { AuthType, ProfileConfig } from "../config/types.js";

export function registerConfigCommand(program: Command): void {
  const config = program.command("config").description("Manage CLI configuration").passThroughOptions();

  config
    .command("set")
    .description("Configure credentials for a profile")
    .option("-n, --name <name>", "Profile name", "default")
    .option("--base-url <url>", "Cribl base URL")
    .option("--client-id <id>", "OAuth client ID")
    .option("--client-secret <secret>", "OAuth client secret")
    .option("--username <user>", "Username (local auth)")
    .option("--password <pass>", "Password (local auth)")
    .option("--auth-type <type>", "Auth type: cloud or local")
    .action((opts) => {
      const rc = loadRc();
      const profileName = opts.name as string;
      const existing = rc.profiles[profileName] ?? ({} as Partial<ProfileConfig>);

      const profile: ProfileConfig = {
        baseUrl: (opts.baseUrl as string) ?? existing.baseUrl ?? "",
        authType: ((opts.authType as string) ?? existing.authType ?? "cloud") as AuthType,
        clientId: (opts.clientId as string) ?? existing.clientId,
        clientSecret: (opts.clientSecret as string) ?? existing.clientSecret,
        username: (opts.username as string) ?? existing.username,
        password: (opts.password as string) ?? existing.password,
      };

      rc.profiles[profileName] = profile;
      if (!rc.activeProfile) rc.activeProfile = profileName;
      saveRc(rc);

      console.log(formatOutput({ message: `Profile '${profileName}' saved.` }));
    });

  config
    .command("show")
    .description("Show current configuration")
    .option("-n, --name <name>", "Profile to show")
    .option("--table", "Table output")
    .action((opts) => {
      const rc = loadRc();
      const profileName = (opts.name as string) ?? rc.activeProfile ?? "default";
      const profile = rc.profiles[profileName];

      if (!profile) {
        console.log(formatOutput({ error: `Profile '${profileName}' not found.` }));
        return;
      }

      // Mask secrets
      const display = {
        profile: profileName,
        baseUrl: profile.baseUrl,
        authType: profile.authType,
        clientId: profile.clientId ? `${profile.clientId.slice(0, 8)}...` : undefined,
        clientSecret: profile.clientSecret ? "****" : undefined,
        username: profile.username,
        password: profile.password ? "****" : undefined,
      };

      console.log(formatOutput(display, { table: opts.table as boolean }));
    });

  config
    .command("use")
    .description("Switch active profile")
    .argument("<name>", "Profile name to activate")
    .action((name: string) => {
      const rc = loadRc();
      if (!rc.profiles[name]) {
        console.error(JSON.stringify({ error: `Profile '${name}' does not exist.` }, null, 2));
        process.exit(1);
      }
      rc.activeProfile = name;
      saveRc(rc);
      console.log(formatOutput({ message: `Switched to profile '${name}'.` }));
    });
}
