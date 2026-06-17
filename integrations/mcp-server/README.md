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

| Tool               | Description                                                                     |
|--------------------|---------------------------------------------------------------------------------|
| `suggest_plugins`  | Given a tsParticles options object, returns the npm packages and imports needed |
| `list_packages`    | Lists available packages, optionally filtered by category or search query       |
| `get_package_info` | Returns detailed info about a specific package                                  |

### Resources

| URI                           | Description                 |
|-------------------------------|-----------------------------|
| `tsparticles://packages`      | Complete package catalog    |
| `tsparticles://options/guide` | Options structure reference |
| `tsparticles://bundles`       | Bundle selection guide      |

### Prompt

| Name               | Description                                                       |
|--------------------|-------------------------------------------------------------------|
| `generate-options` | Generates tsParticles options from a natural language description |

## Deploy (remote HTTP)

The server can also run as an HTTP endpoint, accessible by any MCP client that supports SSE.

### Option 1: Direct access (no tunnel)

```bash
# Start on port 3000
npx @tsparticles/mcp-server --port 3000
# Health check: http://localhost:3000/health
# MCP endpoint:  http://localhost:3000/mcp
```

### Option 2: Docker

```bash
# Build and start
docker compose up -d

# Or with Cloudflare Tunnel for public HTTPS access
docker compose --profile tunnel up
```

This prints a temporary URL like `https://random.trycloudflare.com`. Configure your MCP client with `https://random.trycloudflare.com/mcp` as the endpoint.

### Option 3: Docker + Synology Reverse Proxy

If you have a Synology NAS:

1. Build the image and start the container:

```bash
docker compose up -d
```

2. On DSM, go to **Control Panel > Application Portal > Reverse Proxy** and add:

| Field                | Value                       |
|----------------------|-----------------------------|
| Source protocol      | HTTPS                       |
| Source hostname      | your-nas-domain.example.com |
| Source port          | 8443                        |
| Enable HSTS          | yes                         |
| Destination protocol | HTTP                        |
| Destination hostname | localhost                   |
| Destination port     | 3000                        |

3. Configure your MCP client with `https://your-nas-domain.example.com:8443/mcp`.

### Option 4: Docker + Cloudflare Tunnel (permanent)

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
