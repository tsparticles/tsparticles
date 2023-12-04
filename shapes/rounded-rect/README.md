[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Rounded Rectangle Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-rounded-rect/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-rounded-rect)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-rounded-rect.svg)](https://www.npmjs.com/package/@tsparticles/shape-rounded-rect)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-rounded-rect)](https://www.npmjs.com/package/@tsparticles/shape-rounded-rect) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional rounded rectangle shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.rounded-rect.min.js` file will export the function to load the shape:

```text
loadRoundedRectShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadRoundedRectShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "rounded-rect" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-rounded-rect
```

or

```shell
$ yarn add @tsparticles/shape-rounded-rect
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadRoundedRectShape } = require("@tsparticles/shape-rounded-rect");

(async () => {
  await loadRoundedRectShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadRoundedRectShape } from "@tsparticles/shape-rounded-rect";

(async () => {
  await loadRoundedRectShape(tsParticles);
})();
```
