# Predefinição de grandes círculos

Predefinição oficial do espaço de trabalho `presets/presets/bigCircles`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-big-circles
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBigCirclesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "big-circles",
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

Perfeito para designs minimalistas e modernos com grandes círculos animados.

Demonstração: <https://particles.js.org/demos/recipes/big-circles>
