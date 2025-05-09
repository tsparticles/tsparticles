[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Fractal Noise Library

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/fractal-noise/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/fractal-noise)
[![npmjs](https://badge.fury.io/js/@tsparticles/fractal-noise.svg)](https://www.npmjs.com/package/@tsparticles/fractal-noise)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/fractal-noise)](https://www.npmjs.com/package/@tsparticles/fractal-noise) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for fractal noise movement.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.fractal.noise.min.js` file will export the function to load the path plugin:

```text
loadFractalNoisePath
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
(async () => {
  await loadFractalNoisePath(tsParticles);

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
$ npm install @tsparticles/fractal-noise
```

or

```shell
$ yarn add @tsparticles/fractal-noise
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadFractalNoisePath } = require("@tsparticles/fractal-noise");

(async () => {
  await loadFractalNoisePath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadFractalNoisePath } from "@tsparticles/fractal-noise";

(async () => {
  await loadFractalNoisePath(tsParticles);
})();
```
