# Framework 集成

`tsParticles` 支持多种 wrappers，但 runtime 流程始终一致：

1. 只初始化一次 engine
2. 仅加载需要的功能（`@tsparticles/slim`、`@tsparticles/all` 或自定义 plugins）
3. 使用 options 渲染 wrapper 组件

## 快速检查清单

- 保持所有 `@tsparticles/*` 版本一致。
- 在应用启动时只执行一次 loader。
- 从小的 options 对象开始，再逐步扩展。
- 对于 SSR framework，仅在客户端挂载粒子。

## 从 wrappers 指南开始

完整的 wrappers 矩阵（React、Next.js、Vue/Nuxt、Angular、Svelte、Solid 等）请查看：

- [`/guide/wrappers`](/zh/guide/wrappers)

## 核心集成示例

### React

> [!IMPORTANT]
> Place `ParticlesProvider` at your app root (e.g., `main.tsx` or `layout.tsx`), not inside a component that may unmount.
> The `init` callback runs only once for the entire app lifecycle.

```tsx
import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const init = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

export function ParticlesBackground() {
  const options = useMemo(
    () => ({
      particles: {
        move: { enable: true },
        number: { value: 60 },
      },
    }),
    [],
  );

  return (
    <ParticlesProvider init={init}>
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}
```

### Vue 3

```ts
import { createApp } from "vue";
import Particles from "@tsparticles/vue3";
import type { Engine } from "@tsparticles/engine";
import App from "./App.vue";

async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

  await loadSlim(engine);
}

const app = createApp(App);

app.use(Particles, { init: registerParticles });
app.mount("#app");
```

### Angular

```ts
import { Component, OnInit } from "@angular/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { NgParticlesService } from "@tsparticles/angular";
import { loadSlim } from "@tsparticles/slim";

@Component({
  selector: "app-root",
  template: `<ngx-particles [id]="id" [options]="options"></ngx-particles>`,
})
export class AppComponent implements OnInit {
  id = "tsparticles";
  options: ISourceOptions = {
    particles: {
      move: { enable: true },
      number: { value: 70 },
    },
  };

  constructor(private readonly particlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.particlesService.init(async (engine) => {
      await loadSlim(engine);
    });
  }
}
```

## 实用建议

- 大多数应用可优先使用 `@tsparticles/slim` 作为基线。
- options 增长后，建议拆分到独立配置文件。
- 对于高开销场景，在 UI 中提供开始/停止控制。

## 参考来源

- wrappers 源码: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- framework demos 源码: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- engine package: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- bundles: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
