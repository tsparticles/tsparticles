# Предустановка вечеринки

Официальный пресет из рабочей области `presets/presets/party`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-party
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadPartyPreset } from "@tsparticles/preset-party";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadPartyPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "party",
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

Идеально подходит для праздничных сцен, мероприятий и оверлеев в стиле вечеринки.

Демо: <https://particles.js.org/demos/recipes/party>
