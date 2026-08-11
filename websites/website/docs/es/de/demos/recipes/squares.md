# Quadrate voreingestellt

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/squares`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-squares
```

## Betriebsbereit (manueller Start/Stopp)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSquaresPreset } from "@tsparticles/preset-squares";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSquaresPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "squares",
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

Perfekt für geometrische, strukturierte Designs und moderne Layouts.

Demo: <https://particles.js.org/demos/recipes/squares>
