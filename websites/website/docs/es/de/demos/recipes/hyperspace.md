# Hyperraum-Voreinstellung

Offizielle Voreinstellung für den Arbeitsbereich `presets/presets/hyperspace`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-hyperspace
```

## Gebrauchsfertig (Start-/Stopp-Handbuch)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadHyperspacePreset } from "@tsparticles/preset-hyperspace";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadHyperspacePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "hyperspace",
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

Ottimo für die Abschnitte Wow-Effekt und Einführungsprodukt.

Demo: <https://particles.js.org/demos/recipes/hyperspace>
