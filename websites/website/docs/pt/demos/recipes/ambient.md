# Predefinição de ambiente

Predefinição oficial do espaço de trabalho `presets/presets/ambient`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-ambient
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAmbientPreset } from "@tsparticles/preset-ambient";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadAmbientPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "ambient",
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

Ótimo para fundos suaves e contínuos com baixo ruído visual.

Demonstração: <https://particles.js.org/demos/recipes/ambient>
