# Predefinição de confete

Predefinição oficial do espaço de trabalho `presets/presets/confetti`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confetti",
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

Perfeito para celebrações, anúncios e designs festivos. Combine com diferentes paletas de cores para variar.

Demonstração: <https://particles.js.org/demos/recipes/confetti>
