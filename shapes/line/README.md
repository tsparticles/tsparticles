[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Line Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-shape-line/badge)](https://www.jsdelivr.com/package/npm/tsparticles-shape-line)
[![npmjs](https://badge.fury.io/js/tsparticles-shape-line.svg)](https://www.npmjs.com/package/tsparticles-shape-line)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-shape-line)](https://www.npmjs.com/package/tsparticles-shape-line) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) additional line shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.line.min.js` file will export the function to load the shape:

```javascript
loadLineShape;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadLineShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "line" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-shape-line
```

or

```shell
$ yarn add tsparticles-shape-line
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadLineShape } = require("tsparticles-shape-line");

(async () => {
  await loadLineShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadLineShape } from "tsparticles-shape-line";

(async () => {
  await loadLineShape(tsParticles);
})();
```
