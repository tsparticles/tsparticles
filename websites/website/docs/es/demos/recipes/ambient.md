# Preajuste ambiental

Preajuste oficial del espacio de trabajo `presets/presets/ambient`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-ambient
```

## Listo para usar (inicio/parada manual)

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

Ideal para fondos suaves y continuos con poco ruido visual.

Demostración: <https://particles.js.org/demos/recipes/ambient>
