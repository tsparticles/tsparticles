# Каталог форм

Этот каталог перечисляет наиболее распространенные значения `particles.shape.type` и показывает, когда `particles.shape.options` добавляет настройки для конкретной формы.

Исходные папки:

- <https://github.com/tsparticles/tsparticles/tree/main/shapes>
- Справочник по параметрам форм: [`/options/particles-shape`](/ru/options/particles-shape)

## Распространенные типы форм

- `circle` (по умолчанию, без дополнительных параметров формы)
- `square` / `edge` (без дополнительных параметров формы)
- `triangle` (без дополнительных параметров формы)
- `line` (без дополнительных параметров формы)
- `polygon` (`options.polygon.sides`)
- `star` (`options.star.sides`, `options.star.inset`)
- `text` (`options.text.value`, `font`, `weight`, `style`, `close`)
- `emoji` (`options.emoji.value`)
- `image` / `images` (`options.image.src`, `name`, `width`, `height`, `gif`, `replaceColor`, `close`)

## Примечания по алиасам и бандлам

- `square` и `edge` - алиасы одной и той же формы.
- `character` и `char` - алиасы одной и той же группы параметров.
- `image` и `images` используют один и тот же объект параметров.
- Большинство расширенных форм требуют `@tsparticles/slim` (или `@tsparticles/all`) либо отдельные shape-пакеты.

Чтобы быстро протестировать их с кнопками Start/Pause и редактируемым JSON, используйте [`/playground/shapes`](/ru/playground/shapes).
