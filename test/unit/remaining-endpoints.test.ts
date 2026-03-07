import { describe, it, expect, afterEach } from "vitest";
import nock from "nock";
import axios from "axios";
import { createEndpoints } from "../../src/api/endpoint-factory.js";

const BASE = "https://mock.cribl.cloud";
const client = () => axios.create({ baseURL: BASE });

describe("Remaining API endpoints (via factory)", () => {
  afterEach(() => nock.cleanAll());

  it("listEventBreakers", async () => {
    nock(BASE).get("/api/v1/m/default/lib/breakers").reply(200, { items: [{ id: "syslog" }] });
    const d = await createEndpoints({ scope: "group", path: "lib/breakers" }).list(client(), "default");
    expect(d.items[0].id).toBe("syslog");
  });

  it("listParsers", async () => {
    nock(BASE).get("/api/v1/m/default/lib/parsers").reply(200, { items: [{ id: "csv" }] });
    const d = await createEndpoints({ scope: "group", path: "lib/parsers" }).list(client(), "default");
    expect(d.items[0].id).toBe("csv");
  });

  it("listGlobalVariables", async () => {
    nock(BASE).get("/api/v1/m/default/lib/vars").reply(200, { items: [{ id: "myVar" }] });
    const d = await createEndpoints({ scope: "group", path: "lib/vars" }).list(client(), "default");
    expect(d.items[0].id).toBe("myVar");
  });

  it("listSchemas", async () => {
    nock(BASE).get("/api/v1/m/default/lib/schemas").reply(200, { items: [{ id: "schema1" }] });
    const d = await createEndpoints({ scope: "group", path: "lib/schemas" }).list(client(), "default");
    expect(d.items[0].id).toBe("schema1");
  });

  it("listRegex", async () => {
    nock(BASE).get("/api/v1/m/default/lib/regex").reply(200, { items: [{ id: "ip_addr" }] });
    const d = await createEndpoints({ scope: "group", path: "lib/regex" }).list(client(), "default");
    expect(d.items[0].id).toBe("ip_addr");
  });

  it("listGrok", async () => {
    nock(BASE).get("/api/v1/m/default/lib/grok").reply(200, { items: [{ id: "SYSLOGBASE" }] });
    const d = await createEndpoints({ scope: "group", path: "lib/grok" }).list(client(), "default");
    expect(d.items[0].id).toBe("SYSLOGBASE");
  });

  it("listDatabaseConnections", async () => {
    nock(BASE).get("/api/v1/m/default/lib/database-connections").reply(200, { items: [{ id: "pg1" }] });
    const d = await createEndpoints({ scope: "group", path: "lib/database-connections" }).list(client(), "default");
    expect(d.items[0].id).toBe("pg1");
  });

  it("listFunctions", async () => {
    nock(BASE).get("/api/v1/m/default/functions").reply(200, { items: [{ id: "mask" }] });
    const d = await createEndpoints({ scope: "group", path: "functions" }).list(client(), "default");
    expect(d.items[0].id).toBe("mask");
  });

  it("listCertificates", async () => {
    nock(BASE).get("/api/v1/m/default/system/certificates").reply(200, { items: [{ id: "cert1" }] });
    const d = await createEndpoints({ scope: "group", path: "system/certificates" }).list(client(), "default");
    expect(d.items[0].id).toBe("cert1");
  });

  it("listCredentials", async () => {
    nock(BASE).get("/api/v1/m/default/system/credentials").reply(200, { items: [{ id: "cred1" }] });
    const d = await createEndpoints({ scope: "group", path: "system/credentials" }).list(client(), "default");
    expect(d.items[0].id).toBe("cred1");
  });

  it("listSamples", async () => {
    nock(BASE).get("/api/v1/m/default/system/samples").reply(200, { items: [{ id: "sample1" }] });
    const d = await createEndpoints({ scope: "group", path: "system/samples" }).list(client(), "default");
    expect(d.items[0].id).toBe("sample1");
  });

  it("listScripts", async () => {
    nock(BASE).get("/api/v1/m/default/system/scripts").reply(200, { items: [{ id: "myscript" }] });
    const d = await createEndpoints({ scope: "group", path: "system/scripts" }).list(client(), "default");
    expect(d.items[0].id).toBe("myscript");
  });

  it("listLicenses", async () => {
    nock(BASE).get("/api/v1/system/licenses").reply(200, { items: [{ id: "lic1" }] });
    const d = await createEndpoints({ scope: "global", path: "system/licenses" }).list(client(), "_global_");
    expect(d.items[0].id).toBe("lic1");
  });

  it("listTeams", async () => {
    nock(BASE).get("/api/v1/system/teams").reply(200, { items: [{ id: "team1" }] });
    const d = await createEndpoints({ scope: "global", path: "system/teams" }).list(client(), "_global_");
    expect(d.items[0].id).toBe("team1");
  });

  it("listPolicies", async () => {
    nock(BASE).get("/api/v1/system/policies").reply(200, { items: [{ id: "pol1" }] });
    const d = await createEndpoints({ scope: "global", path: "system/policies" }).list(client(), "_global_");
    expect(d.items[0].id).toBe("pol1");
  });

  it("listNotificationTargets", async () => {
    nock(BASE).get("/api/v1/notification-targets").reply(200, { items: [{ id: "email" }] });
    const d = await createEndpoints({ scope: "global", path: "notification-targets" }).list(client(), "_global_");
    expect(d.items[0].id).toBe("email");
  });
});
