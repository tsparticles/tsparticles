import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

export interface SessionEntry {
  clientIp: string;
  lastActivity: number;
  server: McpServer;
  transport: StreamableHTTPServerTransport;
}

export interface StartHttpServerParams {
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
  createMcpServer: () => McpServer;
  /**
   * Network interface to bind. Defaults to loopback; non-loopback hosts
   * require an authentication token.
   */
  host?: string;
  port: number;
  /**
   * Optional list of trusted reverse proxy IP addresses (e.g. nginx or
   * an internal load balancer). When the direct peer matches this list,
   * the client IP is resolved from `X-Forwarded-For` by walking from
   * right to left and skipping trusted proxy hops. Configure every proxy
   * hop and make sure the edge proxy overwrites or appends the connecting
   * client address; never trust a forwarding header from an untrusted
   * peer. Falls back to the socket address when the peer is untrusted or
   * the header is absent.
   */
  trustedProxies?: string[];
}
