export type AuthType = "cloud" | "local";

export interface ProfileConfig {
  baseUrl: string;
  authType: AuthType;
  clientId?: string;
  clientSecret?: string;
  username?: string;
  password?: string;
}

export interface CriblRc {
  profiles: Record<string, ProfileConfig>;
  activeProfile: string;
}

export interface CriblConfig extends ProfileConfig {
  profile: string;
}
