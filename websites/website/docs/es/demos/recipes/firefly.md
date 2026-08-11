# Preajuste de luciérnaga

Preajuste oficial del espacio de trabajo `presets/presets/firefly`.

Mueva el mouse dentro del lienzo para activar el comportamiento interactivo de luciérnaga.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-firefly
```

## Listo para usar (inicio/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireflyPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "firefly",
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

Ajuste preestablecido elegante para secciones de héroes naturales, narraciones y portafolios.

Demostración: <https://particles.js.org/demos/recipes/firefly>
