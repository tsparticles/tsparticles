# Fire Preset

Official preset from the `presets/presets/fire` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fire
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFirePreset } from "@tsparticles/preset-fire";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFirePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fire",
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

Perfect for dramatic, high-energy designs and effect demonstrations.

Demo: <https://particles.js.org/demos/recipes/fire>
