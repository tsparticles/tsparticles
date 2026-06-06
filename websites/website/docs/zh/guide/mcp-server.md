# MCP Server (AI 集成)

[MCP (Model Context Protocol)](https://modelcontextprotocol.io) 服务器 for tsParticles 让 AI 助手能够检查包目录、从选项中建议所需的插件和包，并从自然语言生成 tsParticles 配置。

## 快速开始 (本地)

```bash
npx @tsparticles/mcp-server
```

### Claude Desktop

添加到 `claude_desktop_config.json`:

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

## 工具

| 工具 | 描述 |
|------|-------------|
| `suggest_plugins` | 从 tsParticles 选项对象返回所需的 npm 包和导入 |
| `list_packages` | 列出可用包，可按类别或搜索过滤 |
| `get_package_info` | 返回特定包的详细信息 |

## 部署

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

## 客户端配置

端点: `https://your-server.com/mcp`
