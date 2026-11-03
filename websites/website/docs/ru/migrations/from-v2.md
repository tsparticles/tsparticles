# Миграция с v2.x

Переход с `v2.x` на актуальную версию обычно имеет две основные зоны breaking changes:

1. Миграция сигнатуры `tsParticles.load(...)`.
2. Миграция ключей опций (особенно цвета и stroke).

## Миграция Load API (важно)

В современных версиях `load` принимает **один объект параметров**.

До (позиционный стиль `v2.x`):

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 80,
    },
  },
});
```

После (один объект):

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: {
        value: 80,
      },
    },
  },
});
```

Также можно передать `element`, `url` и `index` в том же объекте.

```ts
await tsParticles.load({
  element: document.getElementById("tsparticles") as HTMLElement,
  url: "/particles.json",
  index: 0,
});
```

## Миграция основных опций

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

До:

```ts
particles: {
  color: { value: "#00ffcc" },
  stroke: { width: 1, color: "#003344" }
}
```

После:

```ts
particles: {
  paint: {
    fill: { value: "#00ffcc" },
    stroke: { width: 1, color: "#003344" }
  }
}
```

## Рекомендуемые шаги

1. Обновите все пакеты `@tsparticles/*` вместе.
2. Проверьте, что версии обёрток (React/Vue/Angular/и т.д.) находятся на одной major-линии.
3. Преобразуйте все старые вызовы `tsParticles.load(id, options)` в объектные параметры.
4. Перенесите известные ключи (`color`, `stroke`) в `paint.fill`/`paint.stroke`.
5. Проведите визуальную регрессию на самых сложных конфигурациях.

## Контрольный список

- Убедитесь, что в lockfile нет смешанных major-версий.
- Проверьте, что выбранный bundle (`basic`, `slim`, `all`) по-прежнему соответствует включённым функциям.
- Повторно протестируйте хуки жизненного цикла canvas (`loaded`, `particlesLoaded`, пути cleanup).

## Полезная документация по опциям

- Матрица переименований: [`/migrations/option-rename-matrix`](/ru/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/ru/options/particles-paint)
- Заметка о миграции `particles.color`: [`/options/particles-color`](/ru/options/particles-color)
- Заметка о миграции `particles.stroke`: [`/options/particles-stroke`](/ru/options/particles-stroke)

## Ссылки

- Правило выравнивания версий: [`/migrations/releases`](/ru/migrations/releases)
- Релизы репозитория: <https://github.com/tsparticles/tsparticles/releases>
