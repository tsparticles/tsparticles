# Triangles Preset

Official preset from the `presets/presets/triangles` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-triangles
```

## Ready-to-use (manual start/stop)

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

A solid base for geometric layouts and tech-style design.

Demo: <https://particles.js.org/demos/recipes/triangles>
