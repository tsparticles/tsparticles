[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Grid Path Path

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/path-grid-path/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/path-grid-path)
[![npmjs](https://badge.fury.io/js/@tsparticles/path-grid-path.svg)](https://www.npmjs.com/package/@tsparticles/path-grid-path)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/path-grid-path)](https://www.npmjs.com/package/@tsparticles/path-grid-path) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for grid path movement.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.path.gridPath.min.js` file will export the function to load the path plugin:

```text
loadGridPathPath
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
(async () => {
  await loadGridPathPath(tsParticles);

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
$ npm install @tsparticles/path-grid-path
```

or

```shell
$ yarn add @tsparticles/path-grid-path
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadGridPathPath } = require("@tsparticles/path-grid-path");

(async () => {
  await loadGridPathPath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadGridPathPath } from "@tsparticles/path-grid-path";

(async () => {
  await loadGridPathPath(tsParticles);
})();
```
