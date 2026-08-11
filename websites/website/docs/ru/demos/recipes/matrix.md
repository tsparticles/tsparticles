# Matrix Preset

Official preset from the `presets/presets/matrix` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-matrix
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadMatrixPreset } from "@tsparticles/preset-matrix";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadMatrixPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "matrix",
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

Perfect for tech/hacker aesthetic designs and digital themes.

Demo: <https://particles.js.org/demos/recipes/matrix>
