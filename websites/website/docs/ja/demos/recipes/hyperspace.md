# Hyperspace Preset

Preset ufficiale dal workspace `presets/presets/hyperspace`.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-hyperspace
```

## Ready-to-use (start/stop manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadHyperspacePreset } from "@tsparticles/preset-hyperspace";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadHyperspacePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "hyperspace",
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

Ottimo per sezioni wow-effect e intro prodotto.

Demo: <https://particles.js.org/demos/recipes/hyperspace>
