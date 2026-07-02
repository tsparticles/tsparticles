# Предустановка морского анемона

Официальный пресет из рабочей области `presets/presets/seaAnemone`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-sea-anemone
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSeaAnemonePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "seaAnemone",
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

Идеально подходит для органичной, плавной подводной анимации.

Демо: <https://particles.js.org/demos/recipes/sea-anemone>
