# Sea Anemone Preset

Official preset from the `presets/presets/seaAnemone` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-sea-anemone
```

## Ready-to-use (manual start/stop)

```ts
import { createEngine } from "@tsparticles/engine";
const tsParticles = createEngine();
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSeaAnemonePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "seaAnemone",
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

Perfect for organic, flowing underwater-inspired animations.

Demo: <https://particles.js.org/demos/recipes/sea-anemone>
