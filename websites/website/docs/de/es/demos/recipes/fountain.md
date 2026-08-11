# Fuente preestablecida

Preajuste oficial del espacio de trabajo `presets/presets/fountain`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fountain
```

## Listo para usar (inicio/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFountainPreset } from "@tsparticles/preset-fountain";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFountainPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fountain",
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

Perfecto para animaciones de partículas elegantes y fluidas y efectos con temas acuáticos.

Demostración: <https://particles.js.org/demos/recipes/fountain>
