import { describe, it, expect } from "vitest";
import { parsePort, parseJSON } from "../../src/utils/validation.js";

describe("parsePort", () => {
  it("parses valid port numbers", () => {
    expect(parsePort("80")).toBe(80);
    expect(parsePort("443")).toBe(443);
    expect(parsePort("8080")).toBe(8080);
    expect(parsePort("1")).toBe(1);
    expect(parsePort("65535")).toBe(65535);
  });

  it("rejects non-numeric input", () => {
    expect(() => parsePort("abc")).toThrow('Invalid port: "abc". Must be an integer between 1 and 65535.');
  });

  it("rejects NaN-producing input", () => {
    expect(() => parsePort("abc123")).toThrow('Invalid port: "abc123"');
  });

  it("rejects zero", () => {
    expect(() => parsePort("0")).toThrow('Invalid port: "0"');
  });

  it("rejects negative numbers", () => {
    expect(() => parsePort("-1")).toThrow('Invalid port: "-1"');
  });

  it("rejects ports above 65535", () => {
    expect(() => parsePort("70000")).toThrow('Invalid port: "70000"');
  });

  it("rejects floating point", () => {
    expect(() => parsePort("80.5")).toThrow('Invalid port: "80.5"');
  });

  it("rejects empty string", () => {
    expect(() => parsePort("")).toThrow('Invalid port: ""');
  });

  it("uses custom label in error message", () => {
    expect(() => parsePort("abc", "UDP port")).toThrow('Invalid UDP port: "abc"');
  });
});

describe("parseJSON", () => {
  it("parses valid JSON", () => {
    expect(parseJSON('{"id": "test"}')).toEqual({ id: "test" });
  });

  it("parses nested JSON", () => {
    expect(parseJSON('{"a": {"b": 1}}')).toEqual({ a: { b: 1 } });
  });

  it("rejects invalid JSON with helpful error", () => {
    expect(() => parseJSON("{bad}")).toThrow("Invalid JSON for config");
    expect(() => parseJSON("{bad}")).toThrow("Hint:");
  });

  it("uses custom label in error message", () => {
    expect(() => parseJSON("{bad}", "route")).toThrow("Invalid JSON for route");
  });

  it("rejects trailing commas with helpful hint", () => {
    expect(() => parseJSON('{"a": 1,}')).toThrow("trailing commas");
  });

  it("truncates long invalid input in error", () => {
    const longInput = "x".repeat(200);
    try {
      parseJSON(longInput);
      expect.unreachable("should have thrown");
    } catch (e) {
      const msg = (e as Error).message;
      expect(msg).toContain("...");
      expect(msg.length).toBeLessThan(300);
    }
  });
});
