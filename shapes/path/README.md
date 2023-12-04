[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Path Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-path/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-path)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-path.svg)](https://www.npmjs.com/package/@tsparticles/shape-path)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-path)](https://www.npmjs.com/package/@tsparticles/shape-path) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional path shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.path.min.js` file will export the function to load the shape:

```text
loadPathShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadPathShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "path" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-path
```

or

```shell
$ yarn add @tsparticles/shape-path
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadPathShape } = require("@tsparticles/shape-path");

(async () => {
  await loadPathShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadPathShape } from "@tsparticles/shape-path";

(async () => {
  await loadPathShape(tsParticles);
})();
```
