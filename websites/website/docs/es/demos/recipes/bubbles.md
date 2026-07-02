# Burbujas preestablecidas

Preajuste oficial del espacio de trabajo `presets/presets/bubbles`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-bubbles
```

## Listo para usar (inicio/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBubblesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "bubbles",
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

Útil para secciones interactivas con movimiento más visible.

Demostración: <https://particles.js.org/demos/recipes/bubbles>
