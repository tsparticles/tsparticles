# Collegamenti preimpostati

Preimpostazione ufficiale dall'area di lavoro `presets/presets/links`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-links
```

## Pronto all'uso (avvio/arresto manuale)

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

Ideale per sfondi di rete/eroe in stile SaaS.

Dimostrazione: <https://particles.js.org/demos/recipes/links>
