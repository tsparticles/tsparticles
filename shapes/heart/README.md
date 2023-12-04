[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Heart Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-heart/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-heart)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-heart.svg)](https://www.npmjs.com/package/@tsparticles/shape-heart)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-heart)](https://www.npmjs.com/package/@tsparticles/shape-heart) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional heart shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.heart.min.js` file will export the function to load the shape:

```text
loadHeartShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadHeartShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "heart" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-heart
```

or

```shell
$ yarn add @tsparticles/shape-heart
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadHeartShape } = require("@tsparticles/shape-heart");

(async () => {
  await loadHeartShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadHeartShape } from "@tsparticles/shape-heart";

(async () => {
  await loadHeartShape(tsParticles);
})();
```
