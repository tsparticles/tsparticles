# 捆绑包：Slim

`@tsparticles/slim` 是大多数项目的推荐捆绑包。包含现代粒子动画所需的一切，具备鼠标交互、多种形状和粒子连线功能。

## 包含的功能

继承 `@tsparticles/basic` 的全部功能，外加：

**形状：** 圆形、方形、星形、多边形、线条、图片、emoji

**外部交互（鼠标/触摸）：**

- attract（吸引）
- bounce（弹跳）
- bubble（气泡）
- connect（连接）
- destroy（销毁）
- grab（抓取）
- parallax（视差）
- pause（暂停）
- push（推动）
- remove（移除）
- repulse（排斥）
- slow（减速）

**粒子交互：**

- attract（吸引）
- collisions（碰撞）
- links（粒子连线）

**额外的更新器：**

- life（生命周期）
- rotate（旋转）

**插件：**

- interactivity（交互）
- easing-quad（二次缓动）
- HEX、HSL、RGB 颜色插件

## 何时使用

- 推荐作为大多数项目的起点
- 需要多种形状（圆形、星形、多边形、图片）
- 需要鼠标交互（点击、悬停、气泡、排斥）
- 需要粒子连线
- 在捆绑包大小和功能之间取得良好平衡

## 安装

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#0b1020" },
    particles: {
      number: { value: 80 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      shape: { type: ["circle", "star", "square"] },
    },
  },
});
```

### CDN（script 标签）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          links: { enable: true },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## 常见错误

- 在 `loadSlim(tsParticles)` 之前调用 `tsParticles.load()`。
- 引擎和捆绑包版本混用——保持版本一致。
- 期望更高级捆绑包的功能（发射器、吸收器、文本、摆动）——需要 `tsparticles`（full）或单独的插件。

## 参见

- [捆绑包概览](/zh/guide/bundles)
- [安装指南](/zh/guide/installation)
