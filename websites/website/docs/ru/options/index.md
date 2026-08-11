# Справочник опций

Опции `tsParticles` глубокие, поэтому эта страница — практическая карта перед тем, как погружаться в каждую подопцию.

## Выберите путь конфигурации

- **Быстрый визуальный результат**: начните с preset и переопределите ключевые поля.
- **Полный контроль**: задайте `particles`, `interactivity` и `background` вручную.
- **Подход config-first**: начните с `@tsparticles/configs` и постепенно дорабатывайте конфигурацию.

## Быстрые страницы (локально)

- [`Background & Canvas`](/ru/options/background)
- [`Background Mask`](/ru/options/background-mask)
- [`Full Screen`](/ru/options/fullscreen)
- [`Motion`](/ru/options/motion)
- [`Manual Particles`](/ru/options/manual-particles)
- [`Themes`](/ru/options/themes)
- [`Particles`](/ru/options/particles)
- [`Particles Number`](/ru/options/particles-number)
- [`Particles Move`](/ru/options/particles-move)
- [`Particles Links`](/ru/options/particles-links)
- [`Particles Palette`](/ru/options/particles-palette)
- [`Particles Shape`](/ru/options/particles-shape)
- [`Particles Collisions`](/ru/options/particles-collisions)
- [`Particles Life`](/ru/options/particles-life)
- [`Particles Orbit`](/ru/options/particles-orbit)
- [`Particles Roll`](/ru/options/particles-roll)
- [`Particles Rotate`](/ru/options/particles-rotate)
- [`Interactivity`](/ru/options/interactivity)
- [`Interactivity Click`](/ru/options/interactivity-click)
- [`Interactivity Hover`](/ru/options/interactivity-hover)
- [`Interactivity Div`](/ru/options/interactivity-div)
- [`Interactivity Events`](/ru/options/interactivity-events)
- [`Interactivity Modes`](/ru/options/interactivity-modes)
- [`Plugin: Absorbers`](/ru/options/plugin-absorbers)
- [`Plugin: Emitters`](/ru/options/plugin-emitters)
- [`Plugin: Infection`](/ru/options/plugin-infection)
- [`Plugin: Polygon Mask`](/ru/options/plugin-polygon-mask)
- [`Performance Guide`](/ru/options/performance)

## Страницы глубокого разбора частиц

- [`Particles Bounce`](/ru/options/particles-bounce)
- [`Particles Color`](/ru/options/particles-color)
- [`Particles Destroy`](/ru/options/particles-destroy)
- [`Particles Group`](/ru/options/particles-group)
- [`Particles Opacity`](/ru/options/particles-opacity)
- [`Particles Palette`](/ru/options/particles-palette)
- [`Particles Repulse`](/ru/options/particles-repulse)
- [`Particles Shadow`](/ru/options/particles-shadow)
- [`Particles Size`](/ru/options/particles-size)
- [`Particles Stroke`](/ru/options/particles-stroke)
- [`Particles Tilt`](/ru/options/particles-tilt)
- [`Particles Twinkle`](/ru/options/particles-twinkle)
- [`Particles Wobble`](/ru/options/particles-wobble)
- [`Particles ZIndex`](/ru/options/particles-zindex)

## Где находится основная документация

- Основная документация по опциям: [`tsparticles/markdown/Options.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/Options.md)
- Детальные страницы опций: [`tsparticles/markdown/Options/`](https://github.com/tsparticles/tsparticles/tree/main/markdown/Options)
- TypeScript-интерфейсы: [`tsparticles/engine/src/Options/Interfaces`](https://github.com/tsparticles/tsparticles/tree/main/engine/src/Options/Interfaces)

## Самые используемые root-опции

- `background`
- `fullScreen`
- `interactivity`
- `particles`
- `detectRetina`
- `preset`
- `responsive`

## Самые используемые разделы

- `background`: базовые настройки фона canvas и маски.
- `particles.number`: количество и плотность.
- `particles.move`: скорость, направление и out modes.
- `particles.shape`: круг, полигон, изображение, эмодзи, пользовательские формы.
- `particles.palette`: быстрая смена согласованных наборов цветов.
- `interactivity`: режимы hover/click и внешние эффекты.
- `detectRetina`: баланс качества и производительности на high-DPI экранах.

## Карта частиц (вложенный вид)

Используйте это дерево как навигацию перед открытием отдельных страниц:

```text
particles
|- number
|- color
|- shape
|- size
|- opacity
|- move
|- links
|- collisions
|- life
|- destroy
|- group
|- orbit
|- repulse
|- roll
|- rotate
|- shadow
|- stroke
|- tilt
|- twinkle
|- wobble
|- zIndex
`- palette
```

Сначала открывайте root-документацию, затем углубляйтесь в разделы:

- Базовый раздел: [`Particles`](/ru/options/particles)
- Углубление: [`Particles Number`](/ru/options/particles-number), [`Particles Move`](/ru/options/particles-move), [`Particles Links`](/ru/options/particles-links)

## Надежный процесс настройки опций

1. Начните с рабочей конфигурации из demos или presets.
2. Меняйте по одному разделу за раз.
3. Проверяйте через TypeScript (`IOptions`) в коде приложения.
4. Храните production-опции в отдельных JSON-файлах.

## Минимальный типизированный пример

```ts
import type { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 70 },
    move: { enable: true, speed: 1.5 },
  },
};
```

## Ограничители производительности

- Предпочитайте `@tsparticles/slim`, если нет явной необходимости в продвинутых plugins.
- Держите количество частиц пропорционально площади контейнера.
- Профилируйте на реальных устройствах перед добавлением тяжелых интеракций.

## Связанные ссылки

- Docs пакета configs: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- Папка presets: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Папка palettes: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

Для полного описания каждой подопции также используйте исходные страницы `tsparticles/markdown/Options`, перечисленные выше.
