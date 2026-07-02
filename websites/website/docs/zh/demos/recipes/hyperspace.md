# 超空间预设

预设官方工作区 `presets/presets/hyperspace`。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/preset-hyperspace
```

## 即用型（手动启动/停止）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadHyperspacePreset } from "@tsparticles/preset-hyperspace";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadHyperspacePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "hyperspace",
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

Ottimo 讲述了令人惊叹的效果和介绍产品。

演示： <https://particles.js.org/demos/recipes/hyperspace>
