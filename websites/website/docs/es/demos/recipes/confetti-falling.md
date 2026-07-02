# Preestablecido de caída de confeti

Preajuste oficial del espacio de trabajo `presets/presets/confettiFalling`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-falling
```

## Listo para usar (inicio/parada manual)

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

Demostración: <https://particles.js.org/demos/recipes/confetti-falling>

Documentos fuente: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiFalling#readme>
