# Wrappers

本页是 wrappers 总览。你可以先选择合适的 package，再进入对应页面查看安装与使用细节。

源码目录: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>

## wrappers 页面

### 先看常用

- [`Angular`](/zh/guide/wrappers-angular)
- [`React`](/zh/guide/wrappers-react)
- [`Svelte`](/zh/guide/wrappers-svelte)
- [`Vue`](/zh/guide/wrappers-vue3)

### React 生态

- [`React`](/zh/guide/wrappers-react)
- [`Next.js`](/zh/guide/wrappers-nextjs)

### Vue 生态

- [`Vue 2`](/zh/guide/wrappers-vue2)
- [`Vue 3`](/zh/guide/wrappers-vue3)
- [`Nuxt 2`](/zh/guide/wrappers-nuxt2)
- [`Nuxt 3`](/zh/guide/wrappers-nuxt3)
- [`Nuxt 4`](/zh/guide/wrappers-nuxt4)

### 其他（按字母顺序）

- [`Angular Confetti`](/zh/guide/wrappers-angular-confetti)
- [`Angular Fireworks`](/zh/guide/wrappers-angular-fireworks)
- [`Astro`](/zh/guide/wrappers-astro)
- [`Ember`](/zh/guide/wrappers-ember)
- [`Inferno`](/zh/guide/wrappers-inferno)
- [`jQuery`](/zh/guide/wrappers-jquery)
- [`Lit`](/zh/guide/wrappers-lit)
- [`Preact`](/zh/guide/wrappers-preact)
- [`Qwik`](/zh/guide/wrappers-qwik)
- [`Riot`](/zh/guide/wrappers-riot)
- [`Solid`](/zh/guide/wrappers-solid)
- [`Stencil`](/zh/guide/wrappers-stencil)
- [`Web Components`](/zh/guide/wrappers-webcomponents)
- [`WordPress`](/zh/guide/wrappers-wordpress)

## 通用集成流程

不管使用哪个 framework，流程都一致：

1. 安装 wrapper + `@tsparticles/engine`
2. 功能只加载一次（`@tsparticles/slim`、`@tsparticles/all` 或自定义 plugins）
3. 传入 options 并渲染 wrapper 组件

## 官方 wrappers（按字母顺序）

本节排序规则：

- 按 package 名字母排序
- 例外会在 mapping 说明里明确标注（例如 WordPress 需要完整环境）

- `@tsparticles/angular`: Angular 组件 wrapper（`<ngx-particles />`）  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular#readme> - 本地指南: [`/guide/wrappers-angular`](/zh/guide/wrappers-angular)
- `@tsparticles/astro`: Astro 组件 wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/astro#readme> - 本地指南: [`/guide/wrappers-astro`](/zh/guide/wrappers-astro)
- `@tsparticles/ember`: Ember wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/ember#readme> - 本地指南: [`/guide/wrappers-ember`](/zh/guide/wrappers-ember)
- `@tsparticles/inferno`: Inferno 组件 wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/inferno#readme> - 本地指南: [`/guide/wrappers-inferno`](/zh/guide/wrappers-inferno)
- `@tsparticles/jquery`: jQuery plugin wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery#readme> - 本地指南: [`/guide/wrappers-jquery`](/zh/guide/wrappers-jquery)
- `@tsparticles/lit`: Lit 组件 package  
  Source: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/lit> - 本地指南: [`/guide/wrappers-lit`](/zh/guide/wrappers-lit)
- `@tsparticles/nextjs`: 基于 `@tsparticles/react` 的 Next.js wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs#readme> - 本地指南: [`/guide/wrappers-nextjs`](/zh/guide/wrappers-nextjs)
- `@tsparticles/nuxt2`: Nuxt 2 模块（客户端注册）  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt2#readme> - 本地指南: [`/guide/wrappers-nuxt2`](/zh/guide/wrappers-nuxt2)
- `@tsparticles/nuxt3`: Nuxt 3 模块（客户端注册）  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt3#readme> - 本地指南: [`/guide/wrappers-nuxt3`](/zh/guide/wrappers-nuxt3)
- `@tsparticles/nuxt4`: Nuxt 4 模块（客户端注册）  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt4#readme> - 本地指南: [`/guide/wrappers-nuxt4`](/zh/guide/wrappers-nuxt4)
- `@tsparticles/preact`: Preact 组件 wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/preact#readme> - 本地指南: [`/guide/wrappers-preact`](/zh/guide/wrappers-preact)
- `@tsparticles/qwik`: Qwik 组件 wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/qwik#readme> - 本地指南: [`/guide/wrappers-qwik`](/zh/guide/wrappers-qwik)
- `@tsparticles/react`: React 组件 wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react#readme> - 本地指南: [`/guide/wrappers-react`](/zh/guide/wrappers-react)
- `@tsparticles/riot`: Riot wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/riot#readme> - 本地指南: [`/guide/wrappers-riot`](/zh/guide/wrappers-riot)
- `@tsparticles/solid`: Solid 组件 wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/solid#readme> - 本地指南: [`/guide/wrappers-solid`](/zh/guide/wrappers-solid)
- `@tsparticles/stencil`: Stencil 组件 wrapper（`<stencil-particles />`）  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/stencil#readme> - 本地指南: [`/guide/wrappers-stencil`](/zh/guide/wrappers-stencil)
- `@tsparticles/svelte`: Svelte 组件 wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/svelte#readme> - 本地指南: [`/guide/wrappers-svelte`](/zh/guide/wrappers-svelte)
- `@tsparticles/vue2`: Vue 2 组件 wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/vue2#readme> - 本地指南: [`/guide/wrappers-vue2`](/zh/guide/wrappers-vue2)
- `@tsparticles/vue3`: Vue 3 组件 wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/vue3#readme> - 本地指南: [`/guide/wrappers-vue3`](/zh/guide/wrappers-vue3)
- `@tsparticles/webcomponents`: Web Components wrapper（`<web-particles />`）  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/webcomponents#readme> - 本地指南: [`/guide/wrappers-webcomponents`](/zh/guide/wrappers-webcomponents)
- `@tsparticles/wordpress`: 官方 WordPress plugin package  
  Source: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/wordpress> - 本地指南: [`/guide/wrappers-wordpress`](/zh/guide/wrappers-wordpress)
