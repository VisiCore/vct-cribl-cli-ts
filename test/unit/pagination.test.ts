import { describe, it, expect, afterEach } from "vitest";
import nock from "nock";
import axios from "axios";
import { paginatedGet } from "../../src/utils/pagination.js";

const BASE = "https://mock.cribl.cloud";

describe("paginatedGet", () => {
  afterEach(() => nock.cleanAll());

  it("should fetch a single page by default", async () => {
    nock(BASE)
      .get("/api/v1/items")
      .query({ offset: 0, limit: 100 })
      .reply(200, { items: [{ id: "1" }, { id: "2" }] });

    const client = axios.create({ baseURL: BASE });
    const result = await paginatedGet(client, "/api/v1/items");
    expect(result.items).toHaveLength(2);
  });

  it("should auto-paginate with --all", async () => {
    nock(BASE)
      .get("/api/v1/items")
      .query({ offset: 0, limit: 2 })
      .reply(200, { items: [{ id: "1" }, { id: "2" }] });

    nock(BASE)
      .get("/api/v1/items")
      .query({ offset: 2, limit: 2 })
      .reply(200, { items: [{ id: "3" }] });

    const client = axios.create({ baseURL: BASE });
    const result = await paginatedGet(client, "/api/v1/items", { all: true, limit: 2 });
    expect(result.items).toHaveLength(3);
  });
});
