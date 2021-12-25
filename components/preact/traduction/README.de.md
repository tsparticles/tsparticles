[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# preact-particles

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

Offizieller [tsParticles](https://github.com/matteobruni/tsparticles) Preact-Komponent

## Installation

```shell

npm install preact-particles

```

oder

```shell

yarn add preact-particles

```

## Bedienungsanleitung

### Code

Beispiel:

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
}
```

### Props

| Prop | Typ | Definition |

| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |

| width | string | Die Breite der canvas. |

| height | string | Die Höhe der canvas. |

| options | object | Die Optionen der Partikelinstanz. |

| style | object | das Design des canvas-Elements |

| className | string | Der Klassenname des canvas-wrappers |

| canvasClassName | string | Der Klassenname des canvas. |

| container | object | Die Instanz des [Partikel-Containers](https://particles.js.org/docs/modules/_core_container_.html) |

Finde die Konfiguration der Parameter [hier](https://particles.js.org).

### Errors

Sollten Fehler auftreten: `tsParticles` benutzt TypeScript `3.9.6`. Benutze also mindestens 3.8 für die `import type` Syntax.

## Demos

Klicke [hier](https://particles.js.org) für die Demo-Webseite.

<https://particles.js.org>

[Hier](https://codepen.io/collection/DPOage) gibt es auch eine CodePen-Sammlung, die aktiv gepflegt und geupdated wird.

<https://codepen.io/collection/DPOage>
