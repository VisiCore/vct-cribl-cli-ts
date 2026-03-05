import { describe, it, expect, afterEach } from "vitest";
import nock from "nock";
import axios from "axios";
import { listCollectors } from "../../src/api/endpoints/collectors.js";
import { listConditions } from "../../src/api/endpoints/conditions.js";
import { listExecutors } from "../../src/api/endpoints/executors.js";
import { listParquetSchemas } from "../../src/api/endpoints/parquet-schemas.js";
import { listProtobufLibs } from "../../src/api/endpoints/protobuf-libs.js";
import { listHmacFunctions } from "../../src/api/endpoints/hmac-functions.js";
import { listSdsRules } from "../../src/api/endpoints/sds-rules.js";
import { listSdsRulesets } from "../../src/api/endpoints/sds-rulesets.js";
import { listAppscopeConfigs } from "../../src/api/endpoints/appscope.js";
import { runPreview } from "../../src/api/endpoints/preview.js";
import { getLogger, setLogger } from "../../src/api/endpoints/logger.js";
import { getProfiler, startProfiler } from "../../src/api/endpoints/profiler.js";
import { listBanners } from "../../src/api/endpoints/banners.js";
import { listEncryptionKeys } from "../../src/api/endpoints/encryption-keys.js";
import { listMessages } from "../../src/api/endpoints/messages.js";
import { listSubscriptions } from "../../src/api/endpoints/subscriptions.js";
import { getKmsConfig, getKmsHealth } from "../../src/api/endpoints/kms.js";
import { listFeatureFlags } from "../../src/api/endpoints/feature-flags.js";
import { getAuthSettings } from "../../src/api/endpoints/auth-settings.js";
import { getGitSettings } from "../../src/api/endpoints/git-settings.js";
import { listAiSettings } from "../../src/api/endpoints/ai-settings.js";
import { listWorkspaces } from "../../src/api/endpoints/workspaces.js";
import { listOutposts } from "../../src/api/endpoints/outposts.js";
import { listDatasetProviders } from "../../src/api/endpoints/dataset-providers.js";
import { listMacros } from "../../src/api/endpoints/macros.js";
import { listDashboardCategories } from "../../src/api/endpoints/dashboard-categories.js";
import { listTrustPolicies } from "../../src/api/endpoints/trust-policies.js";
import { listUsageGroups } from "../../src/api/endpoints/usage-groups.js";
import { listDatatypes } from "../../src/api/endpoints/datatypes.js";
import { listLakeDatasets } from "../../src/api/endpoints/lake-datasets.js";
import { listStorageLocations } from "../../src/api/endpoints/storage-locations.js";

const BASE = "https://mock.cribl.cloud";
const client = () => axios.create({ baseURL: BASE });

