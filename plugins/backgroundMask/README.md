[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Background Mask Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-background-mask/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-background-mask)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-background-mask.svg)](https://www.npmjs.com/package/@tsparticles/plugin-background-mask)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-background-mask)](https://www.npmjs.com/package/@tsparticles/plugin-background-mask) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for handling background mask feature.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.backgroundMask.min.js` file will export the function to load the plugin:

```javascript
loadBackgroundMaskPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadBackgroundMaskPlugin(tsParticles);

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
$ npm install @tsparticles/plugin-background-mask
```

or

```shell
$ yarn add @tsparticles/plugin-background-mask
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadBackgroundMaskPlugin } = require("@tsparticles/plugin-background-mask");

(async () => {
  await loadBackgroundMaskPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadBackgroundMaskPlugin } from "@tsparticles/plugin-background-mask";

(async () => {
  await loadBackgroundMaskPlugin(tsParticles);
})();
```
