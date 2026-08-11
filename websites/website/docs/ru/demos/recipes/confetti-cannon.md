# Предварительная настройка пушки конфетти

Официальный пресет из рабочей области `presets/presets/confettiCannon`.

Чтобы вызвать конфетти в этом пресете, перетащите указатель мыши на область холста.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-cannon
```

## Готов к использованию (ручной запуск/остановка)

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

Демо: <https://particles.js.org/demos/recipes/confetti-cannon>

Исходные документы: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiCannon#readme>
