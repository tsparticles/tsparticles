# MCP Server (AI Integration)

The [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server for tsParticles lets AI assistants inspect the package catalog, suggest required plugins and bundles from options, and generate tsParticles configurations from natural language.

## Quick Start (local)

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

## Tools

| Tool | Description |
|------|-------------|
| `suggest_plugins` | Returns needed npm packages and imports from a tsParticles options object |
| `list_packages` | Lists available packages, filtered by category or search |
| `get_package_info` | Returns detailed info about a specific package |

## Resources

| URI | Description |
|-----|-------------|
| `tsparticles://packages` | Complete package catalog by category |
| `tsparticles://options/guide` | Full options structure with defaults and examples |
| `tsparticles://bundles` | Bundle hierarchy and selection guide |

## Deploy

### Docker

```bash
git clone https://github.com/tsparticles/tsparticles.git
cd tsparticles/integrations/mcp-server
docker compose up -d
```

### Docker + Cloudflare Tunnel

```bash
docker compose --profile tunnel up
```

## Client configuration

Endpoint: `https://your-server.com/mcp`
