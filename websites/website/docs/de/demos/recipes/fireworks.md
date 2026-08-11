# Feuerwerksvoreinstellung

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/fireworks`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fireworks
```

## Betriebsbereit (manueller Start/Stopp)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireworksPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fireworks",
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

Wirkungsvolle Voreinstellung: Führen Sie sie nur bei expliziter Benutzerinteraktion (CTA-Klick) aus.

Demo: <https://particles.js.org/demos/recipes/fireworks>
