# Cuadrados preestablecidos

Preajuste oficial del espacio de trabajo `presets/presets/squares`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-squares
```

## Listo para usar (inicio/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSquaresPreset } from "@tsparticles/preset-squares";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSquaresPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "squares",
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

Perfecto para diseños geométricos, estructurados y diseños modernos.

Demostración: <https://particles.js.org/demos/recipes/squares>
