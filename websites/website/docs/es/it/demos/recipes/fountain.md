# Preimpostazione fontana

Preimpostazione ufficiale dall'area di lavoro `presets/presets/fountain`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fountain
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFountainPreset } from "@tsparticles/preset-fountain";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFountainPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fountain",
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

Perfetto per animazioni di particelle eleganti e fluide ed effetti a tema acquatico.

Dimostrazione: <https://particles.js.org/demos/recipes/fountain>
