# 开始使用

此路径是 2026 年 `tsParticles` 最快可靠的设置。

## 快速清单

1. 安装`@tsparticles/engine`。
2. 选择一个运行时路径（`@tsparticles/slim`、`@tsparticles/all`、专注于 API（如 `@tsparticles/particles`）或仅限自定义包）。
3. 将所选 bundle 只加载一次。
4. 从手动选项、配置对象或预设开始。

## 1) 安装引擎+捆绑预设

使用 `@tsparticles/engine` 加上 `@tsparticles/slim` 可以实现默认大小/功能的良好平衡。

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

需要 CDN 链接、`npm`/`yarn` 变体或 `require(...)` 示例？

- 请参阅 [`/guide/installation`](/zh/guide/installation)。

## 2) 在 HTML 中创建容器

```html
<div id="tsparticles"></div>
```

## 3) 初始化 tsParticles

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options = {
  background: {
    color: "#0b1020",
  },
  particles: {
    number: {
      value: 80,
    },
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
};

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options,
  });
})();
```

## 4) 选择正确的捆绑包

- `@tsparticles/slim`：大多数应用程序应该从这里开始。
- `@tsparticles/basic`：较小的功能集，适用于非常轻型的设置。
- `@tsparticles/all`：包含所有内容，最适合快速原型设计。

如果您需要一个集中的 API 而不是直接 `tsParticles` 设置：

- `@tsparticles/particles`：简化的粒子背景API
- `@tsparticles/confetti`：一次调用即可触发的彩纸 API
- `@tsparticles/fireworks`：一次调用即可触发的烟花 API

## 5) 当您需要速度时使用预设/配置

如果您更喜欢预置效果：

```bash
pnpm add @tsparticles/configs
```

然后通过按键加载一个配置，例如 [`demo/vite` app](https://github.com/tsparticles/tsparticles/blob/main/demo/vite/src/main.ts)。

如果您更喜欢基于预设名称的设置，请使用 [`/demos/presets`](/zh/demos/presets) 中的官方预设目录。

## 快速文档地图

- 根选项：[`/options/`](/zh/options/)
- wrappers 参考：[`/guide/wrappers`](/zh/guide/wrappers)
- 预设目录：[`/demos/presets`](/zh/demos/presets)
- 调色板目录：[`/demos/palettes`](/zh/demos/palettes)
- 形状目录：[`/demos/shapes`](/zh/demos/shapes)
- 从 particles.js 迁移：[`/migrations/particles-js`](/zh/migrations/particles-js)
- 颜色格式：[`/guide/color-formats`](/zh/guide/color-formats)
- 容器生命周期：[`/guide/container-lifecycle`](/zh/guide/container-lifecycle)
- 插件和自定义：[`/guide/plugins-customization`](/zh/guide/plugins-customization)

## 故障排除

- 空白屏幕：在调用 `tsParticles.load` 之前先确认 `#tsparticles` 存在。
- 缺少功能：您可能需要另一个插件/包（形状、交互、更新程序）。
- 选项上的类型错误：使您的包保持与相同的主要/次要版本一致。
