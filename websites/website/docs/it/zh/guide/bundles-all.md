# 捆绑包：All

`@tsparticles/all` 加载 tsParticles 仓库中的**所有内容**：每种形状、交互、更新器、效果、路径、缓动、插件和导出。它是体积最大的捆绑包，适用于原型设计和演示。

## 包含的功能

继承 `tsparticles`（full）的全部功能，外加：

**所有形状：** 箭头、扑克花色、齿轮、心形、无穷、矩阵、路径、丝带、圆角多边形、圆角矩形、螺旋、圆方角形

**所有外部交互：** cannon、light、particle、pop、particles-repulse

**所有效果：** 气泡、滤镜、粒子、阴影、拖尾

**所有路径生成器：** branches、brownian、curl-noise、curves、fractal-noise、grid、levy、perlin-noise、polygon、random、simplex-noise、spiral、svg、zig-zag

**所有缓动：** back、bounce、circ、cubic、elastic、expo、gaussian、linear、quad、quart、quint、sigmoid、sine、smoothstep

**所有颜色插件：** HEX、HSL、RGB、HSV、HWB、LAB、LCH、Named、OKLAB、OKLCH

**所有插件：** absorbers、background-mask、canvas-mask、emitters（所有形状）、easings（所有）、export-image、export-json、export-video、infection、manual-particles、motion、poisson-disc、polygon-mask、responsive、sounds、themes、trail、zoom

**所有更新器：** destroy、gradient、life、opacity、orbit、out-modes、paint、roll、rotate、size、tilt、twinkle、wobble

## 何时使用

- 快速原型设计以探索可能性
- 演示和展示
- 不关心大小的开发环境
- **不推荐用于生产环境**——优先选择更有针对性的捆绑包

## 安装

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 100 },
      shape: { type: "heart" },
      move: { enable: true, speed: 2 },
    },
  },
});
```

### CDN（script 标签）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js"></script>
<script>
  (async () => {
    await loadAll(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 100 },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## `tsparticles` 与 `@tsparticles/all` 的区别

详情请参见 [bundles-full 页面](/zh/guide/bundles-full)的比较表格。

## 常见错误

- 在生产环境中使用——优先选择 `@tsparticles/slim` 或 `tsparticles` 以获得更小的捆绑包。
- 在 `loadAll(tsParticles)` 之前调用 `tsParticles.load()`。

## 参见

- [捆绑包概览](/zh/guide/bundles)
- [安装指南](/zh/guide/installation)
