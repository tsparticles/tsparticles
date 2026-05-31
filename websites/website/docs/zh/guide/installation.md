# 安装

本页对应 `tsParticles` 主 README 中的安装矩阵。

官方参考: <https://github.com/tsparticles/tsparticles/blob/main/README.md#library-installation>

## 选择你的路径

- **快速默认**: `@tsparticles/engine` + `@tsparticles/slim`
- **更小的自定义 runtime**: `@tsparticles/engine` + 仅所需 plugins
- **聚焦 API**: `@tsparticles/particles`、`@tsparticles/confetti`、`@tsparticles/fireworks` 或 `@tsparticles/ribbons`
- **包含全部功能**: `@tsparticles/all`

## 托管 / CDN

可使用以下提供商（或自行托管构建产物）。

### jsDelivr

- <https://www.jsdelivr.com/package/npm/@tsparticles/confetti>
- <https://www.jsdelivr.com/package/npm/@tsparticles/particles>
- <https://www.jsdelivr.com/package/npm/@tsparticles/engine>
- <https://www.jsdelivr.com/package/npm/@tsparticles/fireworks>
- <https://www.jsdelivr.com/package/npm/@tsparticles/basic>
- <https://www.jsdelivr.com/package/npm/@tsparticles/slim>
- <https://www.jsdelivr.com/package/npm/tsparticles>
- <https://www.jsdelivr.com/package/npm/@tsparticles/all>

### cdnjs

- <https://cdnjs.com/libraries/tsparticles>

### unpkg

- <https://unpkg.com/@tsparticles/confetti/>
- <https://unpkg.com/@tsparticles/particles/>
- <https://unpkg.com/@tsparticles/engine/>
- <https://unpkg.com/@tsparticles/fireworks/>
- <https://unpkg.com/@tsparticles/basic/>
- <https://unpkg.com/@tsparticles/slim/>
- <https://unpkg.com/tsparticles/>
- <https://unpkg.com/@tsparticles/all/>

## 使用 package manager 安装

### npm

```bash
npm install @tsparticles/engine
```

### yarn

```bash
yarn add @tsparticles/engine
```

### pnpm

```bash
pnpm add @tsparticles/engine
```

## import 与 require

```ts
const tsParticles = require("@tsparticles/engine");

// or

import { tsParticles } from "@tsparticles/engine";
```

## 最小 runtime 配置（`@tsparticles/slim`）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      move: {
        enable: true,
      },
      number: {
        value: 60,
      },
    },
  },
});
```

## 相关页面

- [`/guide/getting-started`](/zh/guide/getting-started)
- [`/guide/wrappers`](/zh/guide/wrappers)
- [`/demos/presets`](/zh/demos/presets)
- [`/migrations/particles-js`](/zh/migrations/particles-js)

## 旧版兼容

如果你在迁移旧的 particles.js 集成，请使用兼容包：

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>
