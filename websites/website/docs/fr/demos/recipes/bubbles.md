# Bubbles Preset

Official preset from the `presets/presets/bubbles` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-bubbles
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBubblesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "bubbles",
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

Useful for interactive sections with more visible motion.

Demo: <https://particles.js.org/demos/recipes/bubbles>