describe("Batch 1.1 - Group-scoped endpoints", () => {
  afterEach(() => nock.cleanAll());

  it("listCollectors", async () => {
    nock(BASE).get("/api/v1/m/default/collectors").reply(200, { items: [{ id: "c1" }] });
    const d = await listCollectors(client(), "default");
    expect(d.items[0].id).toBe("c1");
  });

  it("listConditions", async () => {
    nock(BASE).get("/api/v1/m/default/conditions").reply(200, { items: [{ id: "cond1" }] });
    const d = await listConditions(client(), "default");
    expect(d.items[0].id).toBe("cond1");
  });

  it("listExecutors", async () => {
    nock(BASE).get("/api/v1/m/default/executors").reply(200, { items: [{ id: "exec1" }] });
    const d = await listExecutors(client(), "default");
    expect(d.items[0].id).toBe("exec1");
  });

  it("listParquetSchemas", async () => {
    nock(BASE).get("/api/v1/m/default/lib/parquet-schemas").reply(200, { items: [{ id: "ps1" }] });
    const d = await listParquetSchemas(client(), "default");
    expect(d.items[0].id).toBe("ps1");
  });

  it("listProtobufLibs", async () => {
    nock(BASE).get("/api/v1/m/default/lib/protobuf-libraries").reply(200, { items: [{ id: "pb1" }] });
    const d = await listProtobufLibs(client(), "default");
    expect(d.items[0].id).toBe("pb1");
  });

  it("listHmacFunctions", async () => {
    nock(BASE).get("/api/v1/m/default/lib/hmac-functions").reply(200, { items: [{ id: "hmac1" }] });
    const d = await listHmacFunctions(client(), "default");
    expect(d.items[0].id).toBe("hmac1");
  });

  it("listSdsRules", async () => {
    nock(BASE).get("/api/v1/m/default/lib/sds-rules").reply(200, { items: [{ id: "sds1" }] });
    const d = await listSdsRules(client(), "default");
    expect(d.items[0].id).toBe("sds1");
  });

  it("listSdsRulesets", async () => {
    nock(BASE).get("/api/v1/m/default/lib/sds-rulesets").reply(200, { items: [{ id: "sdsr1" }] });
    const d = await listSdsRulesets(client(), "default");
    expect(d.items[0].id).toBe("sdsr1");
  });

  it("listAppscopeConfigs", async () => {
    nock(BASE).get("/api/v1/m/default/lib/appscope-configs").reply(200, { items: [{ id: "as1" }] });
    const d = await listAppscopeConfigs(client(), "default");
    expect(d.items[0].id).toBe("as1");
  });

  it("runPreview", async () => {
    nock(BASE).post("/api/v1/m/default/preview").reply(200, { events: [] });
    const d = await runPreview(client(), "default", { input: "test" });
    expect(d).toHaveProperty("events");
  });

  it("getLogger", async () => {
    nock(BASE).get("/api/v1/m/default/system/logger").reply(200, { level: "info" });
    const d = await getLogger(client(), "default");
    expect(d).toHaveProperty("level");
  });

  it("setLogger", async () => {
    nock(BASE).patch("/api/v1/m/default/system/logger").reply(200, { level: "debug" });
    const d = await setLogger(client(), "default", { level: "debug" });
    expect(d).toHaveProperty("level");
  });

  it("getProfiler", async () => {
    nock(BASE).get("/api/v1/m/default/system/profiler").reply(200, { active: false });
    const d = await getProfiler(client(), "default");
    expect(d).toHaveProperty("active");
  });

  it("startProfiler", async () => {
    nock(BASE).post("/api/v1/m/default/system/profiler").reply(200, { active: true });
    const d = await startProfiler(client(), "default");
    expect(d).toHaveProperty("active");
  });
});

