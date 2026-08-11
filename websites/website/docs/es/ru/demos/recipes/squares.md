# Предустановленные квадраты

Официальный пресет из рабочей области `presets/presets/squares`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-squares
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSquaresPreset } from "@tsparticles/preset-squares";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSquaresPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "squares",
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

Идеально подходит для геометрических, структурированных дизайнов и современных макетов.

Демо: <https://particles.js.org/demos/recipes/squares>
