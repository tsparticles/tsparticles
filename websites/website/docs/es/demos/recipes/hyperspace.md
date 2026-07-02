# Preestablecido de hiperespacio

Preestablecido espacio de trabajo oficial `presets/presets/hyperspace`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-hyperspace
```

## Listo para usar (iniciar/parar manual)

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

Ottimo per sezioni wow-effect y producto de introducción.

Demostración: <https://particles.js.org/demos/recipes/hyperspace>
