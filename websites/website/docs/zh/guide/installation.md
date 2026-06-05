# 安装

## 选择你的路径

| 场景 | 命令 |
|---|---|
| 快速开始（推荐） | `pnpm add @tsparticles/engine @tsparticles/slim` |
| 最小设置 | `pnpm add @tsparticles/engine @tsparticles/basic` |
| 完整功能集 | `pnpm add @tsparticles/engine tsparticles` |
| 仓库中所有内容 | `pnpm add @tsparticles/engine @tsparticles/all` |
| 仅彩纸 | `pnpm add @tsparticles/confetti` |
| 仅烟花 | `pnpm add @tsparticles/fireworks` |
| 粒子背景 | `pnpm add @tsparticles/particles` |
| 丝带效果 | `pnpm add @tsparticles/ribbons` |

> **重要**：`@tsparticles/engine` 单独使用不绘制任何内容。你必须始终添加一个捆绑包（以加载形状和动画）或单个插件。请参阅[捆绑包指南](/zh/guide/bundles)。

## npm

```bash
# 引擎 + slim（推荐用于大多数项目）
npm install @tsparticles/engine @tsparticles/slim

# 引擎 + basic（最小化）
npm install @tsparticles/engine @tsparticles/basic

# 引擎 + full（tsparticles）
npm install @tsparticles/engine tsparticles

# 引擎 + all
npm install @tsparticles/engine @tsparticles/all

# 专用 API 捆绑包（无需显式安装引擎）
npm install @tsparticles/confetti
npm install @tsparticles/fireworks
npm install @tsparticles/particles
npm install @tsparticles/ribbons
```

## yarn

```bash
yarn add @tsparticles/engine @tsparticles/slim
# ... 其他捆绑包同理
```

## pnpm

```bash
pnpm add @tsparticles/engine @tsparticles/slim
# ... 其他捆绑包同理
```

## CDN（script 标签）

所有包均可通过 jsDelivr、unpkg 和 cdnjs 获取。

### jsDelivr

| 捆绑包 | URL |
|---|---|
| 引擎 | `https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js` |
| Basic | `https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js` |
| Slim | `https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js` |
| Full (`tsparticles`) | `https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js` |
| All | `https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js` |
| Confetti | `https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js` |
| Fireworks | `https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js` |
| Particles | `https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js` |
| Ribbons | `https://cdn.jsdelivr.net/npm/@tsparticles/ribbons@4/tsparticles.ribbons.bundle.min.js` |
| particles.js 兼容 | `https://cdn.jsdelivr.net/npm/@tsparticles/pjs@4/tsparticles.pjs.min.js` |

### unpkg

相同结构：`https://unpkg.com/{包名}@{版本}/{文件名}`

示例：
`https://unpkg.com/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`

### cdnjs

`https://cdnjs.com/libraries/tsparticles`

## 导入示例

### 使用打包工具（ES module 导入）

```ts
// 引擎 + 捆绑包加载器
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);
await tsParticles.load({ id: "tsparticles", options: { ... } });
```

### 使用 CommonJS（require）

```ts
const { tsParticles } = require("@tsparticles/engine");
const { loadSlim } = require("@tsparticles/slim");

(async () => {
  await loadSlim(tsParticles);
  await tsParticles.load({ id: "tsparticles", options: { ... } });
})();
```

### 使用 CDN（script 标签）

```html
<!-- 1. 引擎 -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<!-- 2. 捆绑包（全局暴露 loadBasic/loadSlim/loadFull/loadAll） -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<!-- 3. 你的脚本 -->
<script>
  (async () => {
    await loadSlim(tsParticles);  // 注册功能
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 60 },
          move: { enable: true },
        },
      },
    });
  })();
</script>
```

使用专用 API 捆绑包：

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({ particleCount: 100, spread: 70 });
</script>
```

## 相关页面

- [开始使用](/zh/guide/getting-started)
- [捆绑包指南](/zh/guide/bundles)
- [框架封装器](/zh/guide/wrappers)
