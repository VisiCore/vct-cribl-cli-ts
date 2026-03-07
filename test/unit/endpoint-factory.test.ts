import { describe, it, expect, afterEach } from "vitest";
import nock from "nock";
import axios from "axios";
import { createEndpoints } from "../../src/api/endpoint-factory.js";

const BASE = "https://mock.cribl.cloud";
const client = () => axios.create({ baseURL: BASE });

describe("endpoint-factory", () => {
  afterEach(() => nock.cleanAll());

  describe("group scope", () => {
    const endpoints = createEndpoints({ scope: "group", path: "lib/parsers" });

    it("list", async () => {
      nock(BASE).get("/api/v1/m/default/lib/parsers").reply(200, { items: [{ id: "p1" }] });
      const data = await endpoints.list(client(), "default");
      expect(data.items).toHaveLength(1);
      expect(data.items[0].id).toBe("p1");
    });

    it("get (unwraps items[0])", async () => {
      nock(BASE).get("/api/v1/m/default/lib/parsers/p1").reply(200, { items: [{ id: "p1", name: "test" }] });
      const data = await endpoints.get(client(), "default", "p1");
      expect(data.id).toBe("p1");
      expect(data.name).toBe("test");
    });

    it("create", async () => {
      nock(BASE).post("/api/v1/m/default/lib/parsers", { id: "p2" }).reply(200, { id: "p2" });
      const data = await endpoints.create(client(), "default", { id: "p2" });
      expect(data.id).toBe("p2");
    });

    it("update", async () => {
      nock(BASE).patch("/api/v1/m/default/lib/parsers/p1", { name: "updated" }).reply(200, { id: "p1", name: "updated" });
      const data = await endpoints.update(client(), "default", "p1", { name: "updated" });
      expect(data.name).toBe("updated");
    });

    it("delete", async () => {
      nock(BASE).delete("/api/v1/m/default/lib/parsers/p1").reply(200);
      await expect(endpoints.delete(client(), "default", "p1")).resolves.toBeUndefined();
    });

    it("encodes group name", async () => {
      nock(BASE).get("/api/v1/m/my%20group/lib/parsers").reply(200, { items: [] });
      const data = await endpoints.list(client(), "my group");
      expect(data.items).toHaveLength(0);
    });
  });

  describe("global scope", () => {
    const endpoints = createEndpoints({ scope: "global", path: "system/banners" });

    it("list", async () => {
      nock(BASE).get("/api/v1/system/banners").reply(200, { items: [{ id: "b1" }] });
      const data = await endpoints.list(client(), "_global_");
      expect(data.items[0].id).toBe("b1");
    });

    it("get", async () => {
      nock(BASE).get("/api/v1/system/banners/b1").reply(200, { items: [{ id: "b1" }] });
      const data = await endpoints.get(client(), "_global_", "b1");
      expect(data.id).toBe("b1");
    });

    it("create", async () => {
      nock(BASE).post("/api/v1/system/banners").reply(200, { id: "b2" });
      const data = await endpoints.create(client(), "_global_", { id: "b2" });
      expect(data.id).toBe("b2");
    });

    it("update", async () => {
      nock(BASE).patch("/api/v1/system/banners/b1").reply(200, { id: "b1", text: "new" });
      const data = await endpoints.update(client(), "_global_", "b1", { text: "new" });
      expect(data.text).toBe("new");
    });

    it("delete", async () => {
      nock(BASE).delete("/api/v1/system/banners/b1").reply(200);
      await expect(endpoints.delete(client(), "_global_", "b1")).resolves.toBeUndefined();
    });
  });

  describe("search scope", () => {
    const endpoints = createEndpoints({ scope: "search", path: "macros" });

    it("list", async () => {
      nock(BASE).get("/api/v1/m/default_search/search/macros").reply(200, { items: [{ id: "m1" }] });
      const data = await endpoints.list(client(), "default_search");
      expect(data.items[0].id).toBe("m1");
    });

    it("get", async () => {
      nock(BASE).get("/api/v1/m/default_search/search/macros/m1").reply(200, { items: [{ id: "m1" }] });
      const data = await endpoints.get(client(), "default_search", "m1");
      expect(data.id).toBe("m1");
    });

    it("create", async () => {
      nock(BASE).post("/api/v1/m/default_search/search/macros").reply(200, { id: "m2" });
      const data = await endpoints.create(client(), "default_search", { id: "m2" });
      expect(data.id).toBe("m2");
    });

    it("delete", async () => {
      nock(BASE).delete("/api/v1/m/default_search/search/macros/m1").reply(200);
      await expect(endpoints.delete(client(), "default_search", "m1")).resolves.toBeUndefined();
    });
  });

  describe("lake scope", () => {
    const endpoints = createEndpoints({ scope: "lake", path: "datasets" });

    it("list", async () => {
      nock(BASE).get("/api/v1/products/lake/lakes/lake1/datasets").reply(200, { items: [{ id: "ds1" }] });
      const data = await endpoints.list(client(), "lake1");
      expect(data.items[0].id).toBe("ds1");
    });

    it("get", async () => {
      nock(BASE).get("/api/v1/products/lake/lakes/lake1/datasets/ds1").reply(200, { items: [{ id: "ds1" }] });
      const data = await endpoints.get(client(), "lake1", "ds1");
      expect(data.id).toBe("ds1");
    });

    it("create", async () => {
      nock(BASE).post("/api/v1/products/lake/lakes/lake1/datasets").reply(200, { id: "ds2" });
      const data = await endpoints.create(client(), "lake1", { id: "ds2" });
      expect(data.id).toBe("ds2");
    });

    it("delete", async () => {
      nock(BASE).delete("/api/v1/products/lake/lakes/lake1/datasets/ds1").reply(200);
      await expect(endpoints.delete(client(), "lake1", "ds1")).resolves.toBeUndefined();
    });
  });
});
