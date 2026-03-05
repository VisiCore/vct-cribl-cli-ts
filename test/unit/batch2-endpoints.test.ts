import { describe, it, expect, afterEach } from "vitest";
import nock from "nock";
import axios from "axios";
import {
  getSearchTimeline,
  getSearchFieldSummary,
  getSearchJobLogs,
  getSearchJobMetrics,
  getSearchJobDiag,
} from "../../src/api/endpoints/search.js";
import {
  getSystemLogs,
  getSystemLog,
  getSystemDiag,
  sendSystemDiag,
  restartSystem,
  reloadConfig,
  upgradeSystem,
} from "../../src/api/endpoints/system.js";
import {
  getEdgeEvents,
  getEdgeFile,
  listEdgeFiles,
  getEdgeKubeLogs,
} from "../../src/api/endpoints/edge.js";

const BASE = "https://mock.cribl.cloud";
const client = () => axios.create({ baseURL: BASE });

describe("Batch 2 - Extended search endpoints", () => {
  afterEach(() => nock.cleanAll());

  it("getSearchTimeline", async () => {
    nock(BASE).get("/api/v1/m/default_search/search/jobs/j1/timeline").reply(200, { buckets: [] });
    const d = await getSearchTimeline(client(), "j1");
    expect(d).toHaveProperty("buckets");
  });

  it("getSearchFieldSummary", async () => {
    nock(BASE).get("/api/v1/m/default_search/search/jobs/j1/field-summaries").reply(200, { fields: [] });
    const d = await getSearchFieldSummary(client(), "j1");
    expect(d).toHaveProperty("fields");
  });

  it("getSearchJobLogs", async () => {
    nock(BASE).get("/api/v1/m/default_search/search/jobs/j1/logs").reply(200, { items: [] });
    const d = await getSearchJobLogs(client(), "j1");
    expect(d).toHaveProperty("items");
  });

  it("getSearchJobMetrics", async () => {
    nock(BASE).get("/api/v1/m/default_search/search/jobs/j1/metrics").reply(200, { metrics: [] });
    const d = await getSearchJobMetrics(client(), "j1");
    expect(d).toHaveProperty("metrics");
  });

  it("getSearchJobDiag", async () => {
    nock(BASE).get("/api/v1/m/default_search/search/jobs/j1/diag").reply(200, { diag: {} });
    const d = await getSearchJobDiag(client(), "j1");
    expect(d).toHaveProperty("diag");
  });
});

describe("Batch 2 - Extended system endpoints", () => {
  afterEach(() => nock.cleanAll());

  it("getSystemLogs", async () => {
    nock(BASE).get("/api/v1/system/logs").reply(200, { items: [] });
    const d = await getSystemLogs(client());
    expect(d).toHaveProperty("items");
  });

  it("getSystemLog", async () => {
    nock(BASE).get("/api/v1/system/logs/log1").reply(200, { id: "log1" });
    const d = await getSystemLog(client(), "log1");
    expect(d).toHaveProperty("id");
  });

  it("getSystemDiag", async () => {
    nock(BASE).get("/api/v1/system/diag").reply(200, { status: "ok" });
    const d = await getSystemDiag(client());
    expect(d).toHaveProperty("status");
  });

  it("sendSystemDiag", async () => {
    nock(BASE).post("/api/v1/system/diag/send").reply(200, { sent: true });
    const d = await sendSystemDiag(client());
    expect(d).toHaveProperty("sent");
  });

  it("restartSystem", async () => {
    nock(BASE).post("/api/v1/system/settings/restart").reply(200, { restarting: true });
    const d = await restartSystem(client());
    expect(d).toHaveProperty("restarting");
  });

  it("reloadConfig", async () => {
    nock(BASE).post("/api/v1/system/settings/reload").reply(200, { reloaded: true });
    const d = await reloadConfig(client());
    expect(d).toHaveProperty("reloaded");
  });

  it("upgradeSystem", async () => {
    nock(BASE).get("/api/v1/system/settings/upgrade").reply(200, { available: false });
    const d = await upgradeSystem(client());
    expect(d).toHaveProperty("available");
  });
});

describe("Batch 2 - Extended edge endpoints", () => {
  afterEach(() => nock.cleanAll());

  it("getEdgeEvents", async () => {
    nock(BASE).get("/api/v1/m/fleet1/edge/events").reply(200, { events: [] });
    const d = await getEdgeEvents(client(), "fleet1");
    expect(d).toHaveProperty("events");
  });

  it("getEdgeFile", async () => {
    nock(BASE).get("/api/v1/m/fleet1/edge/file/test.log").reply(200, { content: "data" });
    const d = await getEdgeFile(client(), "fleet1", "test.log");
    expect(d).toHaveProperty("content");
  });

  it("listEdgeFiles", async () => {
    nock(BASE).get("/api/v1/m/fleet1/edge/ls").query({ path: "/var/log" }).reply(200, { files: [] });
    const d = await listEdgeFiles(client(), "fleet1", "/var/log");
    expect(d).toHaveProperty("files");
  });

  it("getEdgeKubeLogs", async () => {
    nock(BASE).get("/api/v1/m/fleet1/edge/kube-logs").reply(200, { logs: [] });
    const d = await getEdgeKubeLogs(client(), "fleet1");
    expect(d).toHaveProperty("logs");
  });
});
