# Preimpostazione coriandoli

Preimpostazione ufficiale dall'area di lavoro `presets/presets/confetti`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confetti",
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

Perfetto per celebrazioni, annunci e design festivi. Combina con diverse tavolozze di colori per varietà.

Dimostrazione: <https://particles.js.org/demos/recipes/confetti>
