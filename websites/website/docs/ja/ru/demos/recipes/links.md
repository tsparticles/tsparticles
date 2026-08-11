# Предустановленные ссылки

Официальный пресет из рабочей области `presets/presets/links`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-links
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadLinksPreset } from "@tsparticles/preset-links";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadLinksPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "links",
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

Идеально подходит для героев/сетевых фонов в стиле SaaS.

Демо: <https://particles.js.org/demos/recipes/links>
