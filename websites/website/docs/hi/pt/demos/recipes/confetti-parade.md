# Predefinição do desfile de confetes

Predefinição oficial do espaço de trabalho `presets/presets/confettiParade`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-parade
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiParadePreset } from "@tsparticles/preset-confetti-parade";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiParadePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiParade",
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

Demonstração: <https://particles.js.org/demos/recipes/confetti-parade>

Documentos de origem: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiParade#readme>
