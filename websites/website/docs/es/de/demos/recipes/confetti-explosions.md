# Konfetti-Explosionen voreingestellt

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/confettiExplosions`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-explosions
```

## Betriebsbereit (manueller Start/Stopp)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiExplosionsPreset } from "@tsparticles/preset-confetti-explosions";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiExplosionsPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiExplosions",
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

Demo: <https://particles.js.org/demos/recipes/confetti-explosions>

Quelldokumente: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiExplosions#readme>
