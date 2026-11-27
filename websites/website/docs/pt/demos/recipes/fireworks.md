# Predefinição de fogos de artifício

Predefinição oficial do espaço de trabalho `presets/presets/fireworks`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fireworks
```

## Pronto para uso (partida/parada manual)

```ts
import { createEngine } from "@tsparticles/engine";
const tsParticles = createEngine();
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireworksPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fireworks",
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

Predefinição de alto impacto: execute-a apenas com interação explícita do usuário (clique no CTA).

Demonstração: <https://particles.js.org/demos/recipes/fireworks>
