# Ajuste preestablecido del desfile de confeti

Preajuste oficial del espacio de trabajo `presets/presets/confettiParade`.

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-parade
```

## Listo para usar (inicio/parada manual)

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

Demostración: <https://particles.js.org/demos/recipes/confetti-parade>

Documentos fuente: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiParade#readme>
