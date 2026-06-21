# Фон и холст

Этот раздел управляет слоем холста и поведением в полноэкранном режиме.

## Основные свойства

- `background.color`
- `background.opacity`
- `background.image`
- `background.position`
- `background.repeat`
- `background.size`

## `background`

```ts
background: {
  color: "#0b1020",
  image: "",
  position: "50% 50%",
  repeat: "no-repeat",
  size: "cover"
}
```

- `color`: цвет фона холста.
- `opacity`: альфа-канал для фонового слоя.
- `image`: необязательное фоновое изображение.
- `position`, `repeat`, `size`: поведение, подобное CSS.
- `element`: опциональный CSS-селектор, `HTMLCanvasElement` или `OffscreenCanvas` для пользовательского draw callback. Если не указано, используется холст частиц.
- `draw`: опциональный покадровый callback `(context, delta) => void` для пользовательской отрисовки фона.

## `fullScreen`

```ts
fullScreen: {
  enable: true,
  zIndex: -1
}
```

- `enable`: делает область просмотра холста полной.
- `zIndex`: полезно для размещения частиц позади вашего контента.

Для встроенных игровых площадок и встроенного предварительного просмотра документов установите:

```ts
fullScreen: {
  enable: false,
}
```

## `detectRetina`

```ts
detectRetina: true;
```

Улучшает рендеринг на экранах HiDPI, но увеличивает нагрузку на графический процессор/процессор.

## Практические замечания

- Для целевых страниц используйте `fullScreen.enable: true` с `zIndex: -1`.
- Если вы заметили замедление работы на мобильном устройстве, попробуйте `detectRetina: false`.

- Если конфигурация предназначена для полноэкранного режима, отключите `fullScreen` перед встраиванием его в ограниченный раздел.
