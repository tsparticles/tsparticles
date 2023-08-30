[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Cog Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-cog/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-cog)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-cog.svg)](https://www.npmjs.com/package/@tsparticles/shape-cog)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-cog)](https://www.npmjs.com/package/@tsparticles/shape-cog) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional cog shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.cog.min.js` file will export the function to load the shape:

```text
loadCogShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadCogShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "cog" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-cog
```

or

```shell
$ yarn add @tsparticles/shape-cog
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadCogShape } = require("@tsparticles/shape-cog");

(async () => {
  await loadCogShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadCogShape } from "@tsparticles/shape-cog";

(async () => {
  await loadCogShape(tsParticles);
})();
```
