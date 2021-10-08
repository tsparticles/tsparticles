[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# solid-particles

[![npm](https://img.shields.io/npm/v/solid-particles)](https://www.npmjs.com/package/solid-particles) [![npm](https://img.shields.io/npm/dm/solid-particles)](https://www.npmjs.com/package/solid-particles)

Албан ёсны [tsParticles](https://github.com/matteobruni/tsparticles) solid компонэнт

## Татах

```shell
npm install solid-particles solid-js
```

эсвэл

```shell
yarn add solid-particles solid-js
```

## Хэрхэн ашиглах

### Код

Жишээнүүд:

_Remote url_

```javascript
import Particles from "solid-particles";

function App() {
  return (
    <div class="App">
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: "#000",
          },
          fullScreen: {
            enable: true,
          },
        }}
      />
    </div>
  );
}
```

_Options object_

```javascript
import Particles from "solid-particles";

class App extends Component {
  constructor(props) {
    super(props);

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  particlesInit(main) {
    console.log(main);

    // та энд tsParticles instance (main) ийг эхлүүлэн дурын дүрс нэмж болно
  }

  particlesLoaded(container) {
    console.log(container);
  }

  render() {
    return (
      <Particles
        id="tsparticles"
        init={this.particlesInit}
        loaded={this.particlesLoaded}
        options={{
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

### Props

| Prop    | Утга     |  Тайлбар    |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| width           | мөр   | Канвасын өргөн|
| height          | мөр   | Канвасын өндөр|
| options         | обжект   | The options of the particles instance.|
| url             | мөр   | The remote options url, called using an AJAX request                                                                                                |
| style           | обжект   | Канвасын стилл|
| className       | мөр   | Канвас агуулагчын класс|
| canvasClassName | мөр   | Канвасын класс|
| container       | обжект   | Жишээ [particles container](https://particles.js.org/docs/modules/_core_container_.html)                                              |
| init            | функц | tsParticles instance эхэлсний дараа дуудагддаг функц|
| loaded          | функц | Канвас бүрэн зөв ажилсан бол дуудагддаг функц|

Утгийн тохиргоогоо эндээс олно уу [энд](https://particles.js.org).

## Жишээ

Жишээ [энд](https://particles.js.org)

<https://particles.js.org>

CodePen -ий байнга шинэчлэгдэж байдаг цуглуулга [энд](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
