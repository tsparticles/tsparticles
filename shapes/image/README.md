[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Image Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-image/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-image)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-image.svg)](https://www.npmjs.com/package/@tsparticles/shape-image)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-image)](https://www.npmjs.com/package/@tsparticles/shape-image) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional image shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.image.min.js` file will export the function to load the shape:

```javascript
loadImageShape;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadImageShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "image" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-image
```

or

```shell
$ yarn add @tsparticles/shape-image
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadImageShape } = require("@tsparticles/shape-image");

(async () => {
  await loadImageShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadImageShape } from "@tsparticles/shape-image";

(async () => {
  await loadImageShape(tsParticles);
})();
```
