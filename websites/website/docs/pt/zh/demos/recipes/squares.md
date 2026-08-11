# 方块预设

来自 `presets/presets/squares` 工作区的官方预设。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/preset-squares
```

## 随时可用（手动启动/停止）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSquaresPreset } from "@tsparticles/preset-squares";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSquaresPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "squares",
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

非常适合几何、结构化设计和现代布局。

演示： <https://particles.js.org/demos/recipes/squares>
