# Preimpostazione fuoco

Preimpostazione ufficiale dall'area di lavoro `presets/presets/fire`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fire
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFirePreset } from "@tsparticles/preset-fire";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFirePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fire",
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

Perfetto per progetti spettacolari e ad alta energia e dimostrazioni di effetti.

Dimostrazione: <https://particles.js.org/demos/recipes/fire>
