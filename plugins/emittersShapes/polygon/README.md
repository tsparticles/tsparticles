[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Emitters Shape Polygon Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-emitters-shape-polygon/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-emitters-shape-polygon)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-emitters-shape-polygon.svg)](https://www.npmjs.com/package/@tsparticles/plugin-emitters-shape-polygon)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-emitters-shape-polygon)](https://www.npmjs.com/package/@tsparticles/plugin-emitters-shape-polygon) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the emitters shape polygon support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.emitters.shape.polygon.min.js` file will export the function to load the plugin:

```text
loadEmittersShapePolygonPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadEmittersPlugin(tsParticles);
  await loadEmittersShapePolygonPlugin(tsParticles);

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
$ npm install @tsparticles/plugin-emitters-shape-polygon
```

or

```shell
$ yarn add @tsparticles/plugin-emitters-shape-polygon
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadEmittersPlugin } = require("@tsparticles/plugin-emitters");
const { loadEmittersShapePolygonPlugin } = require("@tsparticles/plugin-emitters-shape-polygon");

(async () => {
  await loadEmittersPlugin(tsParticles);
  await loadEmittersShapePolygonPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadEmittersShapePolygonPlugin } from "@tsparticles/plugin-emitters-shape-polygon";

(async () => {
  await loadEmittersPlugin(tsParticles);
  await loadEmittersShapePolygonPlugin(tsParticles);
})();
```
