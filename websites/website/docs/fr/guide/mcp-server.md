# MCP Server (Intégration IA)

Le serveur [MCP (Model Context Protocol)](https://modelcontextprotocol.io) pour tsParticles permet aux assistants IA d'inspecter le catalogue de paquets, de suggérer les plugins et bundles nécessaires à partir d'options, et de générer des configurations tsParticles en langage naturel.

## Démarrage rapide (local)

```bash
npx @tsparticles/mcp-server
```

### Claude Desktop

Ajoutez à `claude_desktop_config.json` :

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

Dans les paramètres de Cursor, ajoutez un nouveau serveur MCP avec :

- **Nom** : `tsparticles`
- **Type** : `command`
- **Commande** : `npx @tsparticles/mcp-server`

## Outils

Une fois connecté, l'assistant IA peut utiliser ces outils :

| Outil              | Description                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `suggest_plugins`  | À partir d'un objet options tsParticles, retourne les paquets npm et imports nécessaires |
| `list_packages`    | Liste les paquets disponibles, filtrés par catégorie ou recherche                        |
| `get_package_info` | Retourne les détails d'un paquet spécifique                                              |

## Ressources

Le serveur expose également des ressources de référence :

| URI                           | Description                                                        |
| ----------------------------- | ------------------------------------------------------------------ |
| `tsparticles://packages`      | Catalogue complet des paquets par catégorie                        |
| `tsparticles://options/guide` | Structure complète des options avec valeurs par défaut et exemples |
| `tsparticles://bundles`       | Hiérarchie des bundles et guide de sélection                       |

## Prompt

Un template de prompt intégré permet de générer des options à partir de descriptions en langage naturel.

## Déploiement distant

Le serveur peut fonctionner comme endpoint HTTP.

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

Utilisez le **Proxy Inverse** dans DSM.

## Configuration client

Endpoint : `https://votre-serveur.com/mcp`
