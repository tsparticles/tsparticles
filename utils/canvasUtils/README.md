[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Path Utils Library

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/canvas-utils/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/canvas-utils)
[![npmjs](https://badge.fury.io/js/@tsparticles/canvas-utils.svg)](https://www.npmjs.com/package/@tsparticles/canvas-utils)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/canvas-utils)](https://www.npmjs.com/package/@tsparticles/canvas-utils) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for path utils movement.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.path.utils.min.js` file will export the function to load the path plugin:

```text
loadCanvasUtilsPath
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
(async () => {
  await loadCanvasUtilsPath(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/canvas-utils
```

or

```shell
$ yarn add @tsparticles/canvas-utils
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadCanvasUtilsPath } = require("@tsparticles/canvas-utils");

(async () => {
  await loadCanvasUtilsPath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadCanvasUtilsPath } from "@tsparticles/canvas-utils";

(async () => {
  await loadCanvasUtilsPath(tsParticles);
})();
```
