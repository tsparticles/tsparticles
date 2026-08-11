# Пресет гиперпространства

Предустановленное официальное рабочее пространство `presets/presets/hyperspace`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-hyperspace
```

## Готов к использованию (ручной запуск/останов)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadHyperspacePreset } from "@tsparticles/preset-hyperspace";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadHyperspacePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "hyperspace",
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

Лучшее для отдельных разделов с вау-эффектом и вводным продуктом.

Демо: <https://particles.js.org/demos/recipes/hyperspace>
