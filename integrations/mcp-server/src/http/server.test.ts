import { afterAll, describe, expect, it } from "vitest";
import type { AddressInfo } from "node:net";
import type { Server as HttpServer } from "node:http";
import { MAX_HTTP_SESSIONS_PER_CLIENT } from "./constants.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { startHttpServer } from "./server.js";

const MAX_REQUESTS_PER_WINDOW = 120,
  HTTP_STATUS_OK = 200,
  HTTP_STATUS_TOO_MANY_REQUESTS = 429,
  HTTP_STATUS_UNAUTHORIZED = 401,
  RESULT_LAST_INDEX = -1;

describe("HTTP server", () => {
  let server: HttpServer | undefined;

  afterAll(async () => {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server?.close(err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  });

  it("rate-limits the /health endpoint after the per-IP window is exhausted", async () => {
    server = await startHttpServer({
      port: 0,
      createMcpServer: () => ({}) as McpServer,
    });

    const { port } = server.address() as AddressInfo,
      baseUrl = `http://127.0.0.1:${port}`,
      results: number[] = [];

    // Send one more request than the per-IP window allows: every request
    // before the transition must succeed, then the limiter must trip.
    while (results.length <= MAX_REQUESTS_PER_WINDOW) {
      const response = await fetch(`${baseUrl}/health`);

      results.push(response.status);

      if (response.status === HTTP_STATUS_TOO_MANY_REQUESTS) {
        break;
      }
    }

    expect(results.at(RESULT_LAST_INDEX)).toBe(HTTP_STATUS_TOO_MANY_REQUESTS);
    expect(results.filter(status => status === HTTP_STATUS_OK)).toHaveLength(MAX_REQUESTS_PER_WINDOW);
  });

  it("limits active MCP sessions per client IP", async () => {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server?.close(err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }

    server = await startHttpServer({
      port: 0,
      trustedProxies: ["::ffff:127.0.0.1", "127.0.0.1"],
      createMcpServer: () => new McpServer({ name: "test-server", version: "1.0.0" }, { capabilities: {} }),
    });

    const { port } = server.address() as AddressInfo,
      baseUrl = `http://127.0.0.1:${port}/mcp`,
      sessions: string[] = [],
      initializeRequest = {
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-06-18",
          capabilities: {},
          clientInfo: { name: "test-client", version: "1.0.0" },
        },
      };

    for (let index = 0; index < MAX_HTTP_SESSIONS_PER_CLIENT; index++) {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
          "X-Forwarded-For": `198.51.100.${index + 1}, 203.0.113.25`,
        },
        body: JSON.stringify(initializeRequest),
      });

      expect(response.status).toBe(HTTP_STATUS_OK);

      const sessionId = response.headers.get("mcp-session-id");

      expect(sessionId).toBeTruthy();

      if (sessionId) {
        sessions.push(sessionId);
      }
    }

    const deniedResponse = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        "X-Forwarded-For": "198.51.100.250, 203.0.113.25",
      },
      body: JSON.stringify(initializeRequest),
    });

    expect(deniedResponse.status).toBe(HTTP_STATUS_TOO_MANY_REQUESTS);

    for (const sessionId of sessions) {
      await fetch(baseUrl, { method: "DELETE", headers: { "mcp-session-id": sessionId } });
    }
  });

  it("does not let failed authentication attempts exhaust the authenticated request budget", async () => {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server?.close(err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }

    server = await startHttpServer({
      port: 0,
      authToken: "test-secret",
      createMcpServer: () => new McpServer({ name: "test-server", version: "1.0.0" }, { capabilities: {} }),
    });

    const { port } = server.address() as AddressInfo,
      baseUrl = `http://127.0.0.1:${port}/mcp`,
      initializeRequest = {
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-06-18",
          capabilities: {},
          clientInfo: { name: "test-client", version: "1.0.0" },
        },
      };

    for (let index = 0; index < MAX_REQUESTS_PER_WINDOW; index++) {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
          Authorization: "Bearer wrong-secret",
        },
        body: JSON.stringify(initializeRequest),
      });

      expect(response.status).toBe(HTTP_STATUS_UNAUTHORIZED);
    }

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        Authorization: "Bearer test-secret",
      },
      body: JSON.stringify(initializeRequest),
    });

    expect(response.status).toBe(HTTP_STATUS_OK);

    const sessionId = response.headers.get("mcp-session-id");

    if (sessionId) {
      await fetch(baseUrl, {
        method: "DELETE",
        headers: { "mcp-session-id": sessionId, Authorization: "Bearer test-secret" },
      });
    }
  });

  it("requires authentication when binding beyond loopback", async () => {
    await expect(
      startHttpServer({
        port: 0,
        host: "0.0.0.0",
        createMcpServer: () => new McpServer({ name: "test-server", version: "1.0.0" }, { capabilities: {} }),
      }),
    ).rejects.toThrow("An auth token is required");
  });
});
