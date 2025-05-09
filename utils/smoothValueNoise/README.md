[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Smooth Value Noise Library

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/smooth-value-noise/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/smooth-value-noise)
[![npmjs](https://badge.fury.io/js/@tsparticles/smooth-value-noise.svg)](https://www.npmjs.com/package/@tsparticles/smooth-value-noise)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/smooth-value-noise)](https://www.npmjs.com/package/@tsparticles/smooth-value-noise) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for smooth-value noise movement.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.smooth.value.noise.min.js` file will export the function to load the path plugin:

```text
loadSmoothValueNoisePath
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
(async () => {
  await loadSmoothValueNoisePath(tsParticles);

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
$ npm install @tsparticles/smooth-value-noise
```

or

```shell
$ yarn add @tsparticles/smooth-value-noise
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadSmoothValueNoisePath } = require("@tsparticles/smooth-value-noise");

(async () => {
  await loadSmoothValueNoisePath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadSmoothValueNoisePath } from "@tsparticles/smooth-value-noise";

(async () => {
  await loadSmoothValueNoisePath(tsParticles);
})();
```
