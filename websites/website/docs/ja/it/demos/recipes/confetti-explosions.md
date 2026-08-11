# Preimpostazione esplosioni di coriandoli

Preimpostazione ufficiale dall'area di lavoro `presets/presets/confettiExplosions`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-explosions
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiExplosionsPreset } from "@tsparticles/preset-confetti-explosions";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiExplosionsPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiExplosions",
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

Dimostrazione: <https://particles.js.org/demos/recipes/confetti-explosions>

Documenti di origine: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiExplosions#readme>
