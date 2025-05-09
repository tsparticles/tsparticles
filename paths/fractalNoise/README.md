[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Fractal Noise Path

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/path-fractal-noise/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/path-fractal-noise)
[![npmjs](https://badge.fury.io/js/@tsparticles/path-fractal-noise.svg)](https://www.npmjs.com/package/@tsparticles/path-fractal-noise)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/path-fractal-noise)](https://www.npmjs.com/package/@tsparticles/path-fractal-noise) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for fractal noise movement.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.path.fractal.noise.min.js` file will export the function to load the path plugin:

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
$ npm install @tsparticles/path-fractal-noise
```

or

```shell
$ yarn add @tsparticles/path-fractal-noise
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadFractalNoisePath } = require("@tsparticles/path-fractal-noise");

(async () => {
  await loadFractalNoisePath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadFractalNoisePath } from "@tsparticles/path-fractal-noise";

(async () => {
  await loadFractalNoisePath(tsParticles);
})();
```
