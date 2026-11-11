# @tsparticles/mcp-server

[MCP (Model Context Protocol)](https://modelcontextprotocol.io) server for [tsParticles](https://particles.js.org). Lets AI assistants inspect package catalogs, suggest required plugins and bundles from options, and generate tsParticles configurations from natural language.

## Quick Start (local)

```bash
npx @tsparticles/mcp-server
```

The server runs on stdio and can be connected to any MCP-compatible client:

- [Claude Desktop](https://claude.ai/download)
- [Cursor](https://cursor.sh)
- [VS Code with GitHub Copilot](https://code.visualstudio.com/docs/copilot/chat/mcp)
- Any custom MCP client

### Claude Desktop configuration

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "tsparticles": {
      "command": "npx",
      "args": ["@tsparticles/mcp-server"]
    }
  }
}
```

### Tools

| Tool               | Description                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| `suggest_plugins`  | Given a tsParticles options object, returns the npm packages and imports needed        |
| `list_packages`    | Lists available packages, optionally filtered by category or search query              |
| `get_package_info` | Returns detailed info about a specific package                                         |
| `diagnose_issues`  | Analyzes options for configuration problems and performance issues                     |
| `generate_code`    | Generate complete code from a natural language description with smart bundle selection |

### Resources

| URI                           | Description                 |
| ----------------------------- | --------------------------- |
| `tsparticles://packages`      | Complete package catalog    |
| `tsparticles://options/guide` | Options structure reference |
| `tsparticles://bundles`       | Bundle selection guide      |

### Prompt

| Name               | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `generate-options` | Generates tsParticles options from a natural language description |

## Deploy (remote HTTP)

The server can also run as an HTTP endpoint, accessible by any MCP client that supports SSE.

HTTP mode binds to `127.0.0.1` by default. Binding to any other interface requires an auth token;
startup fails if a non-loopback host is configured without one. Use HTTPS at a trusted reverse
proxy or tunnel when connecting over an untrusted network.

### Authentication

Set a bearer token to require `Authorization: Bearer <token>` on every request to `/mcp` when
binding beyond loopback:

```bash
export MCP_AUTH_TOKEN="$(openssl rand -hex 32)"
npx @tsparticles/mcp-server --port 3000 --host 0.0.0.0 --auth-token "$MCP_AUTH_TOKEN"
```

Configure your MCP client to send the same value in the `Authorization: Bearer <token>` header.
The exported `MCP_AUTH_TOKEN` remains available in your shell for copying into the client
configuration. On loopback, no token is required; origin checks still restrict browser-originated
requests, but are not authentication and do not protect non-browser clients.

### Rate limiting

MCP traffic and unauthenticated requests have separate in-memory rate limits, so failed
authentication attempts cannot consume the MCP request budget. The server also limits each client
IP to 10 sessions and caps the process at 500 sessions. These controls are process-local and do not
replace rate limiting at a reverse proxy or CDN.

When running behind a reverse proxy, pass each proxy's IP with `--trusted-proxy <IP>` (repeat the
flag for multiple hops) or set `MCP_TRUSTED_PROXIES` to a comma-separated list. The edge proxy must
overwrite or append the connecting client IP to `X-Forwarded-For`; the server walks the trusted
proxy chain from right to left to resolve the client address.

### Option 1: Direct access (no tunnel)

```bash
# Start on port 3000 (loopback only)
npx @tsparticles/mcp-server --port 3000
# Health check: http://localhost:3000/health
# MCP endpoint:  http://localhost:3000/mcp
```

### Option 2: Docker (pre-built image)

The container listens on all interfaces, so provide a token:

```bash
export MCP_AUTH_TOKEN="$(openssl rand -hex 32)"
docker run -d -p 3000:3000 -e MCP_AUTH_TOKEN tsparticles/mcp-server
```

### Option 3: Docker Compose (build from source)

```bash
# Set a token, then build and start
export MCP_AUTH_TOKEN="$(openssl rand -hex 32)"
docker compose up -d

# Or with Cloudflare Tunnel for public HTTPS access
docker compose --profile tunnel up
```

`MCP_AUTH_TOKEN` is required by Compose because the container binds to all interfaces. Set it in
your environment or in a `.env` file next to `docker-compose.yml` before starting the server or
the tunnel. If all traffic arrives through a reverse proxy, set `MCP_TRUSTED_PROXIES` to the
comma-separated IP addresses of every trusted proxy hop so rate limits and session quotas use the
real client address. The edge proxy must overwrite or append the connecting client IP to
`X-Forwarded-For`.

This prints a temporary URL like `https://random.trycloudflare.com`. Configure your MCP client with `https://random.trycloudflare.com/mcp` as the endpoint.

### Option 4: Docker + Synology Reverse Proxy

If you have a Synology NAS:

1. Build the image and start the container:

```bash
docker compose up -d
```

2. On DSM, go to **Control Panel > Application Portal > Reverse Proxy** and add:

| Field                | Value                       |
| -------------------- | --------------------------- |
| Source protocol      | HTTPS                       |
| Source hostname      | your-nas-domain.example.com |
| Source port          | 8443                        |
| Enable HSTS          | yes                         |
| Destination protocol | HTTP                        |
| Destination hostname | localhost                   |
| Destination port     | 3000                        |

3. Configure your MCP client with `https://your-nas-domain.example.com:8443/mcp`.

### Option 5: Docker + Cloudflare Tunnel (permanent)

For a permanent URL (instead of the random `trycloudflare.com`):

1. Install `cloudflared` and log in:

```bash
docker run cloudflare/cloudflared tunnel login
```

2. Create a tunnel and route your domain:

```bash
cloudflared tunnel create tsparticles-mcp
cloudflared tunnel route dns tsparticles-mcp mcp.yourdomain.com
```

3. Create a config file:

```yaml
# config.yml
tunnel: tsparticles-mcp
credentials-file: /root/.cloudflared/tunnel.json
ingress:
  - hostname: mcp.yourdomain.com
    service: http://localhost:3000
  - service: http_status:404
```

4. Run:

```bash
docker compose up -d mcp-server
cloudflared tunnel run tsparticles-mcp
```

Your MCP endpoint will be `https://mcp.yourdomain.com/mcp`.

## Client endpoint configuration

When connecting to a remote HTTP server, use the endpoint URL with `/mcp` path:

```
https://your-server.example.com/mcp
```

## Build from source

```bash
pnpm install
pnpm run build
pnpm run start        # stdio mode
pnpm run start:http   # HTTP mode on port 3000
```
