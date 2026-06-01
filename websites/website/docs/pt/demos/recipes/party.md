# Predefinição de festa

Predefinição oficial do espaço de trabalho `presets/presets/party`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-party
```

## Pronto para uso (partida/parada manual)

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

Perfeito para cenas de celebração, eventos e sobreposições com tema de festa.
