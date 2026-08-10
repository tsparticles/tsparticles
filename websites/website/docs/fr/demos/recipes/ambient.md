# Ambient Preset

Official preset from the `presets/presets/ambient` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-ambient
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAmbientPreset } from "@tsparticles/preset-ambient";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadAmbientPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "ambient",
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

Great for soft, continuous backgrounds with low visual noise.

Demo: <https://particles.js.org/demos/recipes/ambient>
