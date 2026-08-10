# Fireworks Preset

Official preset from the `presets/presets/fireworks` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fireworks
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireworksPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fireworks",
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

High-impact preset: run it only on explicit user interaction (CTA click).

Demo: <https://particles.js.org/demos/recipes/fireworks>
