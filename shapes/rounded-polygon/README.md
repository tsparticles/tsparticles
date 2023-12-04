[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Rounded Polygon Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-rounded-polygon/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-rounded-polygon)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-rounded-polygon.svg)](https://www.npmjs.com/package/@tsparticles/shape-rounded-polygon)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-rounded-polygon)](https://www.npmjs.com/package/@tsparticles/shape-rounded-polygon) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional rounded polygon shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.rounded-polygon.min.js` file will export the function to load the shape:

```javascript
loadRoundedPolygonShape;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadRoundedPolygonShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "rounded-polygon" */
      /*   or you can use particles.shape.type: "triangle" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-rounded-polygon
```

or

```shell
$ yarn add @tsparticles/shape-rounded-polygon
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadRoundedPolygonShape } = require("@tsparticles/shape-rounded-polygon");

(async () => {
  await loadRoundedPolygonShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadRoundedPolygonShape } from "@tsparticles/shape-rounded-polygon";

(async () => {
  await loadRoundedPolygonShape(tsParticles);
})();
```
