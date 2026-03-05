import { describe, it, expect, afterEach } from "vitest";
import nock from "nock";
import axios from "axios";
import { listEventBreakers } from "../../src/api/endpoints/event-breakers.js";
import { listParsers } from "../../src/api/endpoints/parsers.js";
import { listGlobalVariables } from "../../src/api/endpoints/global-variables.js";
import { listSchemas } from "../../src/api/endpoints/schemas.js";
import { listRegex } from "../../src/api/endpoints/regex.js";
import { listGrok } from "../../src/api/endpoints/grok.js";
import { listDatabaseConnections } from "../../src/api/endpoints/database-connections.js";
import { listFunctions } from "../../src/api/endpoints/functions.js";
import { listCertificates } from "../../src/api/endpoints/certificates.js";
import { listCredentials } from "../../src/api/endpoints/credentials.js";
import { listSamples } from "../../src/api/endpoints/samples.js";
import { listScripts } from "../../src/api/endpoints/scripts.js";
import { listLicenses } from "../../src/api/endpoints/licenses.js";
import { listTeams } from "../../src/api/endpoints/teams.js";
import { listPolicies } from "../../src/api/endpoints/policies.js";
import { listNotificationTargets } from "../../src/api/endpoints/notification-targets.js";

const BASE = "https://mock.cribl.cloud";
const client = () => axios.create({ baseURL: BASE });

describe("Remaining API endpoints", () => {
  afterEach(() => nock.cleanAll());

  it("listEventBreakers", async () => {
    nock(BASE).get("/api/v1/m/default/lib/breakers").reply(200, { items: [{ id: "syslog" }] });
    const d = await listEventBreakers(client(), "default");
    expect(d.items[0].id).toBe("syslog");
  });

  it("listParsers", async () => {
    nock(BASE).get("/api/v1/m/default/lib/parsers").reply(200, { items: [{ id: "csv" }] });
    const d = await listParsers(client(), "default");
    expect(d.items[0].id).toBe("csv");
  });

  it("listGlobalVariables", async () => {
    nock(BASE).get("/api/v1/m/default/lib/vars").reply(200, { items: [{ id: "myVar" }] });
    const d = await listGlobalVariables(client(), "default");
    expect(d.items[0].id).toBe("myVar");
  });

  it("listSchemas", async () => {
    nock(BASE).get("/api/v1/m/default/lib/schemas").reply(200, { items: [{ id: "schema1" }] });
    const d = await listSchemas(client(), "default");
    expect(d.items[0].id).toBe("schema1");
  });

  it("listRegex", async () => {
    nock(BASE).get("/api/v1/m/default/lib/regex").reply(200, { items: [{ id: "ip_addr" }] });
    const d = await listRegex(client(), "default");
    expect(d.items[0].id).toBe("ip_addr");
  });

  it("listGrok", async () => {
    nock(BASE).get("/api/v1/m/default/lib/grok").reply(200, { items: [{ id: "SYSLOGBASE" }] });
    const d = await listGrok(client(), "default");
    expect(d.items[0].id).toBe("SYSLOGBASE");
  });

  it("listDatabaseConnections", async () => {
    nock(BASE).get("/api/v1/m/default/lib/database-connections").reply(200, { items: [{ id: "pg1" }] });
    const d = await listDatabaseConnections(client(), "default");
    expect(d.items[0].id).toBe("pg1");
  });

  it("listFunctions", async () => {
    nock(BASE).get("/api/v1/m/default/functions").reply(200, { items: [{ id: "mask" }] });
    const d = await listFunctions(client(), "default");
    expect(d.items[0].id).toBe("mask");
  });

  it("listCertificates", async () => {
    nock(BASE).get("/api/v1/m/default/system/certificates").reply(200, { items: [{ id: "cert1" }] });
    const d = await listCertificates(client(), "default");
    expect(d.items[0].id).toBe("cert1");
  });

  it("listCredentials", async () => {
    nock(BASE).get("/api/v1/m/default/system/credentials").reply(200, { items: [{ id: "cred1" }] });
    const d = await listCredentials(client(), "default");
    expect(d.items[0].id).toBe("cred1");
  });

  it("listSamples", async () => {
    nock(BASE).get("/api/v1/m/default/system/samples").reply(200, { items: [{ id: "sample1" }] });
    const d = await listSamples(client(), "default");
    expect(d.items[0].id).toBe("sample1");
  });

  it("listScripts", async () => {
    nock(BASE).get("/api/v1/m/default/system/scripts").reply(200, { items: [{ id: "myscript" }] });
    const d = await listScripts(client(), "default");
    expect(d.items[0].id).toBe("myscript");
  });

  it("listLicenses", async () => {
    nock(BASE).get("/api/v1/system/licenses").reply(200, { items: [{ id: "lic1" }] });
    const d = await listLicenses(client());
    expect(d.items[0].id).toBe("lic1");
  });

  it("listTeams", async () => {
    nock(BASE).get("/api/v1/system/teams").reply(200, { items: [{ id: "team1" }] });
    const d = await listTeams(client());
    expect(d.items[0].id).toBe("team1");
  });

  it("listPolicies", async () => {
    nock(BASE).get("/api/v1/system/policies").reply(200, { items: [{ id: "pol1" }] });
    const d = await listPolicies(client());
    expect(d.items[0].id).toBe("pol1");
  });

  it("listNotificationTargets", async () => {
    nock(BASE).get("/api/v1/notification-targets").reply(200, { items: [{ id: "email" }] });
    const d = await listNotificationTargets(client());
    expect(d.items[0].id).toBe("email");
  });
});
