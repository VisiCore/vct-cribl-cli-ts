import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import type { CriblConfig, CriblRc, ProfileConfig, AuthType } from "./types.js";

const RC_PATH = join(homedir(), ".criblrc");

export function loadRc(): CriblRc {
  try {
    const raw = readFileSync(RC_PATH, "utf-8");
    return JSON.parse(raw) as CriblRc;
  } catch {
    return { profiles: {}, activeProfile: "default" };
  }
}

export function saveRc(rc: CriblRc): void {
  const dir = dirname(RC_PATH);
  mkdirSync(dir, { recursive: true });
  writeFileSync(RC_PATH, JSON.stringify(rc, null, 2) + "\n", { mode: 0o600 });
}

export function loadConfig(opts: {
  profile?: string;
  baseUrl?: string;
  clientId?: string;
  clientSecret?: string;
  username?: string;
  password?: string;
}): CriblConfig {
  const rc = loadRc();
  const profileName = opts.profile ?? process.env.CRIBL_PROFILE ?? rc.activeProfile ?? "default";
  const saved = rc.profiles[profileName] ?? ({} as Partial<ProfileConfig>);

  const baseUrl = opts.baseUrl ?? process.env.CRIBL_BASE_URL ?? saved.baseUrl;
  const clientId = opts.clientId ?? process.env.CRIBL_CLIENT_ID ?? saved.clientId;
  const clientSecret = opts.clientSecret ?? process.env.CRIBL_CLIENT_SECRET ?? saved.clientSecret;
  const username = opts.username ?? process.env.CRIBL_USERNAME ?? saved.username;
  const password = opts.password ?? process.env.CRIBL_PASSWORD ?? saved.password;

  let authType: AuthType = saved.authType ?? "cloud";
  if (username && password) authType = "local";
  if (clientId && clientSecret) authType = "cloud";

  if (!baseUrl) {
    throw new Error(
      "No base URL configured. Run `cribl config set` or set CRIBL_BASE_URL."
    );
  }

  try { new URL(baseUrl); } catch {
    throw new Error(`Invalid base URL: "${baseUrl}". Expected format: https://your-org.cribl.cloud`);
  }

  return {
    profile: profileName,
    baseUrl: baseUrl.replace(/\/+$/, ""),
    authType,
    clientId,
    clientSecret,
    username,
    password,
  };
}
