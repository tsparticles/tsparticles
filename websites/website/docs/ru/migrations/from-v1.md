# Миграция с v1.x

Переход с `v1.x` на актуальную версию обычно требует полного обновления зависимостей и проверки конфигурации.

Основные практические препятствия:

1. Старые схемы пакетов и импортов.
2. Форма вызова `tsParticles.load(...)`.
3. Обновлённые ключи опций в современных схемах.

## Миграция Load API

Современный `load` принимает один объект параметров.

До (устаревший позиционный стиль):

```ts
await tsParticles.load("tsparticles", oldOptions);
```

После:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

Если вы загружаете из JSON:

```ts
await tsParticles.load({
  id: "tsparticles",
  url: "/particles.json",
});
```

## Миграция основных опций

Начните с поиска этих ключей в конфигурациях:

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

Пример переписывания:

```ts
// до
particles: {
  color: { value: ["#ff6b6b", "#4ecdc4"] },
  stroke: { width: 0 }
}

// после
particles: {
  paint: {
    fill: { color: { value: ["#ff6b6b", "#4ecdc4"] } },
    stroke: { width: 0 }
  }
}
```

## Рекомендуемые шаги

1. Замените старые имена пакетов на актуальные пакеты `@tsparticles/*`.
2. Начните с `@tsparticles/engine` + `@tsparticles/slim`, затем добавьте нужные плагины.
3. Преобразуйте старые вызовы `load` в объектную сигнатуру `load({ ... })`.
4. Проверьте ключи опций по актуальной документации и исправьте переименованные или удалённые поля.
5. Выполните визуальные проверки и проверки производительности на десктопе и мобильных устройствах.

## Контрольный список

- Удалите устаревшие импорты старой структуры пакетов.
- Убедитесь, что взаимодействия, ссылки и пользовательские формы работают как ожидалось.
- Для конфигураций в стиле `particles.js` рассмотрите слой совместимости.

## Полезная документация по опциям

- Матрица переименований: [`/migrations/option-rename-matrix`](/ru/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/ru/options/particles-paint)
- Заметка о миграции `particles.color`: [`/options/particles-color`](/ru/options/particles-color)
- Заметка о миграции `particles.stroke`: [`/options/particles-stroke`](/ru/options/particles-stroke)

## Ссылки

- Совместимость и мост particles.js: [`/migrations/particles-js`](/ru/migrations/particles-js)
- Матрица установки: [`/guide/installation`](/ru/guide/installation)
- Релизы репозитория: <https://github.com/tsparticles/tsparticles/releases>
