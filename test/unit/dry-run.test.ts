import { describe, it, expect, vi, afterEach } from "vitest";
import axios from "axios";
import { DryRunAbort } from "../../src/utils/errors.js";

describe("dry-run", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("DryRunAbort has correct name and message", () => {
    const err = new DryRunAbort();
    expect(err.name).toBe("DryRunAbort");
    expect(err.message).toBe("Dry run complete");
    expect(err).toBeInstanceOf(Error);
  });

  it("DryRunAbort accepts custom message", () => {
    const err = new DryRunAbort("custom");
    expect(err.message).toBe("custom");
  });

  it("dry-run interceptor outputs request details and throws DryRunAbort", async () => {
    const stderrSpy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);

    const client = axios.create({ baseURL: "https://test.cribl.cloud" });
    // Add auth header (simulating what createClient does)
    client.interceptors.request.use((req) => {
      req.headers.Authorization = "Bearer test-token";
      return req;
    });
    // Add dry-run interceptor
    client.interceptors.request.use((req) => {
      const headers = { ...req.headers } as Record<string, unknown>;
      delete headers.Authorization;
      const info: Record<string, unknown> = {
        dry_run: true,
        method: req.method?.toUpperCase(),
        url: `${req.baseURL ?? ""}${req.url ?? ""}`,
        headers,
      };
      if (req.data) {
        info.body = req.data;
      }
      process.stderr.write(JSON.stringify(info, null, 2) + "\n");
      throw new DryRunAbort();
    });

    await expect(client.get("/api/v1/system/banners")).rejects.toThrow(DryRunAbort);

    expect(stderrSpy).toHaveBeenCalled();
    const output = (stderrSpy.mock.calls[0][0] as string);
    const parsed = JSON.parse(output.trim());
    expect(parsed.dry_run).toBe(true);
    expect(parsed.method).toBe("GET");
    expect(parsed.url).toBe("https://test.cribl.cloud/api/v1/system/banners");
    expect(parsed.headers?.Authorization).toBeUndefined();
  });

  it("dry-run interceptor includes body for POST requests", async () => {
    const stderrSpy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);

    const client = axios.create({ baseURL: "https://test.cribl.cloud" });
    client.interceptors.request.use((req) => {
      const headers = { ...req.headers } as Record<string, unknown>;
      delete headers.Authorization;
      const info: Record<string, unknown> = {
        dry_run: true,
        method: req.method?.toUpperCase(),
        url: `${req.baseURL ?? ""}${req.url ?? ""}`,
        headers,
      };
      if (req.data) {
        info.body = req.data;
      }
      process.stderr.write(JSON.stringify(info, null, 2) + "\n");
      throw new DryRunAbort();
    });

    await expect(client.post("/api/v1/system/banners", { id: "b1", text: "hello" })).rejects.toThrow(DryRunAbort);

    const output = (stderrSpy.mock.calls[0][0] as string);
    const parsed = JSON.parse(output.trim());
    expect(parsed.method).toBe("POST");
    expect(parsed.body).toEqual({ id: "b1", text: "hello" });
  });

  it("handleError exits 0 for DryRunAbort", async () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
    const { handleError } = await import("../../src/utils/errors.js");

    handleError(new DryRunAbort());
    expect(exitSpy).toHaveBeenCalledWith(0);
  });
});
