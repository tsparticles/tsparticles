# Squares Preset

Official preset from the `presets/presets/squares` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-squares
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSquaresPreset } from "@tsparticles/preset-squares";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSquaresPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "squares",
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

Perfect for geometric, structured designs and modern layouts.

Demo: <https://particles.js.org/demos/recipes/squares>
