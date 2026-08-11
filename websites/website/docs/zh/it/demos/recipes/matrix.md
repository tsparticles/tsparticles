# Preimpostazione matrice

Preimpostazione ufficiale dall'area di lavoro `presets/presets/matrix`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-matrix
```

## Pronto all'uso (avvio/arresto manuale)

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

Perfetto per progetti estetici tecnologici/hacker e temi digitali.

Dimostrazione: <https://particles.js.org/demos/recipes/matrix>
