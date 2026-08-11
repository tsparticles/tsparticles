# 海葵预设

来自 `presets/presets/seaAnemone` 工作区的官方预设。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/preset-sea-anemone
```

## 随时可用（手动启动/停止）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSeaAnemonePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "seaAnemone",
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

非常适合有机、流畅的水下动画。

演示： <https://particles.js.org/demos/recipes/sea-anemone>
