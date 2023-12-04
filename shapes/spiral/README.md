[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Spiral Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-spiral/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-spiral)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-spiral.svg)](https://www.npmjs.com/package/@tsparticles/shape-spiral)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-spiral)](https://www.npmjs.com/package/@tsparticles/shape-spiral) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional spiral shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.spiral.min.js` file will export the function to load the shape:

```text
loadSpiralShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadSpiralShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "spiral" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-spiral
```

or

```shell
$ yarn add @tsparticles/shape-spiral
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadSpiralShape } = require("@tsparticles/shape-spiral");

(async () => {
  await loadSpiralShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadSpiralShape } from "@tsparticles/shape-spiral";

(async () => {
  await loadSpiralShape(tsParticles);
})();
```
