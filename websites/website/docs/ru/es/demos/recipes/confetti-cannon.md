# Preajuste de cañón de confeti

Preajuste oficial del espacio de trabajo `presets/presets/confettiCannon`.

Para activar confeti en este ajuste preestablecido, arrastre el mouse sobre el área del lienzo.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-cannon
```

## Listo para usar (inicio/parada manual)

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

Demostración: <https://particles.js.org/demos/recipes/confetti-cannon>

Documentos fuente: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiCannon#readme>
