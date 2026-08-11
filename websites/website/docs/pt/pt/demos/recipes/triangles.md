# Predefinição de triângulos

Predefinição oficial do espaço de trabalho `presets/presets/triangles`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-triangles
```

## Pronto para uso (partida/parada manual)

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

Uma base sólida para layouts geométricos e design de estilo tecnológico.

Demonstração: <https://particles.js.org/demos/recipes/triangles>