describe("Batch 1.2 - Global endpoints", () => {
  afterEach(() => nock.cleanAll());

  it("listBanners", async () => {
    nock(BASE).get("/api/v1/system/banners").reply(200, { items: [{ id: "b1" }] });
    const d = await listBanners(client());
    expect(d.items[0].id).toBe("b1");
  });

  it("listEncryptionKeys", async () => {
    nock(BASE).get("/api/v1/system/keys").reply(200, { items: [{ id: "k1" }] });
    const d = await listEncryptionKeys(client());
    expect(d.items[0].id).toBe("k1");
  });

  it("listMessages", async () => {
    nock(BASE).get("/api/v1/system/messages").reply(200, { items: [{ id: "m1" }] });
    const d = await listMessages(client());
    expect(d.items[0].id).toBe("m1");
  });

  it("listSubscriptions", async () => {
    nock(BASE).get("/api/v1/system/subscriptions").reply(200, { items: [{ id: "s1" }] });
    const d = await listSubscriptions(client());
    expect(d.items[0].id).toBe("s1");
  });

  it("getKmsConfig", async () => {
    nock(BASE).get("/api/v1/security/kms/config").reply(200, { provider: "aws" });
    const d = await getKmsConfig(client());
    expect(d).toHaveProperty("provider");
  });

  it("getKmsHealth", async () => {
    nock(BASE).get("/api/v1/security/kms/health").reply(200, { healthy: true });
    const d = await getKmsHealth(client());
    expect(d).toHaveProperty("healthy");
  });

  it("listFeatureFlags", async () => {
    nock(BASE).get("/api/v1/settings/features").reply(200, { items: [{ id: "ff1" }] });
    const d = await listFeatureFlags(client());
    expect(d.items[0].id).toBe("ff1");
  });

  it("getAuthSettings", async () => {
    nock(BASE).get("/api/v1/system/settings/auth").reply(200, { type: "local" });
    const d = await getAuthSettings(client());
    expect(d).toHaveProperty("type");
  });

  it("getGitSettings", async () => {
    nock(BASE).get("/api/v1/system/settings/git-settings").reply(200, { enabled: true });
    const d = await getGitSettings(client());
    expect(d).toHaveProperty("enabled");
  });

  it("listAiSettings", async () => {
    nock(BASE).get("/api/v1/ai/settings/features").reply(200, { items: [{ id: "ai1" }] });
    const d = await listAiSettings(client());
    expect(d.items[0].id).toBe("ai1");
  });

  it("listWorkspaces", async () => {
    nock(BASE).get("/api/v1/workspaces").reply(200, { items: [{ id: "ws1" }] });
    const d = await listWorkspaces(client());
    expect(d.items[0].id).toBe("ws1");
  });

  it("listOutposts", async () => {
    nock(BASE).get("/api/v1/master/outposts").reply(200, { items: [{ id: "op1" }] });
    const d = await listOutposts(client());
    expect(d.items[0].id).toBe("op1");
  });
});

describe("Batch 1.3 - Search-scoped endpoints", () => {
  afterEach(() => nock.cleanAll());

  it("listDatasetProviders", async () => {
    nock(BASE).get("/api/v1/m/default_search/search/dataset-providers").reply(200, { items: [{ id: "dp1" }] });
    const d = await listDatasetProviders(client());
    expect(d.items[0].id).toBe("dp1");
  });

  it("listMacros", async () => {
    nock(BASE).get("/api/v1/m/default_search/search/macros").reply(200, { items: [{ id: "mac1" }] });
    const d = await listMacros(client());
    expect(d.items[0].id).toBe("mac1");
  });

  it("listDashboardCategories", async () => {
    nock(BASE).get("/api/v1/m/default_search/search/dashboard-categories").reply(200, { items: [{ id: "dc1" }] });
    const d = await listDashboardCategories(client());
    expect(d.items[0].id).toBe("dc1");
  });

  it("listTrustPolicies", async () => {
    nock(BASE).get("/api/v1/m/default_search/search/trust-policies").reply(200, { items: [{ id: "tp1" }] });
    const d = await listTrustPolicies(client());
    expect(d.items[0].id).toBe("tp1");
  });

  it("listUsageGroups", async () => {
    nock(BASE).get("/api/v1/m/default_search/search/usage-groups").reply(200, { items: [{ id: "ug1" }] });
    const d = await listUsageGroups(client());
    expect(d.items[0].id).toBe("ug1");
  });

  it("listDatatypes", async () => {
    nock(BASE).get("/api/v1/m/default_search/search/datatypes").reply(200, { items: [{ id: "dt1" }] });
    const d = await listDatatypes(client());
    expect(d.items[0].id).toBe("dt1");
  });
});

describe("Batch 3 - Lake endpoints", () => {
  afterEach(() => nock.cleanAll());

  it("listLakeDatasets", async () => {
    nock(BASE).get("/api/v1/products/lake/lakes/lake1/datasets").reply(200, { items: [{ id: "ld1" }] });
    const d = await listLakeDatasets(client(), "lake1");
    expect(d.items[0].id).toBe("ld1");
  });

  it("listStorageLocations", async () => {
    nock(BASE).get("/api/v1/products/lake/lakes/lake1/storage-locations").reply(200, { items: [{ id: "sl1" }] });
    const d = await listStorageLocations(client(), "lake1");
    expect(d.items[0].id).toBe("sl1");
  });
});
