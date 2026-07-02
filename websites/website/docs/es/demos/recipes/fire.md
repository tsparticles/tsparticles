# Fuego preestablecido

Preajuste oficial del espacio de trabajo `presets/presets/fire`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fire
```

## Listo para usar (inicio/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFirePreset } from "@tsparticles/preset-fire";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFirePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fire",
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

Perfecto para demostraciones de efectos y diseños dramáticos y llenos de energía.

Demostración: <https://particles.js.org/demos/recipes/fire>
