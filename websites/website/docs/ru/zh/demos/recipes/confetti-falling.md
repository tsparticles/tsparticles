# 五彩纸屑掉落预设

来自 `presets/presets/confettiFalling` 工作区的官方预设。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-falling
```

## 随时可用（手动启动/停止）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiFallingPreset } from "@tsparticles/preset-confetti-falling";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiFallingPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiFalling",
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

源文档：<https://github.com/tsparticles/tsparticles/tree/main/presets/confettiFalling#readme>

演示： <https://particles.js.org/demos/recipes/confetti-falling>
