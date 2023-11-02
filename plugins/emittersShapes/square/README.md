[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Emitters Shape Square Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-emitters-shape-square/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-emitters-shape-square)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-emitters-shape-square.svg)](https://www.npmjs.com/package/@tsparticles/plugin-emitters-shape-square)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-emitters-shape-square)](https://www.npmjs.com/package/@tsparticles/plugin-emitters-shape-square) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the emitters shape square support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.emitters.shape.square.min.js` file will export the function to load the plugin:

```text
loadEmittersShapeSquarePlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadEmittersPlugin(tsParticles);
  await loadEmittersShapeSquarePlugin(tsParticles);

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
$ npm install @tsparticles/plugin-emitters-shape-square
```

or

```shell
$ yarn add @tsparticles/plugin-emitters-shape-square
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadEmittersPlugin } = require("@tsparticles/plugin-emitters");
const { loadEmittersShapeSquarePlugin } = require("@tsparticles/plugin-emitters-shape-square");

(async () => {
  await loadEmittersPlugin(tsParticles);
  await loadEmittersShapeSquarePlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadEmittersShapeSquarePlugin } from "@tsparticles/plugin-emitters-shape-square";

(async () => {
  await loadEmittersPlugin(tsParticles);
  await loadEmittersShapeSquarePlugin(tsParticles);
})();
```
