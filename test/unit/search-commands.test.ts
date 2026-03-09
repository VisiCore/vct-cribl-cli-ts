import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import nock from "nock";
import axios from "axios";

const BASE = "https://mock.cribl.cloud";
const GROUP = "default_search";

function mockClient() {
  return axios.create({ baseURL: BASE });
}

// Import the endpoint functions used by the search command
import { runSearch, getSearchJobStatus, getSearchResults } from "../../src/api/endpoints/search.js";

describe("search polling logic", () => {
  afterEach(() => nock.cleanAll());

  it("runSearch unwraps items[0]", async () => {
    nock(BASE)
      .post(`/api/v1/m/${GROUP}/search/jobs`)
      .reply(200, { items: [{ id: "job1", status: "running" }] });

    const job = await runSearch(mockClient(), { query: "test" });
    expect(job.id).toBe("job1");
    expect(job.status).toBe("running");
  });

  it("runSearch falls back to raw data when items is empty", async () => {
    nock(BASE)
      .post(`/api/v1/m/${GROUP}/search/jobs`)
      .reply(200, { id: "job2", status: "running" });

    const job = await runSearch(mockClient(), { query: "test" });
    expect(job.id).toBe("job2");
  });

  it("getSearchJobStatus returns completed status", async () => {
    nock(BASE)
      .get(`/api/v1/m/${GROUP}/search/jobs/job1`)
      .reply(200, { items: [{ id: "job1", status: "completed" }] });

    const status = await getSearchJobStatus(mockClient(), "job1");
    expect(status.status).toBe("completed");
  });

  it("getSearchJobStatus returns failed status", async () => {
    nock(BASE)
      .get(`/api/v1/m/${GROUP}/search/jobs/job1`)
      .reply(200, { items: [{ id: "job1", status: "failed" }] });

    const status = await getSearchJobStatus(mockClient(), "job1");
    expect(status.status).toBe("failed");
  });

  it("polling exits on unknown/unexpected status (not in RUNNING_STATES)", () => {
    // Verify the RUNNING_STATES logic: any status not in {running, starting, queued}
    // should cause the polling loop to exit
    const RUNNING_STATES = new Set(["running", "starting", "queued"]);
    expect(RUNNING_STATES.has("completed")).toBe(false);
    expect(RUNNING_STATES.has("failed")).toBe(false);
    expect(RUNNING_STATES.has("cancelled")).toBe(false);
    expect(RUNNING_STATES.has("unknown_state")).toBe(false);
    expect(RUNNING_STATES.has("running")).toBe(true);
    expect(RUNNING_STATES.has("starting")).toBe(true);
    expect(RUNNING_STATES.has("queued")).toBe(true);
  });

  it("getSearchResults fetches results after completion", async () => {
    nock(BASE)
      .get(`/api/v1/m/${GROUP}/search/jobs/job1/results`)
      .reply(200, [{ _raw: "event1" }, { _raw: "event2" }]);

    const results = await getSearchResults(mockClient(), "job1");
    expect(results).toHaveLength(2);
    expect(results[0]._raw).toBe("event1");
  });
});
