# Preimpostazione neve

Preimpostazione ufficiale dall'area di lavoro `presets/presets/snow`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-snow
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSnowPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "snow",
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

Preimpostazione stagionale leggera per le promozioni invernali.

Dimostrazione: <https://particles.js.org/demos/recipes/snow>
