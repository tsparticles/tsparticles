[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# preact-particles

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

Официальный компонтент [tsParticles](https://github.com/matteobruni/tsparticles) для Preact

## Установка

```shell
npm install preact-particles
```

или

```shell
yarn add preact-particles
```

## Как использовать

### Код

Пример:

```javascript
import Particles from "preact-particles";

class App extends Component {
  render() {
    return (
      <Particles
        id="tsparticles"
        params={{
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
        }}
      />
    );
  }
}
```

### Свойства

| Свойство        | Тип    | Определение                                                                                                      |
| --------------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| width           | строка | Ширина элемента canvas.                                                                                          |
| height          | строка | Высота элемента canvas.                                                                                          |
| options         | объект | Опции экземпляра частиц.                                                                                         |
| style           | объект | Стили элемента canvas.                                                                                           |
| className       | строка | Имя класса для элемента-обертки элемента canvas.                                                                 |
| canvasClassName | строка | Имя класса для элемента canvas.                                                                                  |
| container       | объект | Экземпляр класса [контейнера частиц](https://particles.js.org/docs/modules/_core_container_.html). |

[Здесь](https://particles.js.org) можно найти параметры для настройки.

### Ошибки

Если вы встретили TypeScript ошибки, имейте ввиду, что `tsParticles` использует TypeScript `3.9.6`, попробуйте установить версию 3.8 TypeScript для поддержки синтаксиса `import type`.

## Демо

[Здесь](https://particles.js.org) размещены примеры использования библиотеки

<https://particles.js.org>

Также активно поддерживается и обновляется коллекция CodePen, которую можно посмотреть [здесь](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
