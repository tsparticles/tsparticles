# Fuegos artificiales preestablecidos

Preajuste oficial del espacio de trabajo `presets/presets/fireworks`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fireworks
```

## Listo para usar (inicio/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireworksPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fireworks",
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

Ajuste preestablecido de alto impacto: ejecútelo solo en la interacción explícita del usuario (clic de CTA).

Demostración: <https://particles.js.org/demos/recipes/fireworks>
