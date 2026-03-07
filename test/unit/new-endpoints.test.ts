import { describe, it, expect, afterEach } from "vitest";
import nock from "nock";
import axios from "axios";
import { listPipelines, getPipeline } from "../../src/api/endpoints/pipelines.js";
import { listRoutes } from "../../src/api/endpoints/routes.js";
import { listJobs, listJobConfigs } from "../../src/api/endpoints/jobs.js";
import { getVersionInfo, getVersionStatus } from "../../src/api/endpoints/version.js";
import { getSystemInfo, getHealth } from "../../src/api/endpoints/system.js";
import { listContainers, listProcesses } from "../../src/api/endpoints/edge.js";
import { createEndpoints } from "../../src/api/endpoint-factory.js";

const BASE = "https://mock.cribl.cloud";
const client = () => axios.create({ baseURL: BASE });

describe("New API endpoints", () => {
  afterEach(() => nock.cleanAll());

  it("listPipelines", async () => {
    nock(BASE).get("/api/v1/m/default/pipelines").reply(200, { items: [{ id: "main" }] });
    const data = await listPipelines(client(), "default");
    expect(data.items[0].id).toBe("main");
  });

  it("getPipeline", async () => {
    nock(BASE).get("/api/v1/m/default/pipelines/main").reply(200, { items: [{ id: "main", conf: {} }] });
    const data = await getPipeline(client(), "default", "main");
    expect(data.id).toBe("main");
  });

  it("listRoutes", async () => {
    nock(BASE).get("/api/v1/m/default/routes").reply(200, { id: "default", routes: [{ id: "r1" }] });
    const data = await listRoutes(client(), "default");
    expect(data.id).toBe("default");
  });

  it("listPacks (via factory)", async () => {
    nock(BASE).get("/api/v1/m/default/packs").reply(200, { items: [{ id: "pack1", version: "1.0" }] });
    const endpoints = createEndpoints({ scope: "group", path: "packs" });
    const data = await endpoints.list(client(), "default");
    expect(data.items[0].id).toBe("pack1");
  });

  it("listLookups (via factory)", async () => {
    nock(BASE).get("/api/v1/m/default/system/lookups").reply(200, { items: [{ id: "geoip" }] });
    const endpoints = createEndpoints({ scope: "group", path: "system/lookups" });
    const data = await endpoints.list(client(), "default");
    expect(data.items[0].id).toBe("geoip");
  });

  it("listJobs", async () => {
    nock(BASE).get("/api/v1/m/default/jobs").reply(200, { items: [{ id: "job1", status: "running" }] });
    const data = await listJobs(client(), "default");
    expect(data.items[0].status).toBe("running");
  });

  it("listJobConfigs", async () => {
    nock(BASE).get("/api/v1/m/default/lib/jobs").reply(200, { items: [{ id: "collector1" }] });
    const data = await listJobConfigs(client(), "default");
    expect(data.items[0].id).toBe("collector1");
  });

  it("listUsers (via factory)", async () => {
    nock(BASE).get("/api/v1/system/users").reply(200, { items: [{ id: "admin", username: "admin" }] });
    const endpoints = createEndpoints({ scope: "global", path: "system/users" });
    const data = await endpoints.list(client(), "_global_");
    expect(data.items[0].username).toBe("admin");
  });

  it("listRoles (via factory)", async () => {
    nock(BASE).get("/api/v1/system/roles").reply(200, { items: [{ id: "admin" }] });
    const endpoints = createEndpoints({ scope: "global", path: "system/roles" });
    const data = await endpoints.list(client(), "_global_");
    expect(data.items[0].id).toBe("admin");
  });

  it("listSecrets (via factory)", async () => {
    nock(BASE).get("/api/v1/m/default/system/secrets").reply(200, { items: [{ id: "mykey" }] });
    const endpoints = createEndpoints({ scope: "group", path: "system/secrets" });
    const data = await endpoints.list(client(), "default");
    expect(data.items[0].id).toBe("mykey");
  });

  it("getVersionInfo", async () => {
    nock(BASE).get("/api/v1/m/default/version/info").reply(200, { branch: "main", commit: "abc" });
    const data = await getVersionInfo(client(), "default");
    expect(data.branch).toBe("main");
  });

  it("getVersionStatus", async () => {
    nock(BASE).get("/api/v1/m/default/version/status").reply(200, { clean: true });
    const data = await getVersionStatus(client(), "default");
    expect(data).toHaveProperty("clean", true);
  });

  it("getSystemInfo", async () => {
    nock(BASE).get("/api/v1/system/info").reply(200, { build: { version: "4.5.0" } });
    const data = await getSystemInfo(client());
    expect(data).toHaveProperty("build");
  });

  it("getHealth", async () => {
    nock(BASE).get("/api/v1/health").reply(200, { status: "healthy" });
    const data = await getHealth(client());
    expect(data).toHaveProperty("status", "healthy");
  });

  it("listDashboards (via factory)", async () => {
    nock(BASE).get("/api/v1/m/default_search/search/dashboards").reply(200, { items: [{ id: "dash1" }] });
    const endpoints = createEndpoints({ scope: "search", path: "dashboards" });
    const data = await endpoints.list(client(), "default_search");
    expect(data.items[0].id).toBe("dash1");
  });

  it("listContainers", async () => {
    nock(BASE).get("/api/v1/m/default_fleet/edge/containers").reply(200, { items: [{ id: "c1" }] });
    const data = await listContainers(client(), "default_fleet");
    expect(data.items[0].id).toBe("c1");
  });

  it("listProcesses", async () => {
    nock(BASE).get("/api/v1/m/default_fleet/edge/processes").reply(200, { items: [{ pid: 1234 }] });
    const data = await listProcesses(client(), "default_fleet");
    expect(data.items[0].pid).toBe(1234);
  });
});
