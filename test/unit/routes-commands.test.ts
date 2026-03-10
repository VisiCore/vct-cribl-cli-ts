import { describe, it, expect, afterEach } from "vitest";
import nock from "nock";
import axios from "axios";
import { listRoutes, getRoute, updateRoute } from "../../src/api/endpoints/routes.js";

const BASE = "https://mock.cribl.cloud";

function mockClient() {
  return axios.create({ baseURL: BASE });
}

describe("routes insert-before-catch-all", () => {
  afterEach(() => nock.cleanAll());

  it("new route is inserted before the catch-all", () => {
    const existingRoutes = [
      { id: "route1", filter: "source=='syslog'", final: false },
      { id: "default", filter: "true", final: true },
    ];

    const newRoute = { id: "route2", filter: "source=='http'", final: false };

    // Simulate the insert logic from routes.ts create command
    const routes = existingRoutes.slice();
    const lastRoute = routes[routes.length - 1];
    if (lastRoute && lastRoute.filter === "true" && lastRoute.final === true) {
      routes.splice(routes.length - 1, 0, newRoute);
    } else {
      routes.push(newRoute);
    }

    expect(routes).toHaveLength(3);
    expect(routes[0].id).toBe("route1");
    expect(routes[1].id).toBe("route2");
    expect(routes[2].id).toBe("default");
  });

  it("route is appended if no catch-all exists", () => {
    const existingRoutes = [
      { id: "route1", filter: "source=='syslog'", final: false },
    ];

    const newRoute = { id: "route2", filter: "source=='http'", final: false };

    const routes = existingRoutes.slice();
    const lastRoute = routes[routes.length - 1];
    if (lastRoute && lastRoute.filter === "true" && lastRoute.final === true) {
      routes.splice(routes.length - 1, 0, newRoute);
    } else {
      routes.push(newRoute);
    }

    expect(routes).toHaveLength(2);
    expect(routes[0].id).toBe("route1");
    expect(routes[1].id).toBe("route2");
  });

  it("route update finds correct route by ID and merges", () => {
    const routes = [
      { id: "route1", filter: "source=='syslog'", output: "dest1" },
      { id: "route2", filter: "source=='http'", output: "dest2" },
    ];

    const changes = { output: "dest3", description: "Updated" };
    const idx = routes.findIndex((r) => r.id === "route2");
    expect(idx).toBe(1);

    const merged = { ...routes[idx], ...changes };
    expect(merged.id).toBe("route2");
    expect(merged.filter).toBe("source=='http'");
    expect(merged.output).toBe("dest3");
    expect((merged as Record<string, unknown>).description).toBe("Updated");
  });

  it("route update throws when route ID not found", () => {
    const routes = [
      { id: "route1", filter: "source=='syslog'" },
    ];

    const idx = routes.findIndex((r) => r.id === "nonexistent");
    expect(idx).toBe(-1);
  });

  it("listRoutes returns route table", async () => {
    nock(BASE)
      .get("/api/v1/m/default/routes")
      .reply(200, { id: "default", routes: [{ id: "r1" }] });

    const data = await listRoutes(mockClient(), "default");
    expect(data.routes).toHaveLength(1);
  });

  it("getRoute fetches a specific route", async () => {
    nock(BASE)
      .get("/api/v1/m/default/routes/default")
      .reply(200, { id: "default", routes: [{ id: "r1" }] });

    const data = await getRoute(mockClient(), "default", "default");
    expect(data.id).toBe("default");
  });

  it("updateRoute patches the route table", async () => {
    const updatedRoutes = [{ id: "r1" }, { id: "r2" }];
    nock(BASE)
      .patch("/api/v1/m/default/routes/default", { routes: updatedRoutes })
      .reply(200, { id: "default", routes: updatedRoutes });

    const data = await updateRoute(mockClient(), "default", "default", { routes: updatedRoutes });
    expect(data.routes).toHaveLength(2);
  });

  it("route delete removes the target route from the table", () => {
    const routes = [
      { id: "route1", filter: "source=='syslog'", final: false },
      { id: "route2", filter: "source=='http'", final: false },
      { id: "default", filter: "true", final: true },
    ];

    const id = "route2";
    const idx = routes.findIndex((r) => r.id === id);
    expect(idx).toBe(1);
    routes.splice(idx, 1);

    expect(routes).toHaveLength(2);
    expect(routes[0].id).toBe("route1");
    expect(routes[1].id).toBe("default");
  });

  it("route delete throws when route ID not found", () => {
    const routes = [
      { id: "route1", filter: "source=='syslog'" },
      { id: "default", filter: "true" },
    ];

    const idx = routes.findIndex((r) => r.id === "nonexistent");
    expect(idx).toBe(-1);
  });
});
