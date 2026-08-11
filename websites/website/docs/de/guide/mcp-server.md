# MCP Server (AI Integration)

The [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server for tsParticles lets AI assistants inspect the package catalog, suggest required plugins and bundles from options, and generate tsParticles configurations from natural language.

## Quick start (local)

```bash
npx @tsparticles/mcp-server
```

### Claude Desktop

Add to `claude_desktop_config.json`:

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

### Cursor

In Cursor settings, add a new MCP server with:

- **Name**: `tsparticles`
- **Type**: `command`
- **Command**: `npx @tsparticles/mcp-server`

## Tools

Once connected, the AI assistant can use these tools:

| Tool               | Description                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| `suggest_plugins`  | Given a tsParticles options object, returns the npm packages and imports needed |
| `list_packages`    | Lists available packages, optionally filtered by category or search query       |
| `get_package_info` | Returns detailed info about a specific package                                  |

## Resources

The server also exposes reference resources that the AI can read:

| URI                           | Description                                       |
| ----------------------------- | ------------------------------------------------- |
| `tsparticles://packages`      | Complete package catalog by category              |
| `tsparticles://options/guide` | Full options structure with defaults and examples |
| `tsparticles://bundles`       | Bundle hierarchy and selection guide              |

## Prompt

A built-in prompt template lets you generate options from natural language:

> "Generate tsParticles options for a fireworks effect with colorful trails"

The AI will produce a complete tsParticles configuration.

## Deploy remotely

The server can run as an HTTP endpoint for remote access.

### Docker

```bash
git clone https://github.com/tsparticles/tsparticles.git
cd tsparticles/integrations/mcp-server
docker compose up -d
```

The server listens on `http://localhost:3000/mcp`.

### Docker + Cloudflare Tunnel (public HTTPS)

```bash
docker compose --profile tunnel up
```

This prints a temporary public URL like `https://random.trycloudflare.com`. Use `https://random.trycloudflare.com/mcp` as the endpoint in your MCP client.

### Docker + Synology NAS

If you have a Synology NAS, use the **Reverse Proxy** in DSM:

1. Run `docker compose up -d` on the NAS
2. Go to **Control Panel > Application Portal > Reverse Proxy**
3. Create a rule: source `https://your-nas-domain:8443` → destination `http://localhost:3000`
4. Your endpoint will be `https://your-nas-domain:8443/mcp`

## Client configuration for remote access

When connecting to a remote server, the MCP client needs the endpoint URL:

```
https://your-server.com/mcp
```

### Claude Desktop (remote)

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

For the stdio transport, the server runs locally. For HTTP transport, follow the client's documentation for configuring SSE-based MCP servers.
