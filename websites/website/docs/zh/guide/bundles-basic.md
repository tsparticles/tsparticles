# 捆绑包：Basic

`@tsparticles/basic` 是最轻量的捆绑包。仅包含基本要素：可移动的圆形，以及可动画的透明度和大小。

## 包含的功能

**形状：** 圆形

**更新器：**

- paint（颜色）
- opacity（透明度）
- out-modes（离开屏幕时的行为）
- size（大小）

**插件：**

- move（移动）
- blend（颜色混合）
- HEX、HSL、RGB 颜色插件

**不包含：**

- 鼠标/触摸交互
- 粒子连线
- 其他形状（方形、星形、图片、多边形等）
- 发射器、吸收器、声音
- 旋转、生命周期、滚动、倾斜、摆动

## 何时使用

- 捆绑包大小是你的首要关注点
- 你只需要点移动的效果
- 不需要交互或复杂形状

## 安装

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#ffffff" },
    particles: {
      number: { value: 50 },
      color: { value: ["#5bc0eb", "#fde74c", "#9bc53d"] },
      size: {
        value: { min: 300, max: 400 },
        animation: { enable: true, speed: 100 },
      },
      move: { enable: true, speed: 10 },
    },
  },
});
```

### CDN（script 标签）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script>
  (async () => {
    await loadBasic(tsParticles);
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 50 },
          move: { enable: true, speed: 1.5 },
        },
      },
    });
  })();
</script>
```

## 常见错误

- 期望不包含的功能（例如 `links`、鼠标交互）——这些需要更高级的捆绑包。
- 在 `loadBasic(tsParticles)` 之前调用 `tsParticles.load()`——形状和更新器尚未注册。
- 只安装 `@tsparticles/engine` 而不安装捆绑包——引擎本身不绘制任何内容。

## 参见

- [捆绑包概览](/zh/guide/bundles)
- [安装指南](/zh/guide/installation)
