[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Curves Path

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/path-curves/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/path-curves)
[![npmjs](https://badge.fury.io/js/@tsparticles/path-curves.svg)](https://www.npmjs.com/package/@tsparticles/path-curves)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/path-curves)](https://www.npmjs.com/package/@tsparticles/path-curves) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for curves movement.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.path.curves.min.js` file will export the function to load the path plugin:

```text
loadCurvesPath
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
(async () => {
  await loadCurvesPath(tsParticles);

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
$ npm install @tsparticles/path-curves
```

or

```shell
$ yarn add @tsparticles/path-curves
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadCurvesPath } = require("@tsparticles/path-curves");

(async () => {
  await loadCurvesPath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadCurvesPath } from "@tsparticles/path-curves";

(async () => {
  await loadCurvesPath(tsParticles);
})();
```
