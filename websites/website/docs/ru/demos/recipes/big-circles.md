# Предустановка больших кругов

Официальный пресет из рабочей области `presets/presets/bigCircles`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-big-circles
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBigCirclesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "big-circles",
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

Идеально подходит для минималистичного современного дизайна с большими анимированными кругами.

Демо: <https://particles.js.org/demos/recipes/big-circles>
