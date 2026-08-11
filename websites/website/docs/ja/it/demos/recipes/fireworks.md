# Preimpostazione fuochi d'artificio

Preimpostazione ufficiale dall'area di lavoro `presets/presets/fireworks`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fireworks
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
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

Preimpostazione ad alto impatto: eseguila solo su interazione esplicita dell'utente (clic CTA).

Dimostrazione: <https://particles.js.org/demos/recipes/fireworks>
