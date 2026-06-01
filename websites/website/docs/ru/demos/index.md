# Демо, готовое к использованию

В этих рецептах используются официальные пресеты, доступные в рабочей области `presets/presets` (бета-/альфа-версия ближе к выпуску).

## Запуск/остановка базового шаблона (без автозапуска)

```ts
import { tsParticles } from "@tsparticles/engine";
import type { Container, ISourceOptions } from "@tsparticles/engine";

let container: Container | undefined;

export async function start(id: string, options: ISourceOptions): Promise<void> {
  container?.destroy();
  container = await tsParticles.load({ id, options });
}

export function stop(): void {
  container?.pause();
}

export function resume(): void {
  container?.play();
}
```

## Предустановленные рецепты

- Каталог пресетов: [`/demos/presets`](/ru/demos/presets)
- Каталог палитр: [`/demos/palettes`](/ru/demos/palettes)
- Каталог форм: [`/demos/shapes`](/ru/demos/shapes)

- [`Ambient`](/ru/demos/recipes/ambient)
- [`Big Circles`](/ru/demos/recipes/big-circles)
- [`Bubbles`](/ru/demos/recipes/bubbles)
- [`Confetti`](/ru/demos/recipes/confetti)
- [`Confetti Cannon`](/ru/demos/recipes/confetti-cannon)
- [`Confetti Explosions`](/ru/demos/recipes/confetti-explosions)
- [`Confetti Falling`](/ru/demos/recipes/confetti-falling)
- [`Confetti Parade`](/ru/demos/recipes/confetti-parade)
- [`Party`](/ru/demos/recipes/party)
- [`Fire`](/ru/demos/recipes/fire)
- [`Firefly`](/ru/demos/recipes/firefly)
- [`Fireworks`](/ru/demos/recipes/fireworks)
- [`Fountain`](/ru/demos/recipes/fountain)
- [`Hyperspace`](/ru/demos/recipes/hyperspace)
- [`Links`](/ru/demos/recipes/links)
- [`Matrix`](/ru/demos/recipes/matrix)
- [`Sea Anemone`](/ru/demos/recipes/sea-anemone)
- [`Snow`](/ru/demos/recipes/snow)
- [`Squares`](/ru/demos/recipes/squares)
- [`Stars`](/ru/demos/recipes/stars)
- [`Ribbons`](/ru/demos/recipes/ribbons)
- [`Triangles`](/ru/demos/recipes/triangles)

Чтобы немедленно протестировать их в пользовательском интерфейсе, используйте [`Playground`](/ru/playground/) и запускайте их с помощью `Start` только при необходимости.

## Демо-проекты Framework

Монорепо также включает в себя работоспособные демо-версии интеграции:

- Исходная папка: <https://github.com/tsparticles/tsparticles/tree/main/demo>.
- Доступные демоверсии: `angular`, `astro`, `electron`, `inferno`, `ionic`, `jquery`, `lit`, `nextjs`, `nextjs-legacy`, `nuxt2`, `nuxt3`, `nuxt4`, `preact`, `react`, `riot`, `solid`, `svelte`, `svelte-kit`, `vanilla`, `vanilla_new`, `vite`, `vue2`, `vue3`, `webcomponents`.
