# Matrix-Voreinstellung

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/matrix`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-matrix
```

## Betriebsbereit (manueller Start/Stopp)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadMatrixPreset } from "@tsparticles/preset-matrix";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadMatrixPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "matrix",
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

Perfekt für Tech-/Hacker-Ästhetikdesigns und digitale Themen.

Demo: <https://particles.js.org/demos/recipes/matrix>
