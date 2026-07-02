# Predefinição de hiperespaço

Predefinição oficial do espaço de trabalho `presets/presets/hyperspace`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-hyperspace
```

## Pronto para usar (manual de partida/parada)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadHyperspacePreset } from "@tsparticles/preset-hyperspace";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadHyperspacePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "hyperspace",
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

Ótimo para temporadas com efeito wow e produto de introdução.

Demonstração: <https://particles.js.org/demos/recipes/hyperspace>
