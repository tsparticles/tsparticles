# Schneevoreinstellung

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/snow`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-snow
```

## Betriebsbereit (manueller Start/Stopp)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSnowPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "snow",
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

Leichte saisonale Voreinstellung für Winteraktionen.

Demo: <https://particles.js.org/demos/recipes/snow>
