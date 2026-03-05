import { describe, it, expect, afterEach } from "vitest";
import nock from "nock";
import axios from "axios";
import { resolveGroup } from "../../src/utils/group-resolver.js";

const BASE = "https://mock.cribl.cloud";

describe("resolveGroup", () => {
  afterEach(() => nock.cleanAll());

  it("should return provided group if specified", async () => {
    const client = axios.create({ baseURL: BASE });
    const group = await resolveGroup(client, "mygroup");
    expect(group).toBe("mygroup");
  });

  it("should auto-detect first group if not specified", async () => {
    nock(BASE)
      .get("/api/v1/master/groups")
      .reply(200, { items: [{ id: "prod" }, { id: "staging" }] });

    const client = axios.create({ baseURL: BASE });
    const group = await resolveGroup(client);
    expect(group).toBe("prod");
  });

  it("should fallback to default if no groups exist", async () => {
    nock(BASE)
      .get("/api/v1/master/groups")
      .reply(200, { items: [] });

    const client = axios.create({ baseURL: BASE });
    const group = await resolveGroup(client);
    expect(group).toBe("default");
  });
});
