# Stelle preimpostate

Preimpostazione ufficiale dall'area di lavoro `presets/presets/stars`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-stars
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadStarsPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "stars",
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

Perfetto per pagine di destinazione spaziali/cosmiche e temi oscuri.

Dimostrazione: <https://particles.js.org/demos/recipes/stars>
