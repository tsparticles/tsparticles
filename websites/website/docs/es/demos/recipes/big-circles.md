# Preestablecido de círculos grandes

Preajuste oficial del espacio de trabajo `presets/presets/bigCircles`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-big-circles
```

## Listo para usar (inicio/parada manual)

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

Perfecto para diseños minimalistas y modernos con grandes círculos animados.

Demostración: <https://particles.js.org/demos/recipes/big-circles>
