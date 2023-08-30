[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Arrow Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-arrow/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-arrow)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-arrow.svg)](https://www.npmjs.com/package/@tsparticles/shape-arrow)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-arrow)](https://www.npmjs.com/package/@tsparticles/shape-arrow) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional arrow shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.arrow.min.js` file will export the function to load the shape:

```text
loadArrowShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadArrowShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "arrow" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-arrow
```

or

```shell
$ yarn add @tsparticles/shape-arrow
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadArrowShape } = require("@tsparticles/shape-arrow");

(async () => {
  await loadArrowShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadArrowShape } from "@tsparticles/shape-arrow";

(async () => {
  await loadArrowShape(tsParticles);
})();
```
