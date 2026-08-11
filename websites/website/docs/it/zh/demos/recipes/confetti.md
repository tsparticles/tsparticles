# 五彩纸屑预设

来自 `presets/presets/confetti` 工作区的官方预设。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti
```

## 随时可用（手动启动/停止）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confetti",
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

非常适合庆祝活动、公告和节日设计。结合不同的调色板以实现多样性。

演示： <https://particles.js.org/demos/recipes/confetti>
