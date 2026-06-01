# Ajuste preestablecido de fiesta

Preajuste oficial del espacio de trabajo `presets/presets/party`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-party
```

## Listo para usar (inicio/parada manual)

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

Perfecto para escenas de celebración, eventos y superposiciones con temática de fiesta.
