# Предустановка падения конфетти

Официальный пресет из рабочей области `presets/presets/confettiFalling`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-falling
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiFallingPreset } from "@tsparticles/preset-confetti-falling";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiFallingPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiFalling",
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

Демо: <https://particles.js.org/demos/recipes/confetti-falling>

Исходные документы: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiFalling#readme>
