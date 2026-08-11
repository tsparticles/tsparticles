# Estrellas preestablecidas

Preajuste oficial del espacio de trabajo `presets/presets/stars`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-stars
```

## Listo para usar (inicio/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadStarsPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "stars",
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

Perfecto para páginas de inicio espaciales/cósmicas y temas oscuros.

Demostración: <https://particles.js.org/demos/recipes/stars>
