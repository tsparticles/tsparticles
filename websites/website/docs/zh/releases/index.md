# 发布和版本控制

该项目现在从单个存储库发货：`tsparticles/tsparticles`。

<WebsiteVersionInfo />

## 发布工作发生的地方

- Monorepo 根：<https://github.com/tsparticles/tsparticles>
- 捆绑包：<https://github.com/tsparticles/tsparticles/tree/main/bundles>
- 引擎：<https://github.com/tsparticles/tsparticles/tree/main/engine>
- 包装器：<https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- 预设：<https://github.com/tsparticles/tsparticles/tree/main/presets>
- 调色板：<https://github.com/tsparticles/tsparticles/tree/main/palettes>

## 版本对齐规则

- 使所有 `@tsparticles/*` 包与同一发布行对齐。
- 避免在一个应用程序中混合不同的测试版或主要版本。

## 实用发布清单

1. 验证工作区 `package.json` 文件中的目标包版本。
2. 构建并测试受影响的项目。
3. 验证文档链接和游乐场行为。
4. 从 monorepo 发布流程发布。
