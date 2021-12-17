[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# jquery-particles

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

Official [tsParticles](https://github.com/matteobruni/tsparticles) jQuery plugin

## Installation

```shell
$ npm install jquery-particles jquery
```

or

```shell
$ yarn add jquery-particles jquery
```

or from jsDelivr

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/jquery-particles/badge)](https://www.jsdelivr.com/package/npm/jquery-particles)

```html
<!-- first include tsParticles engine -->
<script src="https://cdn.jsdelivr.net/npm/tsparticles-engine"></script>

<!-- then include any tsParticles plugin needed -->
<script src="https://cdn.jsdelivr.net/npm/tsparticles/tsparticles.bundle.min.js"></script>

<!-- then include jquery wrapper -->
<script src="https://cdn.jsdelivr.net/npm/jquery-particles"></script>
```

## How to use

HTML

```html
<div id="tsparticles"></div>
```

```javascript
// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
// starting from v2 you can add only the features you need reducing the bundle size
loadFull(tsParticles);

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
          outModes: {
            default: "bounce",
          },
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
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    },
    function (container) {
      // container is the particles container where you can play/pause or stop/start.
      // the container is already started, you don't need to start it manually.
    }
  );
// or

$("#tsparticles")
  .particles()
  .ajax("particles.json", function (container) {
    // container is the particles container where you can play/pause or stop/start.
    // the container is already started, you don't need to start it manually.
  });
```

## Demos

The demo website is [here](https://particles.js.org)

<https://particles.js.org>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
