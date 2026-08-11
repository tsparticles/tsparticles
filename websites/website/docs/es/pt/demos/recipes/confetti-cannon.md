# Predefinição de canhão de confete

Predefinição oficial do espaço de trabalho `presets/presets/confettiCannon`.

Para acionar confetes nesta predefinição, arraste o mouse sobre a área da tela.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-cannon
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiCannonPreset } from "@tsparticles/preset-confetti-cannon";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiCannonPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiCannon",
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

Demonstração: <https://particles.js.org/demos/recipes/confetti-cannon>

Documentos de origem: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiCannon#readme>
