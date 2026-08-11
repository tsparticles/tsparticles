# 萤火虫预设

来自 `presets/presets/firefly` 工作区的官方预设。

在画布内移动鼠标以激活交互式萤火虫行为。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/preset-firefly
```

## 随时可用（手动启动/停止）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireflyPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "firefly",
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

适用于自然英雄部分、讲故事和作品集的优雅预设。

演示： <https://particles.js.org/demos/recipes/firefly>
