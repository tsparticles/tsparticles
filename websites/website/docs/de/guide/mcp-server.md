# MCP Server (KI-Integration)

Der [MCP (Model Context Protocol)](https://modelcontextprotocol.io) Server für tsParticles ermöglicht KI-Assistenten, das Paketverzeichnis zu durchsuchen, benötigte Plugins und Bundles aus Optionen vorzuschlagen und tsParticles-Konfigurationen aus natürlicher Sprache zu generieren.

## Schnellstart (lokal)

```bash
npx @tsparticles/mcp-server
```

### Claude Desktop

Zu `claude_desktop_config.json` hinzufügen:

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

## Werkzeuge

| Werkzeug | Beschreibung |
|----------|--------------|
| `suggest_plugins` | Ermittelt benötigte npm-Pakete und Imports aus einem tsParticles-Optionsobjekt |
| `list_packages` | Listet verfügbare Pakete auf, gefiltert nach Kategorie oder Suchbegriff |
| `get_package_info` | Zeigt detaillierte Informationen zu einem bestimmten Paket |

## Deployment

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

## Client-Konfiguration

Endpoint: `https://ihr-server.com/mcp`
