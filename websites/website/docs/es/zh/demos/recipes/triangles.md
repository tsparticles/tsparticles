# 三角形预设

来自 `presets/presets/triangles` 工作区的官方预设。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/preset-triangles
```

## 随时可用（手动启动/停止）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadTrianglesPreset } from "@tsparticles/preset-triangles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadTrianglesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "triangles",
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

几何布局和科技风格设计的坚实基础。

演示： <https://particles.js.org/demos/recipes/triangles>
