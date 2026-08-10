# Firefly Preset

Official preset from the `presets/presets/firefly` workspace.

Move the mouse inside the canvas to activate the interactive firefly behavior.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-firefly
```

## Ready-to-use (manual start/stop)

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

Elegant preset for natural hero sections, storytelling, and portfolios.

Demo: <https://particles.js.org/demos/recipes/firefly>
