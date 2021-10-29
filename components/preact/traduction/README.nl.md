[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# preact-particles

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

Officiële [tsParticles](https://github.com/matteobruni/tsparticles) Preact component

## Installatie

```shell
npm install preact-particles
```

of

```shell
yarn add preact-particles
```

## Hoe je het gebruikt

### Code

Voorbeeld:

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
                size: 40
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
| width           | string | De breedte van het canvas.                                                                                             |
| height          | string | De height van het canvas.                                                                                            |
| options         | object | De options van de deeltjes instantie.                                                                               |
| style           | object | De stijl van het canvas element.                                                                                     |
| className       | string | De class naam van de canvas wrapper.                                                                                |
| canvasClassName | string | De class naam van het canvas.                                                                                        |
| container       | object | De instantie van de [deeltjes container](https://particles.js.org/docs/modules/_core_container_.html) |

Vind je parameters configuratie [hier](https://particles.js.org).

### Errors

Als je TypeScript errors hebt, `tsParticles` gebruikt TypeScript `3.9.6` dus probeer op zijn minst 3.8 te installeren voor de `import type` syntaxis.

## Demos

De demo website is [hier](https://particles.js.org)

<https://particles.js.org>

Er is ook een CodePen collectie die actief onderhouden en geüpdated wordt [hier](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
