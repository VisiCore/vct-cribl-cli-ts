import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AxiosError } from "axios";
import { handleError, CriblApiError, AuthenticationError, DryRunAbort } from "../../src/utils/errors.js";

describe("handleError", () => {
  let stderrSpy: ReturnType<typeof vi.spyOn>;
  let exitSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    stderrSpy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    exitSpy = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
  });

  afterEach(() => {
    stderrSpy.mockRestore();
    exitSpy.mockRestore();
  });

  it("DryRunAbort exits with code 0", () => {
    handleError(new DryRunAbort());
    expect(exitSpy).toHaveBeenCalledWith(0);
  });

  it("CriblApiError outputs statusCode and body", () => {
    handleError(new CriblApiError("Not found", 404, { detail: "missing" }));
    expect(exitSpy).toHaveBeenCalledWith(1);
    const output = stderrSpy.mock.calls[0][0] as string;
    const parsed = JSON.parse(output);
    expect(parsed.error).toBe("Not found");
    expect(parsed.statusCode).toBe(404);
    expect(parsed.details).toEqual({ detail: "missing" });
  });

  it("AuthenticationError outputs type", () => {
    handleError(new AuthenticationError("bad creds"));
    expect(exitSpy).toHaveBeenCalledWith(1);
    const output = stderrSpy.mock.calls[0][0] as string;
    const parsed = JSON.parse(output);
    expect(parsed.error).toBe("bad creds");
    expect(parsed.type).toBe("AuthenticationError");
  });

  it("AxiosError with response.data.message", () => {
    const err = new AxiosError("Request failed");
    err.response = {
      status: 403,
      statusText: "Forbidden",
      data: { message: "Access denied" },
      headers: {},
      config: {} as never,
    };
    handleError(err);
    expect(exitSpy).toHaveBeenCalledWith(1);
    const output = stderrSpy.mock.calls[0][0] as string;
    const parsed = JSON.parse(output);
    expect(parsed.error).toBe("Access denied");
    expect(parsed.statusCode).toBe(403);
  });

  it("AxiosError with no response (network error)", () => {
    const err = new AxiosError("Network Error");
    handleError(err);
    expect(exitSpy).toHaveBeenCalledWith(1);
    const output = stderrSpy.mock.calls[0][0] as string;
    const parsed = JSON.parse(output);
    expect(parsed.error).toBe("Network Error");
    expect(parsed.statusCode).toBe(0);
  });

  it("generic Error outputs message", () => {
    handleError(new Error("something broke"));
    expect(exitSpy).toHaveBeenCalledWith(1);
    const output = stderrSpy.mock.calls[0][0] as string;
    const parsed = JSON.parse(output);
    expect(parsed.error).toBe("something broke");
  });

  it("non-Error thrown value is stringified", () => {
    handleError("raw string error");
    expect(exitSpy).toHaveBeenCalledWith(1);
    const output = stderrSpy.mock.calls[0][0] as string;
    const parsed = JSON.parse(output);
    expect(parsed.error).toBe("raw string error");
  });
});
