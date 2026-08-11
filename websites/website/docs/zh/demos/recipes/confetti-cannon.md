# 五彩纸屑大炮预设

来自 `presets/presets/confettiCannon` 工作区的官方预设。

要触发此预设中的五彩纸屑，请将鼠标拖动到画布区域上。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-cannon
```

## 随时可用（手动启动/停止）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiCannonPreset } from "@tsparticles/preset-confetti-cannon";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiCannonPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiCannon",
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

源文档：<https://github.com/tsparticles/tsparticles/tree/main/presets/confettiCannon#readme>

演示： <https://particles.js.org/demos/recipes/confetti-cannon>
