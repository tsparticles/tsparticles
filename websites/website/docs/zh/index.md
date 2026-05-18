---
layout: home

title: tsParticles
titleTemplate: 几分钟内创建富有表现力的粒子背景

hero:
  name: tsParticles
  text: 强大的粒子引擎，配合简洁顺手的开发流程
  tagline: 在任意 framework 中快速交付交互式背景、特效与彩纸效果。
  image:
    src: https://particles.js.org/images/banner3.png
    alt: tsParticles
  actions:
    - theme: brand
      text: 开始使用
      link: /zh/guide/getting-started
    - theme: alt
      text: 打开 Playground
      link: /zh/playground/
    - theme: alt
      text: 即用演示
      link: /zh/demos/

features:
  - title: 快速上手
    details: 从最小配置开始，逐步扩展到 presets、plugins 和自定义 shapes。
  - title: framework 就绪
    details: 支持 React、Vue、Angular、Svelte、Solid、Web Components 和 Vanilla JavaScript。
  - title: 面向生产
    details: 通过 @tsparticles/basic、@tsparticles/slim、tsparticles 或 @tsparticles/all 控制 bundle 大小。
  - title: 专注 API
    details: 使用 @tsparticles/particles、@tsparticles/confetti 和 @tsparticles/fireworks 一次调用即可完成集成。
---

## 为什么这样组织文档

本站围绕最常见的问题重新设计：**“现在该如何使用 tsParticles？”**

- 5 分钟内从可运行示例起步。
- 无需翻找多个仓库也能选对 package。
- 快速定位 options、config、presets 与 palettes。
- 仅在需要时启用重特效，并配合明确的开始/暂停控制。

## 建议先读这些页面

1. [`/guide/getting-started`](/zh/guide/getting-started)：安装、首次渲染、最小选项。
2. [`/guide/installation`](/zh/guide/installation)：CDN/package manager 安装矩阵与 import 方式。
3. [`/playground/`](/zh/playground/)：按命令启动演示并实时编辑 JSON。
4. [`/demos/`](/zh/demos/)：可直接用于生产的配方示例。
5. [`/options/`](/zh/options/)：根选项地图与深层链接。
6. [`/migrations/particles-js`](/zh/migrations/particles-js)：从 particles.js 迁移及兼容说明。
7. [`/guide/wrappers`](/zh/guide/wrappers)：官方 wrappers 与各 framework 入口。
8. [`/guide/plugins-customization`](/zh/guide/plugins-customization)：自定义形状、presets 与 plugin 扩展。
9. [`/guide/templates-resources`](/zh/guide/templates-resources)：起步仓库与可复用资源。
10. [`/guide/video-tutorials`](/zh/guide/video-tutorials)：官方视频演示与参考资料。
11. [`/guide/dependency-graph`](/zh/guide/dependency-graph)：engine 与 bundles 的依赖关系图。

## 核心源码与关键目录

- 主 monorepo: [github.com/tsparticles/tsparticles](https://github.com/tsparticles/tsparticles)
- 主 README（快速上手、wrappers、presets）: [README.md](https://github.com/tsparticles/tsparticles/blob/main/README.md)
- wrappers 目录: [`tsparticles/wrappers`](https://github.com/tsparticles/tsparticles/tree/main/wrappers)
- demo 应用目录: [`tsparticles/demo`](https://github.com/tsparticles/tsparticles/tree/main/demo)
- presets 目录: [`tsparticles/presets`](https://github.com/tsparticles/tsparticles/tree/main/presets)
- palettes 目录: [`tsparticles/palettes`](https://github.com/tsparticles/tsparticles/tree/main/palettes)
- root options 源文档: [`tsparticles/markdown/Options.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/Options.md)
- migration 源文档: [`tsparticles/markdown/pjsMigration.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/pjsMigration.md)

## 支持项目

- 赞助 Matteo Bruni: <https://github.com/matteobruni>
- 赞助 tsParticles organization: <https://github.com/tsparticles>
