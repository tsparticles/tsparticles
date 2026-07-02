# Predefinição de neve

Predefinição oficial do espaço de trabalho `presets/presets/snow`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-snow
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSnowPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "snow",
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

Predefinição sazonal leve para promoções de inverno.

Demonstração: <https://particles.js.org/demos/recipes/snow>
