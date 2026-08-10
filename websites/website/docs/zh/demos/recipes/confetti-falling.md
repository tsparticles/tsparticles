# Confetti Falling Preset

Official preset from the `presets/presets/confettiFalling` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-falling
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiFallingPreset } from "@tsparticles/preset-confetti-falling";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiFallingPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiFalling",
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

Demo: <https://particles.js.org/demos/recipes/confetti-falling>

Source docs: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiFalling#readme>
