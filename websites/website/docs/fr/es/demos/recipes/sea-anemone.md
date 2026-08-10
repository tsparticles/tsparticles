# Preestablecido de anémona de mar

Preajuste oficial del espacio de trabajo `presets/presets/seaAnemone`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-sea-anemone
```

## Listo para usar (inicio/parada manual)

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

Perfecto para animaciones orgánicas y fluidas inspiradas en el agua.

Demostración: <https://particles.js.org/demos/recipes/sea-anemone>
