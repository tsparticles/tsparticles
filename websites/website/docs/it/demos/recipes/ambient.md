# Preimpostazione ambientale

Preimpostazione ufficiale dall'area di lavoro `presets/presets/ambient`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-ambient
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAmbientPreset } from "@tsparticles/preset-ambient";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadAmbientPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "ambient",
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

Ottimo per sfondi morbidi e continui con basso rumore visivo.

Dimostrazione: <https://particles.js.org/demos/recipes/ambient>
