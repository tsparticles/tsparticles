[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Star Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-shape-star/badge)](https://www.jsdelivr.com/package/npm/tsparticles-shape-star)
[![npmjs](https://badge.fury.io/js/tsparticles-shape-star.svg)](https://www.npmjs.com/package/tsparticles-shape-star)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-shape-star)](https://www.npmjs.com/package/tsparticles-shape-star) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) additional star shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.star.min.js` file will export the function to load the shape:

```javascript
loadStarShape;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadStarShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "star" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-shape-star
```

or

```shell
$ yarn add tsparticles-shape-star
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadStarShape } = require("tsparticles-shape-star");

(async () => {
  await loadStarShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadStarShape } from "tsparticles-shape-star";

(async () => {
  await loadStarShape(tsParticles);
})();
```
