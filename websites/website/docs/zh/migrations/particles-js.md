# 迁移和兼容性

如果您要从 `particles.js` 迁移，请使用以下顺序：

1. 将旧脚本/包替换为 `@tsparticles/engine` + 捆绑包 (`@tsparticles/slim`)
2. 迁移旧配置，并逐步映射不支持的字段
3. 逐项测试交互（悬停/点击/链接）

## 规范迁移注释

- 官方迁移指南来源：[`tsparticles/markdown/pjsMigration.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/pjsMigration.md)
- 演示文件夹中提供了旧版兼容性示例。

## 兼容包

如果您在迁移旧配置时需要桥接层：

- npm：<https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr：<https://www.jsdelivr.com/package/npm/@tsparticles/pjs>

进一步阅读：

- 迁移文章：<https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m>
- 切换的 5 个理由：<https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe>

## 常用映射技巧

- 旧的 `particlesJS(...)` init 变为 `tsParticles.load({ id, options })`。
- 许多旧值在 `particles`、`interactivity` 和 `detectRetina` 下仍然具有直接等效项。
- 新的插件驱动架构意味着一些高级功能需要显式包加载。

## 生产迁移清单

- 验证桌面和移动设备中的视觉奇偶性。
- 验证 CPU/GPU 对低端设备的影响。
- 验证没有选项键被静默忽略。
- 在发布周之前固定确切的软件包版本。

## 从画布五彩纸屑迁移到 `@tsparticles/confetti`

如果您要从 `canvas-confetti` 迁移，最简单的切换是将命令式调用替换为 `@tsparticles/confetti` API 调用。

## 典型映射

- `confetti({...})` -> `await confetti({...})`
- 自定义画布 -> `const local = await confetti.create(canvas, defaults)` 然后 `await local({...})`
- 重复拍摄 -> 保留现有的计时器/循环，在这些回调中调用 `await confetti(...)`

## 转换示例

之前（`canvas-confetti` 样式）：

```ts
import confetti from "canvas-confetti";

confetti({
  particleCount: 90,
  spread: 70,
  origin: { x: 0.5, y: 0.6 },
});
```

(`@tsparticles/confetti`) 之后：

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 90,
  spread: 70,
  position: { x: 50, y: 60 },
});
```

## 选项名称注释

- `particleCount` -> `count`
- `0..1` 中的 `origin.x`/`origin.y` -> `0..100` 中的 `position.x`/`position.y`
- `startVelocity`、`spread`、`angle` 和 `colors` 保持相同的语义

有关完整的 API 和帮助程序，请参阅：<https://github.com/tsparticles/tsparticles/tree/main/bundles/confetti#readme>
