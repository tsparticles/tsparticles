[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Svg Path Utils Library

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/svg-path-utils/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/svg-path-utils)
[![npmjs](https://badge.fury.io/js/@tsparticles/svg-path-utils.svg)](https://www.npmjs.com/package/@tsparticles/svg-path-utils)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/svg-path-utils)](https://www.npmjs.com/package/@tsparticles/svg-path-utils) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for svg path utils movement.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.svg.path.utils.min.js` file will export the function to load the path plugin:

```text
loadSvgPathUtilsPath
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
(async () => {
  await loadSvgPathUtilsPath(tsParticles);

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
$ npm install @tsparticles/svg-path-utils
```

or

```shell
$ yarn add @tsparticles/svg-path-utils
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadSvgPathUtilsPath } = require("@tsparticles/svg-path-utils");

(async () => {
  await loadSvgPathUtilsPath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadSvgPathUtilsPath } from "@tsparticles/svg-path-utils";

(async () => {
  await loadSvgPathUtilsPath(tsParticles);
})();
```
