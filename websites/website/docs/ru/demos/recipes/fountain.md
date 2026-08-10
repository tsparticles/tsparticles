# Fountain Preset

Official preset from the `presets/presets/fountain` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fountain
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFountainPreset } from "@tsparticles/preset-fountain";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFountainPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fountain",
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

Perfect for elegant, flowing particle animations and water-themed effects.

Demo: <https://particles.js.org/demos/recipes/fountain>
