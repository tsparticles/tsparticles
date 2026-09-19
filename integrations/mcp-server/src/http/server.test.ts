import { afterAll, describe, expect, it } from "vitest";
import type { AddressInfo } from "node:net";
import type { Server as HttpServer } from "node:http";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { startHttpServer } from "./server.js";

const MAX_REQUESTS_PER_WINDOW = 120,
  HTTP_STATUS_OK = 200,
  HTTP_STATUS_TOO_MANY_REQUESTS = 429,
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
});
