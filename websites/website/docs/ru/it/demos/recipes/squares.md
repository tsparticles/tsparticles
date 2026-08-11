# Preimpostazione quadrati

Preimpostazione ufficiale dall'area di lavoro `presets/presets/squares`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-squares
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSquaresPreset } from "@tsparticles/preset-squares";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSquaresPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "squares",
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

Perfetto per disegni geometrici, strutturati e layout moderni.

Dimostrazione: <https://particles.js.org/demos/recipes/squares>
