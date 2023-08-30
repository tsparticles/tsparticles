[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Canvas Mask Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-canvas-mask/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-canvas-mask)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-canvas-mask.svg)](https://www.npmjs.com/package/@tsparticles/plugin-canvas-mask)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-canvas-mask)](https://www.npmjs.com/package/@tsparticles/plugin-canvas-mask) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for particles canvas mask effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.canvas-mask.min.js` file will export the function to load the plugin:

```javascript
loadCanvasMaskPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadCanvasMaskPlugin(tsParticles);

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
$ npm install @tsparticles/plugin-canvas-mask
```

or

```shell
$ yarn add @tsparticles/plugin-canvas-mask
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadCanvasMaskPlugin } = require("@tsparticles/plugin-canvas-mask");

(async () => {
  await loadCanvasMaskPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadCanvasMaskPlugin } from "@tsparticles/plugin-canvas-mask";

(async () => {
  await loadCanvasMaskPlugin(tsParticles);
})();
```
