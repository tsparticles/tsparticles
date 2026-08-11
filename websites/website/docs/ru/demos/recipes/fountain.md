# Предустановка фонтана

Официальный пресет из рабочей области `presets/presets/fountain`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fountain
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFountainPreset } from "@tsparticles/preset-fountain";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFountainPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fountain",
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

Идеально подходит для элегантной, плавной анимации частиц и эффектов на водную тематику.

Демо: <https://particles.js.org/demos/recipes/fountain>
