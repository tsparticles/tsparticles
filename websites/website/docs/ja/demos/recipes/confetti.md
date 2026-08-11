# Confetti Preset

Official preset from the `presets/presets/confetti` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confetti",
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

Perfect for celebrations, announcements, and festive designs. Combine with different color palettes for variety.

Demo: <https://particles.js.org/demos/recipes/confetti>
