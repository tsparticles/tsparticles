# 开始使用

tsParticles 是一个用于创建粒子动画、彩纸、烟花等的 JavaScript/TypeScript 库。它适用于所有现代浏览器，既可作为 npm 包使用，也可通过 CDN 配合 `<script>` 标签使用。

## Quick start

最快的方式是通过我们的 CLI 开始：

```bash
npm create tsparticles@latest
```

按照交互式提示选择模板和框架。
一个新项目将在当前目录中创建，tsParticles 已预先配置。

---

## 架构：引擎 + 捆绑包

`@tsparticles/engine` 单独使用**不会显示任何内容**。它只包含核心引擎（动画循环、画布、事件管理），但**没有形状、没有交互、没有视觉效果**。要看到效果，你必须至少加载一个**捆绑包**或单独的**插件**。

| 概念                                                                       | 作用                                                               |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `@tsparticles/engine`                                                      | 核心引擎。导出 `tsParticles`、类型、选项。单独使用不绘制任何内容。 |
| 捆绑包（`@tsparticles/basic`、`@tsparticles/slim` 等）                     | 预组装的包，在引擎上注册形状、交互和更新器。                       |
| 单个插件（`@tsparticles/shape-circle`、`@tsparticles/updater-opacity` 等） | 可自由组合成自定义捆绑包的独立包。                                 |

## 选择你的路径

### 路径 A — npm/pnpm/yarn（使用打包工具的现代项目）

安装引擎 + 一个捆绑包：

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

然后在代码中：

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  // 1. 在引擎上注册 slim 捆绑包的所有功能
  await loadSlim(tsParticles);

  // 2. 创建动画
  await tsParticles.load({
    id: "tsparticles", // HTML 容器 ID
    options: {
      background: {
        color: "#0b1020",
      },
      particles: {
        number: { value: 80 },
        links: {
          enable: true,
          distance: 150,
          opacity: 0.35,
        },
        move: {
          enable: true,
          speed: 2,
        },
      },
    },
  });
})();
```

HTML 容器：

```html
<div id="tsparticles"></div>
```

### 路径 B — 通过 CDN 使用 `<script>` 标签（无打包工具，原生 HTML）

先加载引擎，再加载捆绑包。CDN 文件将所有内容暴露在 `window` 上——无需 `import`。

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- tsParticles 引擎 -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <!-- Slim 捆绑包（全局暴露 loadSlim） -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
  </head>
  <body>
    <div id="tsparticles"></div>
    <script>
      (async () => {
        // loadSlim 可从 CDN 捆绑包全局获取
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            background: { color: "#0b1020" },
            particles: {
              number: { value: 80 },
              links: { enable: true, distance: 150 },
              move: { enable: true, speed: 2 },
            },
          },
        });
      })();
    </script>
  </body>
</html>
```

> **注意**：即使使用 CDN 捆绑包，你**必须**在 `tsParticles.load()` 之前调用 `loadSlim(tsParticles)`（或 `loadBasic` / `loadFull` / `loadAll`）。CDN 捆绑包会全局暴露加载器函数，但**不会自动调用它**。

`@tsparticles/basic` → `loadBasic`、`tsparticles` → `loadFull`、`@tsparticles/all` → `loadAll`，同理。

### 路径 C — 具有专用 API 的专业捆绑包（彩纸、烟花、粒子）

某些捆绑包拥有自己的简化 API，无需使用 `tsParticles.load()`：

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
  </head>
  <body>
    <script>
      confetti({ particleCount: 100, spread: 70 });
    </script>
  </body>
</html>
```

`fireworks()`、`particles()`、`ribbons()` 同理。

## 选择哪个捆绑包？

| 捆绑包                   | npm                      | 何时使用                                                                       |
| ------------------------ | ------------------------ | ------------------------------------------------------------------------------ |
| `@tsparticles/basic`     | `loadBasic(tsParticles)` | 最简：圆形、移动、透明度、大小。无交互。                                       |
| `@tsparticles/slim`      | `loadSlim(tsParticles)`  | **推荐用于大多数项目。** 添加交互（点击/悬停）、粒子连线、图片、星形、多边形。 |
| `tsparticles`            | `loadFull(tsParticles)`  | 完整的官方功能集：发射器、吸收器、文本形状、滚动、摆动、拖尾。                 |
| `@tsparticles/all`       | `loadAll(tsParticles)`   | **仓库中的所有内容**：每种形状、交互、效果、缓动、路径、导出。仅限原型设计。   |
| `@tsparticles/confetti`  | `confetti(options)`      | 一次函数调用即可实现彩纸效果。专用 API。                                       |
| `@tsparticles/fireworks` | `fireworks(options)`     | 一次函数调用即可实现烟花效果。专用 API。                                       |
| `@tsparticles/particles` | `particles(options)`     | 简化的粒子背景。专用 API。                                                     |
| `@tsparticles/ribbons`   | `ribbons(options)`       | 丝带效果。专用 API。                                                           |

更多详情：[`/zh/guide/bundles`](/zh/guide/bundles)。

## 使用预设

`@tsparticles/configs` 包包含数十种现成的配置（吸收器、气泡、雪、星星、重力、碰撞等）。

```bash
pnpm add @tsparticles/engine @tsparticles/slim @tsparticles/configs
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import "@tsparticles/configs";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: { preset: "snow" },
});
```

通过 CDN：

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);
    tsParticles.load({ id: "tsparticles", options: { preset: "snow" } });
  })();
</script>
```

## 快速参考

- 选项文档：[`/zh/options/`](/zh/options/)
- 捆绑包指南：[`/zh/guide/bundles`](/zh/guide/bundles)
- 预设目录：[`/zh/demos/presets`](/zh/demos/presets)
- 调色板目录：[`/zh/demos/palettes`](/zh/demos/palettes)
- 形状目录：[`/zh/demos/shapes`](/zh/demos/shapes)
- 框架封装器：[`/zh/guide/wrappers`](/zh/guide/wrappers)
- 颜色格式：[`/zh/guide/color-formats`](/zh/guide/color-formats)
- 容器生命周期：[`/zh/guide/container-lifecycle`](/zh/guide/container-lifecycle)
- 插件与自定义：[`/zh/guide/plugins-customization`](/zh/guide/plugins-customization)

## 故障排除

| 问题                                                 | 可能原因                                                    | 解决方案                                                                   |
| ---------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------- |
| 空白屏幕，无粒子                                     | 调用 `tsParticles.load()` 时 `#tsparticles` 在 DOM 中不存在 | 确保 DIV 在脚本之前存在，或使用 `DOMContentLoaded`                         |
| 空白屏幕，无粒子                                     | 只安装了 `@tsparticles/engine`                              | 同时安装一个捆绑包（`@tsparticles/slim`）或插件——引擎本身没有可绘制的形状  |
| "loadBasic/loadSlim/loadFull is not a function" 错误 | 未安装捆绑包或导入错误                                      | `pnpm add @tsparticles/slim` 并导入 `{ loadSlim }`                         |
| 粒子不移动                                           | `move.enable` 未设置为 `true`                               | 添加 `move: { enable: true, speed: 2 }`                                    |
| 缺少功能（如连线、碰撞）                             | 选择的捆绑包不包含该功能                                    | 切换到更丰富的捆绑包（`@tsparticles/slim` 或 `tsparticles`）或安装特定插件 |
| TypeScript 类型错误                                  | 包版本不同步                                                | 保持引擎和捆绑包的主/次版本一致                                            |
