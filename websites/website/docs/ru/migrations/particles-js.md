# Миграция и совместимость

Если вы переходите с `particles.js`, используйте следующий порядок:

1. замените старый скрипт/пакет на `@tsparticles/engine` + бандл (`@tsparticles/slim`)
2. постепенно перемещайте старую конфигурацию и сопоставляйте неподдерживаемые поля.
3. тестируйте взаимодействия (наведение/щелчок/ссылки) одно за другим

## Замечания по канонической миграции

- Официальный источник руководства по миграции: [`tsparticles/markdown/pjsMigration.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/pjsMigration.md).
- Примеры совместимости с устаревшими версиями доступны в демонстрационных папках.

## Пакет совместимости

Если вам нужен мостовой уровень при переносе устаревших конфигураций:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>

Дальнейшее чтение:

- Статья о миграции: <https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m>.
- 5 причин перейти: <https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe>

## Общие советы по картографированию

- Старый инициализатор `particlesJS(...)` становится `tsParticles.load({ id, options })`.
- Многие устаревшие значения по-прежнему имеют прямые эквиваленты в `particles`, `interactivity` и `detectRetina`.
- Новая архитектура, управляемая плагинами, означает, что некоторые расширенные функции требуют явной загрузки пакетов.

## Контрольный список миграции для производства

- Проверьте визуальное соответствие на настольном компьютере и мобильном устройстве.
- Проверьте влияние процессора/графического процессора на устройства низкого уровня.
- Убедитесь, что никакие дополнительные клавиши не игнорируются молча.
- Прикрепите точные версии пакета до недели выпуска.

## Миграция с холста-конфетти на `@tsparticles/confetti`

Если вы переходите с `canvas-confetti`, самый простой вариант — заменить императивные вызовы вызовами API `@tsparticles/confetti`.

## Типичное сопоставление

- `confetti({...})` -> `await confetti({...})`
- собственный холст -> `const local = await confetti.create(canvas, defaults)`, затем `await local({...})`
- повторные снимки -> сохраните существующие таймеры/циклы, вызовите `await confetti(...)` в этих обратных вызовах

## Пример преобразования

До (стиль `canvas-confetti`):

```ts
import confetti from "canvas-confetti";

confetti({
  particleCount: 90,
  spread: 70,
  origin: { x: 0.5, y: 0.6 },
});
```

После (`@tsparticles/confetti`):

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 90,
  spread: 70,
  position: { x: 50, y: 60 },
});
```

## Примечания к названию опции

- `particleCount` -> `count`
- `origin.x`/`origin.y` в `0..1` -> `position.x`/`position.y` в `0..100`
- `startVelocity`, `spread`, `angle` и `colors` сохраняют одинаковую семантику.

Полный API и помощники см. в разделе <https://github.com/tsparticles/tsparticles/tree/main/bundles/confetti#readme>.
