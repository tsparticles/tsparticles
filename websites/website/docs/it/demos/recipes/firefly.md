# Preimpostazione Firefly

Preimpostazione ufficiale dall'area di lavoro `presets/presets/firefly`.

Muovi il mouse all'interno dell'area di disegno per attivare il comportamento interattivo della lucciola.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-firefly
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireflyPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "firefly",
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

Preimpostazione elegante per sezioni di eroi naturali, narrazione e portfolio.

Dimostrazione: <https://particles.js.org/demos/recipes/firefly>
