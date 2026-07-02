# Big Circles Preset

Official preset from the `presets/presets/bigCircles` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-big-circles
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBigCirclesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "big-circles",
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

Perfect for minimal, modern designs with large animated circles.

Demo: <https://particles.js.org/demos/recipes/big-circles>
