# Предустановка матрицы

Официальный пресет из рабочей области `presets/presets/matrix`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-matrix
```

## Готов к использованию (ручной запуск/остановка)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadMatrixPreset } from "@tsparticles/preset-matrix";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadMatrixPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "matrix",
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

Идеально подходит для технологического/хакерского эстетического дизайна и цифровых тем.

Демо: <https://particles.js.org/demos/recipes/matrix>
