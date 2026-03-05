import { describe, it, expect, vi } from "vitest";
import { CriblApiError, AuthenticationError } from "../../src/utils/errors.js";

describe("error classes", () => {
  it("CriblApiError stores statusCode and body", () => {
    const err = new CriblApiError("Not found", 404, { detail: "resource missing" });
    expect(err.message).toBe("Not found");
    expect(err.statusCode).toBe(404);
    expect(err.body).toEqual({ detail: "resource missing" });
    expect(err.name).toBe("CriblApiError");
  });

  it("AuthenticationError has correct name", () => {
    const err = new AuthenticationError("bad creds");
    expect(err.message).toBe("bad creds");
    expect(err.name).toBe("AuthenticationError");
  });
});
