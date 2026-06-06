# MCP Server (Integración IA)

El servidor [MCP (Model Context Protocol)](https://modelcontextprotocol.io) para tsParticles permite a los asistentes AI inspeccionar el catálogo de paquetes, sugerir los plugins y bundles necesarios a partir de opciones, y generar configuraciones tsParticles desde lenguaje natural.

## Inicio rápido (local)

```bash
npx @tsparticles/mcp-server
```

### Claude Desktop

Añade a `claude_desktop_config.json`:

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

En la configuración de Cursor, añade un nuevo servidor MCP con:
- **Nombre**: `tsparticles`
- **Tipo**: `command`
- **Comando**: `npx @tsparticles/mcp-server`

## Herramientas

| Herramienta | Descripción |
|-------------|-------------|
| `suggest_plugins` | Dado un objeto options de tsParticles, devuelve los paquetes npm e imports necesarios |
| `list_packages` | Lista los paquetes disponibles, filtrados por categoría o búsqueda |
| `get_package_info` | Devuelve información detallada de un paquete específico |

## Recursos

| URI | Descripción |
|-----|-------------|
| `tsparticles://packages` | Catálogo completo de paquetes por categoría |
| `tsparticles://options/guide` | Guía completa de opciones con valores por defecto y ejemplos |
| `tsparticles://bundles` | Jerarquía de bundles y guía de selección |

## Despliegue remoto

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

### Docker + Synology NAS

Usa el **Proxy Inverso** en DSM.

## Configuración del cliente

Endpoint: `https://tu-servidor.com/mcp`
