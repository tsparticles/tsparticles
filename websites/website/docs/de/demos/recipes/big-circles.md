# Große Kreise voreingestellt

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/bigCircles`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-big-circles
```

## Betriebsbereit (manueller Start/Stopp)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBigCirclesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "big-circles",
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

Perfekt für minimalistische, moderne Designs mit großen animierten Kreisen.

Demo: <https://particles.js.org/demos/recipes/big-circles>
