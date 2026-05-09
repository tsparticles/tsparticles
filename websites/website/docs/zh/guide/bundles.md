# Bundles 指南

本页帮助你选择合适的 `tsParticles` bundle，并快速完成 setup。

## 包对比

| 包                       | 适用场景                           | setup 方式                                     |
| ------------------------ | ---------------------------------- | ---------------------------------------------- |
| `@tsparticles/basic`     | 超轻量场景                         | `tsParticles` + `await loadBasic(tsParticles)` |
| `@tsparticles/slim`      | 大多数网站/应用                    | `tsParticles` + `await loadSlim(tsParticles)`  |
| `tsparticles`            | 官方全量能力组合并保留 engine 控制 | `tsParticles` + `await loadFull(tsParticles)`  |
| `@tsparticles/all`       | 全功能、快速原型                   | `tsParticles` + `await loadAll(tsParticles)`   |
| `@tsparticles/confetti`  | 一次调用的彩纸效果                 | `await confetti(options)`                      |
| `@tsparticles/fireworks` | 一次调用的烟花效果                 | `await fireworks(options)`                     |
| `@tsparticles/particles` | 简化的粒子背景 API                 | `await particles(options)`                     |

## Bundle 分页指南

- Basic: [`/guide/bundles-basic`](/zh/guide/bundles-basic)
- Slim: [`/guide/bundles-slim`](/zh/guide/bundles-slim)
- tsparticles (Full): [`/guide/bundles-full`](/zh/guide/bundles-full)
- All: [`/guide/bundles-all`](/zh/guide/bundles-all)
- Confetti: [`/guide/bundles-confetti`](/zh/guide/bundles-confetti)
- Fireworks: [`/guide/bundles-fireworks`](/zh/guide/bundles-fireworks)
- Particles: [`/guide/bundles-particles`](/zh/guide/bundles-particles)

## 安装

按你的使用场景安装对应的包路径。

```bash
pnpm add @tsparticles/engine @tsparticles/basic
pnpm add @tsparticles/engine @tsparticles/slim
pnpm add @tsparticles/engine tsparticles
pnpm add @tsparticles/engine @tsparticles/all
pnpm add @tsparticles/confetti
pnpm add @tsparticles/fireworks
pnpm add @tsparticles/particles
```

需要 CDN 链接和更多包管理器变体？

- 参见 [`/guide/installation`](/zh/guide/installation)。

## Setup 示例

### engine + loader bundles (`basic`, `slim`, `full`, `all`)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
    },
  },
});
```

其他 preset 只需要替换 loader 的 import/函数名：

- `@tsparticles/basic` -> `loadBasic`
- `tsparticles` -> `loadFull`
- `@tsparticles/all` -> `loadAll`

### 聚焦 API (`confetti`, `fireworks`, `particles`)

```ts
import { confetti } from "@tsparticles/confetti";
import { fireworks } from "@tsparticles/fireworks";
import { particles } from "@tsparticles/particles";

await confetti({ count: 80, spread: 60 });
await fireworks({ sounds: false });
await particles({ count: 100, links: true });
```

当你希望快速接入、又不想手动串联大量 engine 插件时，这些 API 很合适。

## 实用选择规则

1. 大多数项目先从 `@tsparticles/slim` 开始。
2. 若 bundle 体积是首要目标且功能需求简单，使用 `@tsparticles/basic`。
3. 若你需要 full 基线并通过 `loadFull` 获得广泛能力，使用 `tsparticles`。
4. 若是快速原型或立即需要大量功能，使用 `@tsparticles/all`。
5. 若 UI 只需要单一聚焦效果并且希望最小 setup，使用 `@tsparticles/confetti`、`@tsparticles/fireworks` 或 `@tsparticles/particles`。

## 相关页面

- Playground 聚焦 bundles：[`/playground/bundles`](/zh/playground/bundles)
- 快速入门路径：[`/guide/getting-started`](/zh/guide/getting-started)
- 安装矩阵：[`/guide/installation`](/zh/guide/installation)
- Wrappers 总览：[`/guide/wrappers`](/zh/guide/wrappers)
