# 星星预设

来自 `presets/presets/stars` 工作区的官方预设。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/preset-stars
```

## 随时可用（手动启动/停止）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadStarsPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "stars",
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

非常适合太空/宇宙登陆页面和黑暗主题。

演示： <https://particles.js.org/demos/recipes/stars>
