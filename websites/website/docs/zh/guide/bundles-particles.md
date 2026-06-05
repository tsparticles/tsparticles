# 捆绑包：Particles

`@tsparticles/particles` 提供了用于创建交互式粒子背景的简化 API。是 `@tsparticles/basic` 的更好替代方案，具有专用 API 而无需手动配置引擎。

## 包含的功能

**形状：** 圆形（来自 basic）

**内部插件：** interactivity（交互，包含 links 和 collisions）

**交互：** links（粒子连线）、collisions（碰撞）

**API：** `particles(options)` 或 `particles(canvasId, options)`

## 何时使用

- 网站粒子背景
- 带有粒子连线（节点式效果）的背景
- 你不想手动配置引擎

## 安装

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/particles
```

```ts
import { particles } from "@tsparticles/particles";

// 带连线的背景
await particles({
  count: 120,
  links: true,
  color: "#ffffff",
  linksColor: "#00d8ff",
  radius: 3,
  speed: 2,
  opacity: 0.8,
});

// 在特定 canvas 上
await particles("my-canvas", {
  count: 80,
  shape: ["circle", "square"],
  links: true,
});

// 自定义颜色
await particles({
  count: 100,
  color: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  links: false,
});
```

### CDN（script 标签）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js"></script>
<script>
  particles({
    radius: 3,
    speed: 2,
    opacity: 0.8,
    links: true,
    linksWidth: 140,
    color: "#ffffff",
    linksColor: "#00d8ff",
  });
</script>
```

### 主要参数

| 参数         | 类型               | 默认值     | 描述            |
| ------------ | ------------------ | ---------- | --------------- |
| `count`      | number             | 50         | 粒子数量        |
| `radius`     | number             | 3          | 粒子半径        |
| `speed`      | number             | 2          | 移动速度        |
| `opacity`    | number             | 0.8        | 不透明度（0-1） |
| `color`      | string \| string[] | "#ffffff"  | 粒子颜色        |
| `links`      | boolean            | false      | 显示连线        |
| `linksColor` | string             | "#ffffff"  | 连线颜色        |
| `linksWidth` | number             | 1          | 连线粗细        |
| `shape`      | string[]           | ["circle"] | 粒子形状        |

## 常见错误

- 误以为 `@tsparticles/particles` 会导出 `tsParticles`——它不会。
- 无意间重复使用同一个 canvas ID。
- 期望高级形状（星形、多边形）——particles 捆绑包基于 basic，仅使用圆形。

## 参见

- [捆绑包概览](/zh/guide/bundles)
- [开始使用](/zh/guide/getting-started)
