[![banner](https://cdn.matteobruni.it/images/particles/banner2.png)](https://particles.matteobruni.it)

# react-tsparticles

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

Official [tsParticles](https://github.com/matteobruni/tsparticles) ReactJS component

## Installation

```shell
npm install react-tsparticles
```

or

```shell
yarn add react-tsparticles
```

#### create-react-app

Starting from version 1.17.0 there are two official `create-react-app` templates:

- `cra-template-particles`: Simple ReactJS template with full screen particles, using JavaScript
- `cra-template-particles-typescript`: Simple ReactJS template with full screen particles, using TypeScript

You can simply install them using the `create-react-app` command like this:

```shell script
create-react-app your_app --template particles
```

or

```shell script
create-react-app your_app --template particles-typescript
```

## How to use

### Code

Example:

```javascript
import Particles from "react-tsparticles";

class App extends Component {
  render() {
    return (
      <Particles
        id="tsparticles"
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

| Prop            | Type   | Definition                                                                                                           |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| width           | string | The width of the canvas.                                                                                             |
| height          | string | The height of the canvas.                                                                                            |
| options         | object | The options of the particles instance.                                                                               |
| style           | object | The style of the canvas element.                                                                                     |
| className       | string | The class name of the canvas wrapper.                                                                                |
| canvasClassName | string | the class name of the canvas.                                                                                        |
| container       | object | The instance of the [particles container](https://github.com/matteobruni/tsparticles/wiki/Particles-Container-class) |

Find your parameters configuration [here](https://particles.matteobruni.it).

### Errors

If you have typescript errors `tsParticles` uses TypeScript `3.9.6` so try installing at least 3.8 for `import type` syntax.

## Demos

The demo website is [here](https://particles.matteobruni.it)

<https://particles.matteobruni.it>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
