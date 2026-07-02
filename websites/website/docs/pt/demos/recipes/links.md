# Links predefinidos

Predefinição oficial do espaço de trabalho `presets/presets/links`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-links
```

## Pronto para uso (partida/parada manual)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadLinksPreset } from "@tsparticles/preset-links";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadLinksPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "links",
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

Ideal para planos de fundo de herói/rede no estilo SaaS.

Demonstração: <https://particles.js.org/demos/recipes/links>
