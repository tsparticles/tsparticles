# MCP Server (Integração IA)

O servidor [MCP (Model Context Protocol)](https://modelcontextprotocol.io) para tsParticles permite que assistentes AI inspecionem o catálogo de pacotes, sugiram plugins e bundles necessários a partir de opções, e gerem configurações tsParticles a partir de linguagem natural.

## Início rápido (local)

```bash
npx @tsparticles/mcp-server
```

### Claude Desktop

Adicione ao `claude_desktop_config.json`:

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

## Ferramentas

| Ferramenta         | Descrição                                                                               |
| ------------------ | --------------------------------------------------------------------------------------- |
| `suggest_plugins`  | A partir de um objeto options tsParticles, retorna os pacotes npm e imports necessários |
| `list_packages`    | Lista pacotes disponíveis, filtrados por categoria ou pesquisa                          |
| `get_package_info` | Retorna informações detalhadas de um pacote específico                                  |

## Recursos

| URI                           | Descrição                                             |
| ----------------------------- | ----------------------------------------------------- |
| `tsparticles://packages`      | Catálogo completo de pacotes por categoria            |
| `tsparticles://options/guide` | Guia completa de opções com valores padrão e exemplos |
| `tsparticles://bundles`       | Hierarquia de bundles e guia de seleção               |

## Implantação remota

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

## Configuração do cliente

Endpoint: `https://seu-servidor.com/mcp`
