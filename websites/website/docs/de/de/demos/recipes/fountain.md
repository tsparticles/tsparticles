# Brunnenvoreinstellung

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/fountain`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fountain
```

## Betriebsbereit (manueller Start/Stopp)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFountainPreset } from "@tsparticles/preset-fountain";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFountainPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fountain",
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

Perfekt für elegante, fließende Partikelanimationen und Wassereffekte.

Demo: <https://particles.js.org/demos/recipes/fountain>
