[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# jquery-particles

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

Официальный плагин [tsParticles](https://github.com/matteobruni/tsparticles) для jQuery

## Установка

```shell script
npm install jquery-particles
```

или воспользуйтесь напрямую с jsDelivr

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/jquery-particles/badge)](https://www.jsdelivr.com/package/npm/jquery-particles)

```html
<!-- сначала подключаем tsParticles -->
<script src="https://cdn.jsdelivr.net/npm/tsparticles"></script>

<!-- затем подключаем jquery плагин -->
<script src="https://cdn.jsdelivr.net/npm/jquery-particles"></script>
```

## Как использовать

HTML

```html
<div id="tsparticles"></div>
```

```javascript
$("#tsparticles")
  .particles()
  .init(
    {
      background: {
        color: {
          value: "#0d47a1",
        },
      },
      fpsLimit: 60,
      interactivity: {
        detectsOn: "canvas",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40,
          },
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outMode: "bounce",
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          random: true,
          value: 5,
        },
      },
      detectRetina: true,
    },
    function (container) {
      // container это контейнер для частиц, в котором вы можете управлять поведение частиц.
      // the container запускается самостоятельно по-умолчанию.
    }
  );
// or

$("#tsparticles")
  .particles()
  .ajax("particles.json", function (container) {
    // container это контейнер для частиц, в котором вы можете управлять поведение частиц.
    // the container запускается самостоятельно по-умолчанию.
  });
```

## Демо

[Здесь](https://particles.js.org) размещены примеры использования библиотеки

<https://particles.js.org>

Также активно поддерживается и обновляется коллекция CodePen, которую можно посмотреть [здесь](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
