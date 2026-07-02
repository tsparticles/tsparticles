# Preestablecido de confeti

Preajuste oficial del espacio de trabajo `presets/presets/confetti`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti
```

## Listo para usar (inicio/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confetti",
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

Perfecto para celebraciones, anuncios y diseños festivos. Combínelo con diferentes paletas de colores para variar.

Demostración: <https://particles.js.org/demos/recipes/confetti>
