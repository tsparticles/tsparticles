# Predefinição de fonte

Predefinição oficial do espaço de trabalho `presets/presets/fountain`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fountain
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFountainPreset } from "@tsparticles/preset-fountain";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFountainPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fountain",
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

Perfeito para animações de partículas fluidas e elegantes e efeitos com tema de água.

Demonstração: <https://particles.js.org/demos/recipes/fountain>
