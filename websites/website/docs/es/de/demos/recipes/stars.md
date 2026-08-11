# Sterne voreingestellt

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/stars`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-stars
```

## Betriebsbereit (manueller Start/Stopp)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadStarsPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "stars",
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

Perfekt für Weltraum-/kosmische Landingpages und dunkle Themen.

Demo: <https://particles.js.org/demos/recipes/stars>
