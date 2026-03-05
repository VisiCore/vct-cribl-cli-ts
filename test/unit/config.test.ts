import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Mock the rc file loading to isolate from real ~/.criblrc
vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  return {
    ...actual,
    readFileSync: vi.fn(() => {
      throw new Error("ENOENT");
    }),
    writeFileSync: vi.fn(),
    mkdirSync: vi.fn(),
  };
});

describe("config", () => {
  const origEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.CRIBL_BASE_URL;
    delete process.env.CRIBL_CLIENT_ID;
    delete process.env.CRIBL_CLIENT_SECRET;
    delete process.env.CRIBL_USERNAME;
    delete process.env.CRIBL_PASSWORD;
    delete process.env.CRIBL_PROFILE;
  });

  afterEach(() => {
    process.env = { ...origEnv };
  });

  it("should load config from env vars", async () => {
    process.env.CRIBL_BASE_URL = "https://test.cribl.cloud";
    process.env.CRIBL_CLIENT_ID = "cid";
    process.env.CRIBL_CLIENT_SECRET = "csecret";

    const { loadConfig } = await import("../../src/config/index.js");
    const config = loadConfig({});

    expect(config.baseUrl).toBe("https://test.cribl.cloud");
    expect(config.clientId).toBe("cid");
    expect(config.clientSecret).toBe("csecret");
    expect(config.authType).toBe("cloud");
  });

  it("should prefer CLI opts over env vars", async () => {
    process.env.CRIBL_BASE_URL = "https://env.cribl.cloud";

    const { loadConfig } = await import("../../src/config/index.js");
    const config = loadConfig({ baseUrl: "https://cli.cribl.cloud" });

    expect(config.baseUrl).toBe("https://cli.cribl.cloud");
  });

  it("should throw if no base URL configured", async () => {
    const { loadConfig } = await import("../../src/config/index.js");
    expect(() => loadConfig({})).toThrow("No base URL configured");
  });

  it("should strip trailing slashes from baseUrl", async () => {
    process.env.CRIBL_BASE_URL = "https://test.cribl.cloud///";

    const { loadConfig } = await import("../../src/config/index.js");
    const config = loadConfig({});

    expect(config.baseUrl).toBe("https://test.cribl.cloud");
  });

  it("should detect local auth when username/password provided", async () => {
    process.env.CRIBL_BASE_URL = "https://local.cribl:9000";
    process.env.CRIBL_USERNAME = "admin";
    process.env.CRIBL_PASSWORD = "pass123";

    const { loadConfig } = await import("../../src/config/index.js");
    const config = loadConfig({});

    expect(config.authType).toBe("local");
  });
});
