# Nieve preestablecida

Preajuste oficial del espacio de trabajo `presets/presets/snow`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-snow
```

## Listo para usar (inicio/parada manual)

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

Preajuste estacional ligero para promociones de invierno.

Demostración: <https://particles.js.org/demos/recipes/snow>
