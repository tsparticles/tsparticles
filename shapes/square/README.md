[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Square Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-square/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-square)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-square.svg)](https://www.npmjs.com/package/@tsparticles/shape-square)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-square)](https://www.npmjs.com/package/@tsparticles/shape-square) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional square shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.square.min.js` file will export the function to load the shape:

```javascript
loadSquareShape;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadSquareShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "square" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-square
```

or

```shell
$ yarn add @tsparticles/shape-square
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadSquareShape } = require("@tsparticles/shape-square");

(async () => {
  await loadSquareShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadSquareShape } from "@tsparticles/shape-square";

(async () => {
  await loadSquareShape(tsParticles);
})();
```
