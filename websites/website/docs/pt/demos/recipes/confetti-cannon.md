# Confetti Cannon Preset

Official preset from the `presets/presets/confettiCannon` workspace.

To trigger confetti in this preset, drag the mouse over the canvas area.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-cannon
```

## Ready-to-use (manual start/stop)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiCannonPreset } from "@tsparticles/preset-confetti-cannon";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiCannonPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiCannon",
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

Demo: <https://particles.js.org/demos/recipes/confetti-cannon>

Source docs: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiCannon#readme>
