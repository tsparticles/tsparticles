# Estrelas predefinidas

Predefinição oficial do espaço de trabalho `presets/presets/stars`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-stars
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadStarsPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "stars",
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

Perfeito para landing pages espaciais/cósmicas e temas sombrios.

Demonstração: <https://particles.js.org/demos/recipes/stars>
