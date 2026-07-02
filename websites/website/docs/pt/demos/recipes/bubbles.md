# Predefinição de bolhas

Predefinição oficial do espaço de trabalho `presets/presets/bubbles`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-bubbles
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBubblesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "bubbles",
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

Útil para seções interativas com movimento mais visível.

Demonstração: <https://particles.js.org/demos/recipes/bubbles>
