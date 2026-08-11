# Предустановка окружения

Официальный пресет из рабочей области `presets/presets/ambient`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-ambient
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAmbientPreset } from "@tsparticles/preset-ambient";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadAmbientPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "ambient",
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

Отлично подходит для мягкого непрерывного фона с низким визуальным шумом.

Демо: <https://particles.js.org/demos/recipes/ambient>
