# Preimpostazione cannone coriandoli

Preimpostazione ufficiale dall'area di lavoro `presets/presets/confettiCannon`.

Per attivare i coriandoli in questa preimpostazione, trascina il mouse sull'area della tela.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-cannon
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiCannonPreset } from "@tsparticles/preset-confetti-cannon";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiCannonPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiCannon",
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

Dimostrazione: <https://particles.js.org/demos/recipes/confetti-cannon>

Documenti di origine: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiCannon#readme>
