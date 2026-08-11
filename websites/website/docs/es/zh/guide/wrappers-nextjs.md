# 包装：@tsparticles/nextjs

官方 Next.js 包装器构建于 `@tsparticles/react` 之上。

## 安装

```bash
pnpm add @tsparticles/nextjs @tsparticles/engine @tsparticles/slim
```

## 快速设置流程

1. 安装 Next.js 包装器和依赖项。
2. 只为粒子画布保留客户端渲染。
3. 将 `NextParticlesProvider` 放置在应用根目录（`layout.tsx` 或 `_app.tsx`）——它只需渲染一次。
4. 初始化引擎一次并渲染包装器组件。

## Monorepo 参考资料

- 包文件夹：<https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs>
- 演示应用程序：<https://github.com/tsparticles/tsparticles/tree/main/demo/nextjs>、<https://github.com/tsparticles/tsparticles/tree/main/demo/nextjs-legacy>

## 自述文件

- 包装自述文件：<https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs#readme>

## 相关文档

- [`/guide/wrappers`](/zh/guide/wrappers)
- [`/guide/frameworks`](/zh/guide/frameworks)
