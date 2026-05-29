# Бандл Ribbons

Официальный бандл из рабочей области `bundles/ribbons`.

## Установка

```bash
pnpm add @tsparticles/engine @tsparticles/ribbons
```

## Готово к использованию (полная страница)

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 5,
  spread: 0,
  colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF"],
});
```

## Ограничено определённым canvas

```ts
import { ribbons } from "@tsparticles/ribbons";
import type { Container } from "@tsparticles/engine";

const canvas = document.getElementById("ribbons-canvas") as HTMLCanvasElement;

const fire = await ribbons.create(canvas, {
  count: 5,
  colors: ["#FF0055", "#00D1FF", "#FFD23F"],
});

export function start(): Promise<Container | undefined> {
  return fire();
}

export function stop(): void {
  fire.pause();
}

export function resume(): void {
  fire.play();
}
```

Идеально для декоративных фонов, праздничных каскадов и красочных анимированных следов.

## Фиксированная позиция (одна точка)

По умолчанию каждая частица ленты появляется в случайной позиции x по всей ширине canvas. Используйте `emitterSize` для управления областью появления — установите `{ width: 0, height: 0 }`, чтобы все ленты начинались из одной точки:

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  position: { x: 50, y: 0 },
  emitterSize: { width: 0, height: 0 },
});
```

Полезно для запуска лент с кнопки или конкретного элемента на вашей странице.
