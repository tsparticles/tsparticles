# Миграция с v3.x

Для `v3.x` основные риски миграции — **совместимость опций** и **изменения пакетов**.

## Приоритетные изменения

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Переименование пакетов

Некоторые пакеты `v3.x` были переименованы или реструктурированы:

| Пакет v3 | Текущий пакет | Примечание |
|---|---|---|
| `@tsparticles/move-base` | `@tsparticles/plugin-move` | Объединены в один плагин |
| `@tsparticles/move-parallax` | `@tsparticles/plugin-move` | Объединены в один плагин |
| `@tsparticles/updater-color` | `@tsparticles/updater-paint` | Заменён системой paint |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint` | Заменён системой paint |
| `@tsparticles/plugin-hsv-color` | `@tsparticles/plugin-hsv-color` | Перемещён в `plugins/colors/hsv/`, то же имя |

## Примеры соответствия опций

До (стиль `v3.x`):

```ts
const options = {
  particles: {
    color: {
      value: "#ff0000",
    },
    stroke: {
      width: 2,
      color: "#000000",
    },
  },
};
```

После (текущий):

```ts
const options = {
  particles: {
    paint: {
      fill: {
        value: "#ff0000",
      },
      stroke: {
        width: 2,
        color: "#000000",
      },
    },
  },
};
```

## Миграция Load API

До (устаревший позиционный вызов):

```ts
await tsParticles.load("tsparticles", options);
```

После (объектный параметр):

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Рекомендуемые шаги

1. Приведите все пакеты `@tsparticles/*` к последней версии.
2. Замените устаревшие ключи опций (`particles.color`, `particles.stroke`) на `particles.paint.*`.
3. Обновите переименованные пакеты в `package.json` (см. таблицу выше).
4. Убедитесь, что пользовательские плагины/фигуры загружаются до `tsParticles.load(...)`.
5. Повторно протестируйте взаимодействия и сцены, критичные для производительности.

## Ресурсы

- Матрица переименований: [`/migrations/option-rename-matrix`](/ru/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/ru/options/particles-paint)
