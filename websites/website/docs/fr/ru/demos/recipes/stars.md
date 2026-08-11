# Предустановленные звезды

Официальный пресет из рабочей области `presets/presets/stars`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-stars
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadStarsPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "stars",
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

Идеально подходит для космических/космических целевых страниц и темных тем.

Демо: <https://particles.js.org/demos/recipes/stars>
