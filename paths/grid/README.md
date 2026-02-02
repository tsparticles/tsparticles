[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Grid Path

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/path-grid/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/path-grid)
[![npmjs](https://badge.fury.io/js/@tsparticles/path-grid.svg)](https://www.npmjs.com/package/@tsparticles/path-grid)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/path-grid)](https://www.npmjs.com/package/@tsparticles/path-grid) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for grid path movement.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.path.grid.min.js` file will export the function to load the path plugin:

```text
loadGridPath
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
(async () => {
  await loadGridPath(tsParticles);

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
$ npm install @tsparticles/path-grid
```

or

```shell
$ yarn add @tsparticles/path-grid
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadGridPath } = require("@tsparticles/path-grid");

(async () => {
  await loadGridPath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadGridPath } from "@tsparticles/path-grid";

(async () => {
  await loadGridPath(tsParticles);
})();
```
