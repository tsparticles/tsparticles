[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Matrix Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-matrix/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-matrix)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-matrix.svg)](https://www.npmjs.com/package/@tsparticles/shape-matrix)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-matrix)](https://www.npmjs.com/package/@tsparticles/shape-matrix) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional matrix shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.matrix.min.js` file will export the function to load the shape:

```text
loadMatrixShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadMatrixShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "matrix" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-matrix
```

or

```shell
$ yarn add @tsparticles/shape-matrix
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadMatrixShape } = require("@tsparticles/shape-matrix");

(async () => {
  await loadMatrixShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadMatrixShape } from "@tsparticles/shape-matrix";

(async () => {
  await loadMatrixShape(tsParticles);
})();
```
