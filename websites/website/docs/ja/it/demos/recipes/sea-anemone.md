# Preimpostazione anemone di mare

Preimpostazione ufficiale dall'area di lavoro `presets/presets/seaAnemone`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-sea-anemone
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSeaAnemonePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "seaAnemone",
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

Perfetto per animazioni organiche e fluide ispirate al mondo subacqueo.

Dimostrazione: <https://particles.js.org/demos/recipes/sea-anemone>
