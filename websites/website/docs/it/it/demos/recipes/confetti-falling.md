# Preimpostazione caduta coriandoli

Preimpostazione ufficiale dall'area di lavoro `presets/presets/confettiFalling`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-falling
```

## Pronto all'uso (avvio/arresto manuale)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiFallingPreset } from "@tsparticles/preset-confetti-falling";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiFallingPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiFalling",
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

Dimostrazione: <https://particles.js.org/demos/recipes/confetti-falling>

Documenti di origine: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiFalling#readme>
