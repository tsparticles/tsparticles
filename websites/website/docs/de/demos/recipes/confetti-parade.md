# Konfetti-Parade-Voreinstellung

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/confettiParade`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-parade
```

## Betriebsbereit (manueller Start/Stopp)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiParadePreset } from "@tsparticles/preset-confetti-parade";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiParadePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiParade",
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

Demo: <https://particles.js.org/demos/recipes/confetti-parade>

Quelldokumente: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiParade#readme>
