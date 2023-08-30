[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Easing Quart Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-easing-quart/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-easing-quart)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-easing-quart.svg)](https://www.npmjs.com/package/@tsparticles/plugin-easing-quart)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-easing-quart)](https://www.npmjs.com/package/@tsparticles/plugin-easing-quart) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the easing quart support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.easing.quart.min.js` file will export the function to load the plugin:

```text
loadEasingQuartPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadEasingQuartPlugin();

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
$ npm install @tsparticles/plugin-easing-quart
```

or

```shell
$ yarn add @tsparticles/plugin-easing-quart
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadEasingQuartPlugin } = require("@tsparticles/plugin-easing-quart");

(async () => {
  await loadEasingQuartPlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadEasingQuartPlugin } from "@tsparticles/plugin-easing-quart";

(async () => {
  await loadEasingQuartPlugin();
})();
```
