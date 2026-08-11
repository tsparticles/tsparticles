# Preestablecido de explosiones de confeti

Preajuste oficial del espacio de trabajo `presets/presets/confettiExplosions`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-explosions
```

## Listo para usar (inicio/parada manual)

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

Demostración: <https://particles.js.org/demos/recipes/confetti-explosions>

Documentos fuente: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiExplosions#readme>
