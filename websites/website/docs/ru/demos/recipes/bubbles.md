# Предустановка пузырьков

Официальный пресет из рабочей области `presets/presets/bubbles`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-bubbles
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBubblesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "bubbles",
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

Полезно для интерактивных разделов с более заметным движением.

Демо: <https://particles.js.org/demos/recipes/bubbles>
