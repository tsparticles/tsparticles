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
  /**
   * Optional list of trusted reverse proxy IP addresses (e.g. the IP of
   * your nginx/Cloudflare/ALB).  When the direct peer matches one of
   * these addresses the rate-limiter extracts the client IP from the
   * first value of the `X-Forwarded-For` header instead of using
   * `req.socket.remoteAddress` (which would always show the proxy IP).
   * Falls back to the socket address when the peer is not in this list
   * or when the header is absent.  If you terminate TLS at a reverse
   * proxy you should also set this so that origin checks function
   * correctly.
   */
  trustedProxies?: string[];
  packageVersion: string;
  createMcpServer: () => McpServer;
}
