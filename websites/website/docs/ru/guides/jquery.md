# Интеграция с jQuery

Интегрируйте tsParticles в свои проекты на jQuery с помощью официальной обёртки плагина jQuery.

## Установка

### Через CDN

Подключите jQuery, tsParticles и плагин jQuery через теги скриптов:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
```

---

### Через npm + сборка

Установите необходимые пакеты:

```bash
npm install jquery @tsparticles/jquery tsparticles
```

Импортируйте в ваш проект:

```javascript
import $ from "jquery";
import "@tsparticles/jquery";
```

## Инициализация движка

Перед рендерингом частиц движок tsParticles должен быть инициализирован с необходимыми функциями. Это делается через `$.particles.init`:

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
})();
```

> **Зачем это нужно?** tsParticles использует модульную архитектуру. `loadFull` регистрирует все встроенные формы, взаимодействия и обновления. Вы можете импортировать меньшие сборки (например, `tsparticles-slim`) для уменьшения размера.

## Базовое использование

После инициализации движка и готовности DOM выберите элемент-контейнер и вызовите `.particles().load()`:

```javascript
$(document).ready(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      background: {
        color: "#0d47a1",
      },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
      },
    });
});
```

Элемент-контейнер должен существовать в DOM:

```html
<div id="tsparticles"></div>
```

## Пользовательская конфигурация

Метод `.load()` принимает полный объект `ISourceOptions`. Вот комплексный пример:

```javascript
$("#tsparticles")
  .particles()
  .load({
    background: {
      color: "#000000",
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff"],
      },
      move: {
        direction: "none",
        enable: true,
        outModes: "bounce",
        speed: 4,
      },
      number: {
        density: {
          enable: true,
        },
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      size: {
        value: { min: 2, max: 8 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
        },
      },
    },
  });
```

## Загрузка пресета

Если вы установили пакет пресета (например, `tsparticles-preset-stars`), загрузите его во время инициализации движка и укажите в конфигурации:

```bash
npm install tsparticles-preset-stars
```

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadStarsPreset } = await import("tsparticles-preset-stars");
    await loadStarsPreset(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      preset: "stars",
      background: { color: "#0d47a1" },
    });
})();
```

## Обработка событий и управление контейнером

`.particles()` возвращает экземпляр плагина jQuery. Для доступа к базовому `Container` tsParticles и вызова методов, таких как `play()`, `pause()` или `destroy()`:

```javascript
const $container = $("#tsparticles");

// Загрузка частиц
$container.particles().load({
  /* опции */
});

// Воспроизведение/пауза через несколько секунд
setTimeout(() => {
  const container = $container.particles().getContainer();
  container?.pause();
}, 5000);
```

## Полный пример

Ниже представлена полная самодостаточная HTML-страница, которая загружает tsParticles через CDN и отображает сцену с частицами с интерактивными эффектами:

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles + jQuery</title>
    <style>
      #tsparticles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #0d47a1;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
    <script>
      $(document).ready(async () => {
        await $.particles.init(async (engine) => {
          await tsParticles.loadFull(engine);
        });

        $("#tsparticles")
          .particles()
          .load({
            fpsLimit: 60,
            particles: {
              number: { value: 100 },
              color: { value: "#ffffff" },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
              },
              move: {
                enable: true,
                speed: 2,
                outModes: "out",
              },
              size: {
                value: { min: 1, max: 4 },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                grab: { distance: 200, links: { opacity: 0.5 } },
                push: { quantity: 4 },
              },
            },
            background: { color: "#0d47a1" },
          });
      });
    </script>
  </body>
</html>
```

## Справочник API

| Метод                              | Описание                                                    |
| ---------------------------------- | ----------------------------------------------------------- |
| `$.particles.init(fn)`             | Инициализация движка с колбэком загрузчика                  |
| `$(el).particles()`                | Создание экземпляра плагина частиц на элементе             |
| `$(el).particles().load(opts)`     | Загрузка и запуск конфигурации частиц                      |
| `$(el).particles().destroy()`      | Уничтожение экземпляра частиц и очистка                    |
| `$(el).particles().getContainer()` | Получение базового `Container` для императивного управления |
