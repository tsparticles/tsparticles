# Snow Preset

Official preset from the `presets/presets/snow` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-snow
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSnowPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "snow",
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

Lightweight seasonal preset for winter promotions.

Demo: <https://particles.js.org/demos/recipes/snow>
