# Preimpostazione parata di coriandoli

Preimpostazione ufficiale dall'area di lavoro `presets/presets/confettiParade`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-parade
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiParadePreset } from "@tsparticles/preset-confetti-parade";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiParadePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiParade",
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

Dimostrazione: <https://particles.js.org/demos/recipes/confetti-parade>

Documenti di origine: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiParade#readme>
