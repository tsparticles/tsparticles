# Stars Preset

Official preset from the `presets/presets/stars` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-stars
```

## Ready-to-use (manual start/stop)

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

Perfect for space/cosmic landing pages and dark themes.

Demo: <https://particles.js.org/demos/recipes/stars>
