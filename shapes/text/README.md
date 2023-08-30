[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Text Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-text/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-text)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-text.svg)](https://www.npmjs.com/package/@tsparticles/shape-text)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-text)](https://www.npmjs.com/package/@tsparticles/shape-text) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional text shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.text.min.js` file will export the function to load the shape:

```javascript
loadTextShape;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadTextShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "text" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-text
```

or

```shell
$ yarn add @tsparticles/shape-text
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadTextShape } = require("@tsparticles/shape-text");

(async () => {
  await loadTextShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadTextShape } from "@tsparticles/shape-text";

(async () => {
  await loadTextShape(tsParticles);
})();
```
