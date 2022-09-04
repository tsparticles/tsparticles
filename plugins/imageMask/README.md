[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Image Mask Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-plugin-image-mask/badge)](https://www.jsdelivr.com/package/npm/tsparticles-plugin-image-mask)
[![npmjs](https://badge.fury.io/js/tsparticles-plugin-image-mask.svg)](https://www.npmjs.com/package/tsparticles-plugin-image-mask)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-plugin-image-mask)](https://www.npmjs.com/package/tsparticles-plugin-image-mask) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) plugin for particles image mask effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.image-mask.min.js` file will export the function to load the plugin:

```javascript
loadImageMaskPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadImageMaskPlugin(tsParticles);

  await tsParticles.load("tsparticles", {
    /* options */
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-plugin-image-mask
```

or

```shell
$ yarn add tsparticles-plugin-image-mask
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadImageMaskPlugin } = require("tsparticles-plugin-image-mask");

loadImageMaskPlugin(tsParticles); // awaitable
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadImageMaskPlugin } from "tsparticles-plugin-image-mask";

loadImageMaskPlugin(tsParticles); // awaitable
```
