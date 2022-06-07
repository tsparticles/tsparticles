[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Polygon Mask Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-plugin-polygon-mask/badge)](https://www.jsdelivr.com/package/npm/tsparticles-plugin-polygon-mask)
[![npmjs](https://badge.fury.io/js/tsparticles-plugin-polygon-mask.svg)](https://www.npmjs.com/package/tsparticles-plugin-polygon-mask)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-plugin-polygon-mask)](https://www.npmjs.com/package/tsparticles-plugin-polygon-mask)

[tsParticles](https://github.com/matteobruni/tsparticles) plugin for particles polygon mask effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.polygon-mask.min.js` file will export the function to load the plugin:

```javascript
loadPolygonMaskPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadPolygonMaskPlugin(tsParticles);

  await tsParticles.load("tsparticles", {
    /* options */
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-plugin-polygon-mask
```

or

```shell
$ yarn add tsparticles-plugin-polygon-mask
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadPolygonMaskPlugin } = require("tsparticles-plugin-polygon-mask");

loadPolygonMaskPlugin(tsParticles); // awaitable
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadPolygonMaskPlugin } from "tsparticles-plugin-polygon-mask";

loadPolygonMaskPlugin(tsParticles); // awaitable
```