- `angular-confetti`: 面向 `@tsparticles/confetti` 的 Angular wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular-confetti#readme> - 本地指南: [`/guide/wrappers-angular-confetti`](/zh/guide/wrappers-angular-confetti)
- `angular-fireworks`: 面向 `@tsparticles/fireworks` 的 Angular wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular-fireworks#readme> - 本地指南: [`/guide/wrappers-angular-fireworks`](/zh/guide/wrappers-angular-fireworks)

## WordPress 与 Elementor 说明

- `@tsparticles/wordpress` 是官方 plugin package，需完整的 WordPress 环境。
- Elementor 没有官方独立的 `tsParticles` plugin package。
- README 中提到可通过 Premium Addons for Elementor 集成：
  <https://premiumaddons.com/particles-section-addon-for-elementor-page-builder/>

## wrapper 到 demo 的映射

使用下表可快速从 wrapper package 跳转到可运行的 monorepo demo。

表格排序规则：

- 按 wrapper package 名字母排序
- 对 demo 不适用的 wrapper 作显式例外（`@tsparticles/wordpress`）

demo 源目录: <https://github.com/tsparticles/tsparticles/tree/main/demo>

| Wrapper package              | Demo project                        |
| ---------------------------- | ----------------------------------- |
| `@tsparticles/angular`       | `demo/angular`                      |
| `@tsparticles/astro`         | `demo/astro`                        |
| `@tsparticles/ember`         | `demo/ember`                        |
| `@tsparticles/inferno`       | `demo/inferno`                      |
| `@tsparticles/jquery`        | `demo/jquery`                       |
| `@tsparticles/lit`           | `demo/lit`                          |
| `@tsparticles/nextjs`        | `demo/nextjs`, `demo/nextjs-legacy` |
| `@tsparticles/nuxt2`         | `demo/nuxt2`                        |
| `@tsparticles/nuxt3`         | `demo/nuxt3`                        |
| `@tsparticles/nuxt4`         | `demo/nuxt4`                        |
| `@tsparticles/preact`        | `demo/preact`                       |
| `@tsparticles/qwik`          | `demo/qwik`                         |
| `@tsparticles/react`         | `demo/react`                        |
| `@tsparticles/riot`          | `demo/riot`                         |
| `@tsparticles/solid`         | `demo/solid`                        |
| `@tsparticles/stencil`       | `demo/stencil`                      |
| `@tsparticles/svelte`        | `demo/svelte`, `demo/svelte-kit`    |
| `@tsparticles/vue2`          | `demo/vue2`                         |
| `@tsparticles/vue3`          | `demo/vue3`                         |
| `@tsparticles/webcomponents` | `demo/webcomponents`                |
| `@tsparticles/wordpress`     | 不适用（需要完整 WordPress 安装）   |
| `angular-confetti`           | `demo/angular`                      |
| `angular-fireworks`          | `demo/angular`                      |

## 最小模式

### React / Next.js 风格 Provider

> [!IMPORTANT]
> Place `ParticlesProvider` at your app root (e.g., `main.tsx` or `layout.tsx`), not inside a component that may unmount.
> The `init` callback runs only once for the entire app lifecycle.

```tsx
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const init = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

export function Background() {
  return (
    <ParticlesProvider init={init}>
      <Particles id="tsparticles" options={{ particles: { move: { enable: true } } }} />
    </ParticlesProvider>
  );
}
```

### Vue / Nuxt 风格注册函数

```ts
import type { Engine } from "@tsparticles/engine";

export async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

  await loadSlim(engine);
}
```

### Angular 单次初始化

```ts
import { NgParticlesService } from "@tsparticles/angular";
import { loadSlim } from "@tsparticles/slim";

constructor(private readonly particlesService: NgParticlesService) {}

ngOnInit(): void {
  void this.particlesService.init(async engine => {
    await loadSlim(engine);
  });
}
```

## 相关页面

- [`/guide/frameworks`](/zh/guide/frameworks)
- [`/guide/getting-started`](/zh/guide/getting-started)
- [`/demos/`](/zh/demos/)
