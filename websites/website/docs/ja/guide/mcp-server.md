# MCP Server (AI統合)

tsParticles用の[MCP (Model Context Protocol)](https://modelcontextprotocol.io)サーバーは、AIアシスタントがパッケージカタログを検査し、オプションから必要なプラグインやバンドルを提案し、自然言語からtsParticles設定を生成することを可能にします。

## クイックスタート (ローカル)

```bash
npx @tsparticles/mcp-server
```

### Claude Desktop

`claude_desktop_config.json`に追加:

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

## ツール

| ツール | 説明 |
|------|-------------|
| `suggest_plugins` | tsParticlesオプションオブジェクトから必要なnpmパッケージとインポートを返す |
| `list_packages` | 利用可能なパッケージを一覧表示（カテゴリまたは検索でフィルタリング可能） |
| `get_package_info` | 特定のパッケージの詳細情報を返す |

## デプロイ

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

## クライアント設定

エンドポイント: `https://your-server.com/mcp`
