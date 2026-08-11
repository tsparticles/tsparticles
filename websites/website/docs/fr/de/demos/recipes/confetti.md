# Konfetti-Voreinstellung

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/confetti`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti
```

## Betriebsbereit (manueller Start/Stopp)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confetti",
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

Perfekt für Feiern, Ankündigungen und festliche Designs. Kombinieren Sie es mit verschiedenen Farbpaletten für Abwechslung.

Demo: <https://particles.js.org/demos/recipes/confetti>
