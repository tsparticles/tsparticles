[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# react-tsparticles

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

Официальный компонтент [tsParticles](https://github.com/matteobruni/tsparticles) для ReactJS

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Установка

```shell
npm install react-tsparticles
```

или

```shell
yarn add react-tsparticles
```

#### create-react-app

Начиная с 1.17.0 существуют два официальных `create-react-app` шаблона:

- `cra-template-particles`: Простой шаблон ReactJS с полноэкранными частицами, на основе JavaScript
- `cra-template-particles-typescript`: Простой шаблон ReactJS с полноэкранными частицами на основе TypeScript

Вы можете установить их, используя команду `create-response-app`:

```shell script
create-react-app your_app --template particles
```

или

```shell script
create-react-app your_app --template particles-typescript
```

## Как использовать

### Код

Пример:

```javascript
import Particles from "react-tsparticles";

const App = () => {
  const particlesInit = (main) => {
    console.log(main);

    // вы можете инициализировать экземпляр tsParticles (main) здесь, добавляя пользовательские формы или предустановки
  }
  
  const particlesLoaded = (container) => {
    console.log(container);
  }
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#0d47a1",
          },
        },
        fpsLimit: 120,
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
              area: 800,
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
