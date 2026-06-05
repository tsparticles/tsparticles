# 捆绑包：Fireworks

`@tsparticles/fireworks` 提供了简化的 API，只需一次函数调用即可创建烟花效果。支持声音、自定义颜色和实例控制（暂停/播放）。

## 包含的功能

**形状：** 线条、圆形（来自 basic）

**内部插件：** emitters（发射器）、emitters-shape-square（方形发射器）、blend（混合）、sounds（声音）

**更新器：** destroy（销毁）、life（生命周期）、paint（绘制）、rotate（旋转）

**API：** `fireworks(options)`——返回一个可控制的实例

## 何时使用

- 新年或庆祝效果
- 庆祝 UI
- 你不想手动配置引擎

## 安装

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/fireworks
```

```ts
import { fireworks } from "@tsparticles/fireworks";

// 基本效果
const instance = await fireworks({
  colors: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
  sounds: true,
});

// 实例控制
instance?.pause();
instance?.play();

// 在特定 canvas 上
await fireworks("my-canvas", {
  rate: 3,
  speed: { min: 10, max: 25 },
  sounds: false,
});
```

### CDN（script 标签）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js"></script>
<script>
  // 立即播放烟花
  fireworks();
</script>
```

### 主要参数

| 参数         | 类型         | 默认值 | 描述            |
| ------------ | ------------ | ------ | --------------- |
| `colors`     | string[]     | —      | 爆炸颜色        |
| `rate`       | number       | —      | 每秒烟花数      |
| `speed`      | { min, max } | —      | 粒子速度        |
| `sounds`     | boolean      | true   | 启用音效        |
| `gravity`    | number       | —      | 重力（默认：0） |
| `opacity`    | number       | —      | 不透明度（0-1） |
| `brightness` | { min, max } | —      | 爆炸亮度        |

## 常见错误

- 误以为 `@tsparticles/fireworks` 会导出 `tsParticles`——它不会。
- 在循环中调用 `fireworks()` 而不管理实例——该效果本身就是持续进行的。
- 离开页面时没有停止实例——调用 `instance?.pause()` 或 `instance?.stop()`。

## 参见

- [捆绑包概览](/zh/guide/bundles)
- [彩纸捆绑包](/zh/guide/bundles-confetti)
