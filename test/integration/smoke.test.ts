import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";

const ENABLED = process.env.CRIBL_INTEGRATION_TEST === "true";
const run = (args: string) =>
  execSync(`node dist/bin/cribl.js ${args}`, { encoding: "utf-8" });

describe.skipIf(!ENABLED)("integration", () => {
  it("cribl workers list returns JSON array", () => {
    const out = run("workers list");
    const data = JSON.parse(out);
    expect(Array.isArray(data)).toBe(true);
  });

  it("cribl workers list --table includes table chars", () => {
    const out = run("workers list --table");
    expect(out).toContain("─");
  });

  it("cribl config show works", () => {
    const out = run("config show");
    const data = JSON.parse(out);
    expect(data).toHaveProperty("profile");
  });

  it("cribl search jobs returns JSON", () => {
    const out = run("search jobs");
    const data = JSON.parse(out);
    expect(Array.isArray(data)).toBe(true);
  });

  it("cribl datasets list returns JSON", () => {
    const out = run("datasets list");
    const data = JSON.parse(out);
    expect(Array.isArray(data)).toBe(true);
  });
});
