# Preimpostazione cerchi grandi

Preimpostazione ufficiale dall'area di lavoro `presets/presets/bigCircles`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-big-circles
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBigCirclesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "big-circles",
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

Perfetto per design minimali e moderni con grandi cerchi animati.

Dimostrazione: <https://particles.js.org/demos/recipes/big-circles>
