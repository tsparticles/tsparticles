# Preimpostazione dell'iperspazio

Preset ufficiale dal workspace `presets/presets/hyperspace`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-hyperspace
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadHyperspacePreset } from "@tsparticles/preset-hyperspace";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadHyperspacePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "hyperspace",
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

Ottimo per sezioni effetto wow e introduzione al prodotto.

Dimostrazione: <https://particles.js.org/demos/recipes/hyperspace>
