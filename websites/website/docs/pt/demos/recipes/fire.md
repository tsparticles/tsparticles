# Predefinição de fogo

Predefinição oficial do espaço de trabalho `presets/presets/fire`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fire
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFirePreset } from "@tsparticles/preset-fire";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFirePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fire",
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

Perfeito para designs dramáticos e de alta energia e demonstrações de efeitos.

Demonstração: <https://particles.js.org/demos/recipes/fire>
