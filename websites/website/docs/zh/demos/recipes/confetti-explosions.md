# 五彩纸屑爆炸预设

来自 `presets/presets/confettiExplosions` 工作区的官方预设。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-explosions
```

## 随时可用（手动启动/停止）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiExplosionsPreset } from "@tsparticles/preset-confetti-explosions";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiExplosionsPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiExplosions",
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

源文档：<https://github.com/tsparticles/tsparticles/tree/main/presets/confettiExplosions#readme>

演示： <https://particles.js.org/demos/recipes/confetti-explosions>
