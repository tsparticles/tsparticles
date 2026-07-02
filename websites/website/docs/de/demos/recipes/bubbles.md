# Blasenvoreinstellung

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/bubbles`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-bubbles
```

## Betriebsbereit (manueller Start/Stopp)

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

Nützlich für interaktive Abschnitte mit besser sichtbarer Bewegung.

Demo: <https://particles.js.org/demos/recipes/bubbles>
