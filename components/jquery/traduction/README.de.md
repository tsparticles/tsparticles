[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# jquery-particles

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

Offizielles [tsParticles](https://github.com/matteobruni/tsparticles) jQuery plugin

## Installation

```shell script

npm install jquery-particles

```

oder von jsDelivr

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/jquery-particles/badge)](https://www.jsdelivr.com/package/npm/jquery-particles)

```html
<!-- füge zuerst tsParticles ein -->

<script src="https://cdn.jsdelivr.net/npm/tsparticles"></script>

<!-- füge danach den jquery-wrapper ein -->

<script src="https://cdn.jsdelivr.net/npm/jquery-particles"></script>
```

## Bedienungsanleitung

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
    },

    function (container) {
      // container ist der Partikel-Container wo du play/pause oder stop/start kannst.
      // der Container wurde bereits gestartet, du musst in deswegen nicht nochmals manuell starten.
    }
  );

// oder

$("#tsparticles")
  .particles()

  .ajax("particles.json", function (container) {
    // container ist der Partikel-Container wo du play/pause oder stop/start kannst.
    // der Container wurde bereits gestartet, du musst in deswegen nicht nochmals manuell starten.
  });
```

## Demos

Klicke [hier](https://particles.js.org) für die Demo-Webseite.

<https://particles.js.org>

[Hier](https://codepen.io/collection/DPOage) gibt es auch eine CodePen-Sammlung, die aktiv gepflegt und geupdated wird.

<https://codepen.io/collection/DPOage>
