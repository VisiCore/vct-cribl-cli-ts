import axios from "axios";
import type { CriblConfig } from "../config/types.js";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

let cachedToken: { token: string; expiresAt: number } | null = null;

export function clearTokenCache(): void {
  cachedToken = null;
}

export async function getAccessToken(config: CriblConfig): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }

  if (config.authType === "cloud") {
    return getCloudToken(config);
  }
  return getLocalToken(config);
}

async function getCloudToken(config: CriblConfig): Promise<string> {
  if (!config.clientId || !config.clientSecret) {
    throw new Error(
      "Cloud auth requires CRIBL_CLIENT_ID and CRIBL_CLIENT_SECRET."
    );
  }

  const loginHost = `https://login.cribl.cloud`;

  const resp = await axios.post<TokenResponse>(
    `${loginHost}/oauth/token`,
    {
      grant_type: "client_credentials",
      client_id: config.clientId,
      client_secret: config.clientSecret,
      audience: "https://api.cribl.cloud",
    },
    { headers: { "Content-Type": "application/json" } }
  );

  cachedToken = {
    token: resp.data.access_token,
    expiresAt: Date.now() + resp.data.expires_in * 1000,
  };
  return cachedToken.token;
}

async function getLocalToken(config: CriblConfig): Promise<string> {
  if (!config.username || !config.password) {
    throw new Error("Local auth requires CRIBL_USERNAME and CRIBL_PASSWORD.");
  }

  const resp = await axios.post<{ token: string }>(
    `${config.baseUrl}/api/v1/auth/login`,
    { username: config.username, password: config.password },
    { headers: { "Content-Type": "application/json" } }
  );

  cachedToken = {
    token: resp.data.token,
    expiresAt: Date.now() + 3600 * 1000, // assume 1hr for local
  };
  return cachedToken.token;
}
