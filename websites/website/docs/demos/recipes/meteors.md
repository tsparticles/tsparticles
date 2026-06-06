# Meteors Preset

Official preset from the `presets/meteors` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-meteors
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadMeteorsPreset } from "@tsparticles/preset-meteors";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadMeteorsPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "meteors",
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

Perfect for shooting star effects, meteor showers, and dynamic trail animations.
