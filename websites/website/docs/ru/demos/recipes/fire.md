# Предустановка огня

Официальный пресет из рабочей области `presets/presets/fire`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fire
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFirePreset } from "@tsparticles/preset-fire";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFirePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fire",
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

Идеально подходит для драматических, энергичных дизайнов и демонстрации эффектов.

Демо: <https://particles.js.org/demos/recipes/fire>
