[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Squircle Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-squircle/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-squircle)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-squircle.svg)](https://www.npmjs.com/package/@tsparticles/shape-squircle)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-squircle)](https://www.npmjs.com/package/@tsparticles/shape-squircle) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional squircle shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.squircle.min.js` file will export the function to load the shape:

```text
loadSquircleShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadSquircleShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "squircle" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-squircle
```

or

```shell
$ yarn add @tsparticles/shape-squircle
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadSquircleShape } = require("@tsparticles/shape-squircle");

(async () => {
  await loadSquircleShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadSquircleShape } from "@tsparticles/shape-squircle";

(async () => {
  await loadSquircleShape(tsParticles);
})();
```
