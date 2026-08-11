# Predefinição de anêmona do mar

Predefinição oficial do espaço de trabalho `presets/presets/seaAnemone`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-sea-anemone
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSeaAnemonePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "seaAnemone",
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

Perfeito para animações orgânicas e fluidas de inspiração subaquática.

Demonstração: <https://particles.js.org/demos/recipes/sea-anemone>
