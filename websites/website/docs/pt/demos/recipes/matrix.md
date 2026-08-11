# Predefinição de matriz

Predefinição oficial do espaço de trabalho `presets/presets/matrix`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-matrix
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadMatrixPreset } from "@tsparticles/preset-matrix";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadMatrixPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "matrix",
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

Perfeito para designs estéticos de tecnologia/hacker e temas digitais.

Demonstração: <https://particles.js.org/demos/recipes/matrix>
