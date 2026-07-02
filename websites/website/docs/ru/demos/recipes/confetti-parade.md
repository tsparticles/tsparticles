# Предустановка парада конфетти

Официальный пресет из рабочей области `presets/presets/confettiParade`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-parade
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiParadePreset } from "@tsparticles/preset-confetti-parade";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiParadePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiParade",
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

Демо: <https://particles.js.org/demos/recipes/confetti-parade>

Исходные документы: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiParade#readme>
