# Predefinição de quadrados

Predefinição oficial do espaço de trabalho `presets/presets/squares`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-squares
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSquaresPreset } from "@tsparticles/preset-squares";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSquaresPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "squares",
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

Perfeito para designs geométricos e estruturados e layouts modernos.

Demonstração: <https://particles.js.org/demos/recipes/squares>
