# Seeanemonen-Voreinstellung

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/seaAnemone`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-sea-anemone
```

## Betriebsbereit (manueller Start/Stopp)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSeaAnemonePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "seaAnemone",
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

Perfekt für organische, fließende Unterwasser-Animationen.

Demo: <https://particles.js.org/demos/recipes/sea-anemone>
