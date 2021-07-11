[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# solid-particles

[![npm](https://img.shields.io/npm/v/solid-particles)](https://www.npmjs.com/package/solid-particles) [![npm](https://img.shields.io/npm/dm/solid-particles)](https://www.npmjs.com/package/solid-particles)

Official [tsParticles](https://github.com/matteobruni/tsparticles) solid component

## Installation

```shell
npm install solid-particles solid-js
```

or

```shell
yarn add solid-particles solid-js
```

## How to use

### Code

Examples:

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

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
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

| Prop            | Type     | Definition                                                                                                                                          |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| width           | string   | The width of the canvas.                                                                                                                            |
| height          | string   | The height of the canvas.                                                                                                                           |
| options         | object   | The options of the particles instance.                                                                                                              |
| url             | string   | The remote options url, called using an AJAX request                                                                                                |
| style           | object   | The style of the canvas element.                                                                                                                    |
| className       | string   | The class name of the canvas wrapper.                                                                                                               |
| canvasClassName | string   | the class name of the canvas.                                                                                                                       |
| container       | object   | The instance of the [particles container](https://particles.js.org/docs/modules/_core_container_.html)                                              |
| init            | function | This function is called after the tsParticles instance initialization, the instance is the parameter and you can load custom presets or shapes here |
| loaded          | function | This function is called when particles are correctly loaded in canvas, the current container is the parameter and you can customize it here         |

Find your parameters configuration [here](https://particles.js.org).

## Demos

The demo website is [here](https://particles.js.org)

<https://particles.js.org>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
