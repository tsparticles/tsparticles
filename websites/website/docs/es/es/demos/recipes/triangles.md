# Triángulos preestablecidos

Preajuste oficial del espacio de trabajo `presets/presets/triangles`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-triangles
```

## Listo para usar (inicio/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadTrianglesPreset } from "@tsparticles/preset-triangles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadTrianglesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "triangles",
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

Una base sólida para diseños geométricos y diseño de estilo tecnológico.

Demostración: <https://particles.js.org/demos/recipes/triangles>
