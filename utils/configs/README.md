[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Demo Configs

## Quick checklist

1. Install `@tsparticles/configs` and `@tsparticles/engine`
2. Import one config preset (for example `configs.basic`)
3. Pass that config to `tsParticles.load(...)`

## Installation

```bash
npm install --save-dev @tsparticles/configs
```

or

```bash
yarn add --dev @tsparticles/configs
```

or

```bash
pnpm add --save-dev @tsparticles/configs
```

## CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs/tsparticles.configs.min.js"></script>
```

## Usage

### JavaScript

```javascript
import { tsParticles } from "@tsparticles/engine"; // not needed with CDN
import * as configs from "@tsparticles/configs"; // not needed with CDN

(async () => {
  await tsParticles.load({ id: "tsparticles", options: configs.basic });
})();
```

### TypeScript

```typescript
import { tsParticles } from "@tsparticles/engine";
import * as configs from "@tsparticles/configs";

(async () => {
  await tsParticles.load({ id: "tsparticles", options: configs.basic });
})();
```

## Plugins

Some configs need plugins to work, they are not installed with this library.

This library contains only the config files, the plugins must be installed separately.

## Common pitfalls

- Using a config that requires plugins without loading those plugins first
- Assuming this package bundles runtime plugins (it only exports config objects)
- Mixing config objects from different versions without checking option compatibility

## Related docs

- Main docs: <https://particles.js.org/docs/>
- Root options guide: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options.md>
- Repository README: <https://github.com/tsparticles/tsparticles/blob/main/README.md>
