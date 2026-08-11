# Konfettikanone-Voreinstellung

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/confettiCannon`.

Um in dieser Voreinstellung Konfetti auszulösen, ziehen Sie die Maus über den Leinwandbereich.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-cannon
```

## Betriebsbereit (manueller Start/Stopp)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiCannonPreset } from "@tsparticles/preset-confetti-cannon";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiCannonPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiCannon",
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

Demo: <https://particles.js.org/demos/recipes/confetti-cannon>

Quelldokumente: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiCannon#readme>
