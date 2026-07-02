# 气泡预设

来自 `presets/presets/bubbles` 工作区的官方预设。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/preset-bubbles
```

## 随时可用（手动启动/停止）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBubblesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "bubbles",
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

对于具有更明显运动的交互部分很有用。

演示： <https://particles.js.org/demos/recipes/bubbles>
