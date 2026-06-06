# MCP Server (Integrazione AI)

Il server [MCP (Model Context Protocol)](https://modelcontextprotocol.io) per tsParticles permette agli assistenti AI di ispezionare il catalogo dei pacchetti, suggerire plugin e bundle necessari a partire dalle opzioni, e generare configurazioni tsParticles da linguaggio naturale.

## Avvio rapido (locale)

```bash
npx @tsparticles/mcp-server
```

### Claude Desktop

Aggiungi a `claude_desktop_config.json`:

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

Nelle impostazioni di Cursor, aggiungi un nuovo server MCP con:
- **Nome**: `tsparticles`
- **Tipo**: `command`
- **Comando**: `npx @tsparticles/mcp-server`

## Strumenti

Una volta connesso, l'assistente AI può usare questi strumenti:

| Strumento | Descrizione |
|-----------|-------------|
| `suggest_plugins` | Dato un oggetto options tsParticles, restituisce i pacchetti npm e gli import necessari |
| `list_packages` | Elenca i pacchetti disponibili, opzionalmente filtrati per categoria o ricerca |
| `get_package_info` | Restituisce informazioni dettagliate su un pacchetto specifico |

## Risorse

Il server espone anche risorse di riferimento che l'AI può leggere:

| URI | Descrizione |
|-----|-------------|
| `tsparticles://packages` | Catalogo completo dei pacchetti per categoria |
| `tsparticles://options/guide` | Guida completa alla struttura delle opzioni con valori predefiniti ed esempi |
| `tsparticles://bundles` | Gerarchia dei bundle e guida alla selezione |

## Prompt

Un template di prompt integrato permette di generare opzioni da descrizioni in linguaggio naturale:

> "Generate tsParticles options for a fireworks effect with colorful trails"

L'AI produrrà una configurazione tsParticles completa.

## Deploy remoto

Il server può funzionare come endpoint HTTP per l'accesso remoto.

### Docker

```bash
git clone https://github.com/tsparticles/tsparticles.git
cd tsparticles/integrations/mcp-server
docker compose up -d
```

Il server ascolta su `http://localhost:3000/mcp`.

### Docker + Cloudflare Tunnel (HTTPS pubblico)

```bash
docker compose --profile tunnel up
```

Questo stampa un URL pubblico temporaneo come `https://random.trycloudflare.com`. Usa `https://random.trycloudflare.com/mcp` come endpoint nel client MCP.

### Docker + Synology NAS

Se hai un Synology NAS, usa il **Proxy Inverso** in DSM:

1. Esegui `docker compose up -d` sul NAS
2. Vai su **Pannello di Controllo > Portale Applicazioni > Proxy Inverso**
3. Crea una regola: origine `https://tuo-dominio:8443` → destinazione `http://localhost:3000`
4. Il tuo endpoint sarà `https://tuo-dominio:8443/mcp`

## Configurazione client per accesso remoto

Quando ti colleghi a un server remoto, il client MCP necessita dell'URL dell'endpoint:

```
https://tuo-server.com/mcp
```
