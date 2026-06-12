# MCP Server (AI एकीकरण)

tsParticles के लिए [MCP (Model Context Protocol)](https://modelcontextprotocol.io) सर्वर AI सहायकों को पैकेज कैटलॉग का निरीक्षण करने, विकल्पों से आवश्यक प्लगइन और बंडल सुझाने, और प्राकृतिक भाषा से tsParticles कॉन्फ़िगरेशन उत्पन्न करने देता है।

## त्वरित आरंभ (स्थानीय)

```bash
npx @tsparticles/mcp-server
```

## उपकरण

| उपकरण              | विवरण                                                                |
| ------------------ | -------------------------------------------------------------------- |
| `suggest_plugins`  | tsParticles ऑप्शन ऑब्जेक्ट से आवश्यक npm पैकेज और आयात लौटाता है     |
| `list_packages`    | उपलब्ध पैकेजों की सूची, श्रेणी या खोज द्वारा फ़िल्टर किया जा सकता है |
| `get_package_info` | किसी विशिष्ट पैकेज के बारे में विस्तृत जानकारी लौटाता है             |

## डिप्लॉय

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

## क्लाइंट कॉन्फ़िगरेशन

एंडपॉइंट: `https://your-server.com/mcp`
