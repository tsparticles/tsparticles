# Пресет Светлячка

Официальный пресет из рабочей области `presets/presets/firefly`.

Переместите мышь внутри холста, чтобы активировать интерактивное поведение светлячка.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-firefly
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireflyPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "firefly",
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

Элегантный набор настроек для разделов с естественными героями, рассказывания историй и портфолио.

Демо: <https://particles.js.org/demos/recipes/firefly>
