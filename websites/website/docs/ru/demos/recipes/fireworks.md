# Предустановка фейерверка

Официальный пресет из рабочей области `presets/presets/fireworks`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fireworks
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireworksPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fireworks",
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

Высокоэффективный набор настроек: запускайте его только при явном взаимодействии с пользователем (нажатие кнопки призыва к действию).

Демо: <https://particles.js.org/demos/recipes/fireworks>
