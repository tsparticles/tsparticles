[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Perlin Noise Path

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-path-perlin-noise/badge)](https://www.jsdelivr.com/package/npm/tsparticles-path-perlin-noise)
[![npmjs](https://badge.fury.io/js/tsparticles-path-perlin-noise.svg)](https://www.npmjs.com/package/tsparticles-path-perlin-noise)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-path-perlin-noise)](https://www.npmjs.com/package/tsparticles-path-perlin-noise)

[tsParticles](https://github.com/matteobruni/tsparticles) path plugin for perlin noise movement.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.path.perlin.noise.min.js` file will export the function to load the path plugin:

```javascript
loadPerlinNoisePath;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
loadPerlinNoisePath(tsParticles);

tsParticles.load("tsparticles", {
    /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-path-perlin-noise
```

or

```shell
$ yarn add tsparticles-path-perlin-noise
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadPerlinNoisePath } = require("tsparticles-path-perlin-noise");

loadPerlinNoisePath(tsParticles);
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadPerlinNoisePath } from "tsparticles-path-perlin-noise";

loadPerlinNoisePath(tsParticles);
```
