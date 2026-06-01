# Party preimpostato

Preimpostazione ufficiale dall'area di lavoro `presets/presets/party`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-party
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadPartyPreset } from "@tsparticles/preset-party";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadPartyPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "party",
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

Perfetto per scene di celebrazione, eventi e overlay a tema festa.
