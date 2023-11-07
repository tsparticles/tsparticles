[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Emitters Shape Canvas Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-emitters-shape-canvas/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-emitters-shape-canvas)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-emitters-shape-canvas.svg)](https://www.npmjs.com/package/@tsparticles/plugin-emitters-shape-canvas)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-emitters-shape-canvas)](https://www.npmjs.com/package/@tsparticles/plugin-emitters-shape-canvas) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the emitters shape canvas support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.emitters.shape.canvas.min.js` file will export the function to load the plugin:

```text
loadEmittersShapeCanvasPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadEmittersPlugin(tsParticles);
  await loadEmittersShapeCanvasPlugin(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/plugin-emitters-shape-canvas
```

or

```shell
$ yarn add @tsparticles/plugin-emitters-shape-canvas
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadEmittersPlugin } = require("@tsparticles/plugin-emitters");
const { loadEmittersShapeCanvasPlugin } = require("@tsparticles/plugin-emitters-shape-canvas");

(async () => {
  await loadEmittersPlugin(tsParticles);
  await loadEmittersShapeCanvasPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadEmittersShapeCanvasPlugin } from "@tsparticles/plugin-emitters-shape-canvas";

(async () => {
  await loadEmittersPlugin(tsParticles);
  await loadEmittersShapeCanvasPlugin(tsParticles);
})();
```
