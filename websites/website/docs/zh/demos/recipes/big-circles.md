# 大圆圈预设

来自 `presets/presets/bigCircles` 工作区的官方预设。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/preset-big-circles
```

## 随时可用（手动启动/停止）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBigCirclesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "big-circles",
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

非常适合带有大型动画圆圈的简约现代设计。

演示： <https://particles.js.org/demos/recipes/big-circles>
