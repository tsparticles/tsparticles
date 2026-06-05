# 捆绑包：Confetti

`@tsparticles/confetti` 提供了简化的 API，只需一次函数调用即可创建彩纸效果。无需直接操作 `tsParticles`。

## 包含的功能

**形状：** 圆形、心形、扑克花色（红心、方块、梅花、黑桃）、emoji、图片、多边形、方形、星形

**内部插件：** emitters（发射器）、motion（尊重用户减少动效的偏好）

**更新器：** life（生命周期）、roll（滚动）、rotate（旋转）、tilt（倾斜）、wobble（摆动）

**API：** `confetti(options)` 或 `confetti(canvasId, options)`

## 何时使用

- "恭喜！"或"生日快乐！"按钮
- 快速庆祝效果
- 你不想手动配置引擎

## 安装

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/confetti
```

```ts
import { confetti } from "@tsparticles/confetti";

// 基本效果
await confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.5 },
});

// 在特定 canvas 上
await confetti("my-canvas-id", {
  particleCount: 50,
  angle: 90,
  spread: 45,
  colors: ["#ff0000", "#00ff00", "#0000ff"],
});
```

### CDN（script 标签）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({
    particleCount: 100,
    spread: 70,
    colors: ["#bb0000", "#ffffff"],
  });
</script>
```

### 主要参数

| 参数            | 类型     | 默认值       | 描述                                               |
| --------------- | -------- | ------------ | -------------------------------------------------- |
| `particleCount` | number   | 50           | 彩纸数量                                           |
| `spread`        | number   | 60           | 扩散角度（度）                                     |
| `angle`         | number   | 90           | 方向（度，90 = 向下）                              |
| `startVelocity` | number   | 30           | 初始速度                                           |
| `colors`        | string[] | —            | 彩纸颜色                                           |
| `origin`        | { x, y } | { 0.5, 0.5 } | 原点（0-1）                                        |
| `drift`         | number   | 0            | 水平漂移                                           |
| `shapes`        | string[] | —            | 形状："circle"、"heart"、"square"、"star"、"cards" |

## 常见错误

- 误以为 `@tsparticles/confetti` 会导出 `tsParticles`——它不会。
- 无意间重复使用同一个 canvas ID。
- 在循环中调用 `confetti` 而不考虑性能——使用合理的间隔，或在动画完成后停止。

## 参见

- [捆绑包概览](/zh/guide/bundles)
- [烟花捆绑包](/zh/guide/bundles-fireworks)
