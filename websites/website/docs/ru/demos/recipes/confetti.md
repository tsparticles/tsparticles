# Пресет конфетти

Официальный пресет из рабочей области `presets/presets/confetti`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confetti",
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

Идеально подходит для торжеств, объявлений и праздничного дизайна. Для разнообразия сочетайте разные цветовые палитры.

Демо: <https://particles.js.org/demos/recipes/confetti>
