import { describe, it, expect } from "vitest";
import { formatOutput } from "../../src/output/formatter.js";

describe("formatOutput", () => {
  it("should output JSON by default", () => {
    const data = [{ id: "g1", name: "default" }];
    const result = formatOutput(data);
    expect(JSON.parse(result)).toEqual(data);
  });

  it("should format array as table when --table", () => {
    const data = [
      { id: "g1", name: "default" },
      { id: "g2", name: "prod" },
    ];
    const result = formatOutput(data, { table: true });
    expect(result).toContain("g1");
    expect(result).toContain("default");
    expect(result).toContain("g2");
    expect(result).toContain("prod");
  });

  it("should format single object as key/value table", () => {
    const data = { profile: "default", baseUrl: "https://test.cribl.cloud" };
    const result = formatOutput(data, { table: true });
    expect(result).toContain("profile");
    expect(result).toContain("default");
    expect(result).toContain("baseUrl");
  });

  it("should handle empty array", () => {
    const result = formatOutput([], { table: true });
    expect(result).toContain("no results");
  });

  it("should respect column selection", () => {
    const data = [{ id: "g1", name: "default", extra: "hidden" }];
    const result = formatOutput(data, { table: true, columns: ["id", "name"] });
    expect(result).toContain("g1");
    expect(result).toContain("default");
    expect(result).not.toContain("hidden");
  });
});
