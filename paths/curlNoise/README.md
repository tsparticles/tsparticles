[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Curl Noise Path

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/path-curl-noise/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/path-curl-noise)
[![npmjs](https://badge.fury.io/js/@tsparticles/path-curl-noise.svg)](https://www.npmjs.com/package/@tsparticles/path-curl-noise)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/path-curl-noise)](https://www.npmjs.com/package/@tsparticles/path-curl-noise) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for curl noise movement.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.path.curl.noise.min.js` file will export the function to load the path plugin:

```text
loadCurlNoisePath
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
(async () => {
  await loadCurlNoisePath(tsParticles);

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
$ npm install @tsparticles/path-curl-noise
```

or

```shell
$ yarn add @tsparticles/path-curl-noise
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadCurlNoisePath } = require("@tsparticles/path-curl-noise");

(async () => {
  await loadCurlNoisePath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadCurlNoisePath } from "@tsparticles/path-curl-noise";

(async () => {
  await loadCurlNoisePath(tsParticles);
})();
```
