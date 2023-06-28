[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Demo Configs

## Installation

```bash
npm install --save-dev tsparticles-demo-configs
```

or

```bash
yarn add --dev tsparticles-demo-configs
```

or

```bash
pnpm add --save-dev tsparticles-demo-configs
```

## CDN

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles-engine/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-demo-configs/tsparticles.configs.min.js"></script>
```

## Usage

### JavaScript

```javascript
import { tsParticles } from "tsparticles-engine"; // not needed with CDN
import * as configs from "tsparticles-demo-configs"; // not needed with CDN

(async () => {
  await tsParticles.load({ id: "tsparticles", options: configs.basic });
})();
```

### TypeScript

```typescript
import { tsParticles } from "tsparticles-engine";
import * as configs from "tsparticles-demo-configs";

(async () => {
  await tsParticles.load({ id: "tsparticles", options: configs.basic });
})();
```

## Plugins

Some configs need plugins to work, they are not installed with this library.

This library contains only the config files, the plugins must be installed separately.
