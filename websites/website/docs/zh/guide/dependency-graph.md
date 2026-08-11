# 依赖图

这是主 `tsParticles` README 中公开的包分层的实用图。

有关完整、详尽的图表，请参阅：

- <https://github.com/tsparticles/tsparticles/blob/main/README.md#dependency-graph>

## 高级包流程

```text
tsParticles Engine
`- tsParticles Basic
   |- tsParticles Particles
   |- tsParticles Confetti
   |- tsParticles Fireworks
   `- tsParticles Slim
      `- tsparticles
         `- tsParticles All
```

## 如何使用此地图

- 对于大多数生产应用程序，从 `engine` + `slim` 开始。
- 如果您需要额外的内置交互/插件，请移至 `tsparticles`。
- 仅当您需要完整的功能集时才移至 `all`。
- 使用专用捆绑包（`confetti`、`fireworks`、`particles`）来获得集中效果。

## 相关页面

- [`/guide/getting-started`](/zh/guide/getting-started)
- [`/guide/installation`](/zh/guide/installation)
- [`/options/performance`](/zh/options/performance)
