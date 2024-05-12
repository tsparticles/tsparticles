[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Infinity Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-infinity/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-infinity)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-infinity.svg)](https://www.npmjs.com/package/@tsparticles/shape-infinity)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-infinity)](https://www.npmjs.com/package/@tsparticles/shape-infinity) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional infinity shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.infinity.min.js` file will export the function to load the shape:

```text
loadInfinityShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadInfinityShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "infinity" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-infinity
```

or

```shell
$ yarn add @tsparticles/shape-infinity
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadInfinityShape } = require("@tsparticles/shape-infinity");

(async () => {
  await loadInfinityShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadInfinityShape } from "@tsparticles/shape-infinity";

(async () => {
  await loadInfinityShape(tsParticles);
})();
```
