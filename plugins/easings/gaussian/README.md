[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Easing Gaussian Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-easing-gaussian/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-easing-gaussian)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-easing-gaussian.svg)](https://www.npmjs.com/package/@tsparticles/plugin-easing-gaussian)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-easing-gaussian)](https://www.npmjs.com/package/@tsparticles/plugin-easing-gaussian) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the easing gaussian support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.easing.gaussian.min.js` file will export the function to load the plugin:

```text
loadEasingGaussianPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadEasingGaussianPlugin();

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
$ npm install @tsparticles/plugin-easing-gaussian
```

or

```shell
$ yarn add @tsparticles/plugin-easing-gaussian
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadEasingGaussianPlugin } = require("@tsparticles/plugin-easing-gaussian");

(async () => {
  await loadEasingGaussianPlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadEasingGaussianPlugin } from "@tsparticles/plugin-easing-gaussian";

(async () => {
  await loadEasingGaussianPlugin();
})();
```
