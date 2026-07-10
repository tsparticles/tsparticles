import type { Server as McpServer } from "@modelcontextprotocol/sdk/server/index.js";
import type { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

export interface SessionEntry {
  server: McpServer;
  transport: StreamableHTTPServerTransport;
  lastActivity: number;
}

export interface StartHttpServerParams {
  port: number;
  allowedOrigins?: string[];
  /**
   * Optional bearer token. When set, every request to `/mcp` must carry
   * an `Authorization: Bearer <token>` header matching this value.
   * Intended for deployments that expose the server beyond localhost
   * (e.g. via a tunnel or reverse proxy) where the Origin check alone
   * is not a meaningful access control (non-browser clients don't send
   * an Origin header at all).
   */
  authToken?: string;
  packageVersion: string;
  createMcpServer: () => McpServer;
}
