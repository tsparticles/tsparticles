# Жизненный цикл контейнера

`Container` — это экземпляр среды выполнения, возвращаемый `tsParticles.load(...)`.

## Базовый жизненный цикл

```ts
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

container = await tsParticles.load({ id: "tsparticles", options });
container.pause();
container.play();
container.destroy();
```

## Рекомендуемый шаблон

- `start`: создать/воссоздать контейнер с текущими параметрами.
- `stop`: `pause()`, когда он не виден или не нужен.
- `resume`: `play()`, когда пользователь хочет вернуть анимацию.
- `destroy`: бесплатные ресурсы при демонтаже маршрута/компонента.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Container.md>
