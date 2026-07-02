# 喷泉预设

来自 `presets/presets/fountain` 工作区的官方预设。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fountain
```

## 随时可用（手动启动/停止）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFountainPreset } from "@tsparticles/preset-fountain";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFountainPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fountain",
    },
  });
}

export function stop(): void {
  container?.pause();
}

export function resume(): void {
  container?.play();
}
```

非常适合优雅、流畅的粒子动画和水主题效果。

演示： <https://particles.js.org/demos/recipes/fountain>
