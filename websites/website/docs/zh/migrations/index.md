# Versioning & Migration

使用此部分在 `tsParticles` 主要版本之间导航、跟踪发布和了解版本控制。

## 迁移指南

- [`从 v3.x 迁移`](/zh/migrations/from-v3)
- [`从 v2.x 迁移`](/zh/migrations/from-v2)
- [`从 v1.x 迁移`](/zh/migrations/from-v1)

## 快速路线

- 从 `v3.x` 开始：查看 [`/zh/migrations/from-v3`](/zh/migrations/from-v3)（重点：选项键更改 + 包重命名）。
- 从 `v2.x` 开始：查看 [`/zh/migrations/from-v2`](/zh/migrations/from-v2)（重点：`load(...)` API + 选项）。
- 从 `v1.x` 开始：查看 [`/zh/migrations/from-v1`](/zh/migrations/from-v1)（重点：包、加载器、选项）。

## 迁移通常在哪里失败

大多数主要版本迁移会在两个地方失败：

1. **Load API 形式**（旧的位置参数 vs 新的对象参数）。
2. **选项模式**（重命名/移动的键）。

如果您的应用可以编译但显示错误，请从选项映射开始。

## 快速查找

- [选项重命名矩阵](/zh/migrations/option-rename-matrix) — 旧版与当前选项键的快速映射。

## 其他有用信息

- [更新日志](/zh/migrations/changelog) — 最新发布说明。
- [发布与版本控制](/zh/migrations/releases) — 版本对齐规则和发布清单。
- [particles.js 迁移](/zh/migrations/particles-js) — 从旧版 `particles.js` 或 `canvas-confetti` 迁移。
