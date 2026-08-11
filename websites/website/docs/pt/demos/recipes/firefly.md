# Predefinição de vaga-lume

Predefinição oficial do espaço de trabalho `presets/presets/firefly`.

Mova o mouse dentro da tela para ativar o comportamento interativo do vaga-lume.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-firefly
```

## Pronto para uso (partida/parada manual)

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

Predefinição elegante para seções de heróis naturais, narrativas e portfólios.

Demonstração: <https://particles.js.org/demos/recipes/firefly>
