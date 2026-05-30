# 包装：@tsparticles/react

`tsParticles` 的官方 React 包装器。

## 安装

```bash
pnpm add @tsparticles/react @tsparticles/engine @tsparticles/slim
```

## 快速设置流程

1. 安装wrapper+engine+loader包。
2. 将 `ParticlesProvider` 放置在应用根目录（例如 `main.tsx` 或 `layout.tsx`）——它只需在整个应用生命周期内渲染一次。
3. 使用 `ParticlesProvider` 和 `loadSlim` 初始化一次。
4. 使用类型化选项渲染 `Particles` 组件。

## Monorepo 参考资料

- 包文件夹：<https://github.com/tsparticles/tsparticles/tree/main/wrappers/react>
- 演示应用程序：<https://github.com/tsparticles/tsparticles/tree/main/demo/react>

## 自述文件

- 包装自述文件：<https://github.com/tsparticles/tsparticles/tree/main/wrappers/react#readme>

## 相关文档

- [`/guide/wrappers`](/zh/guide/wrappers)
- [`/guide/frameworks`](/zh/guide/frameworks)
