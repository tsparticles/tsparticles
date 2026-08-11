# Enlaces preestablecidos

Preajuste oficial del espacio de trabajo `presets/presets/links`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-links
```

## Listo para usar (inicio/parada manual)

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

Ideal para fondos de héroe/red estilo SaaS.

Demostración: <https://particles.js.org/demos/recipes/links>
