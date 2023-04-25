[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles SVG Path

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-path-svg/badge)](https://www.jsdelivr.com/package/npm/tsparticles-path-svg)
[![npmjs](https://badge.fury.io/js/tsparticles-path-svg.svg)](https://www.npmjs.com/package/tsparticles-path-svg)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-path-svg)](https://www.npmjs.com/package/tsparticles-path-svg) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) path plugin for on svg path movement.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.path.svg.min.js` file will export the function to load the path plugin:

```text
loadSvgPath
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
(async () => {
  await loadSvgPath(tsParticles);

  tsParticles.load("tsparticles", {
    /* options */
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-path-svg
```

or

```shell
$ yarn add tsparticles-path-svg
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadSvgPath } = require("tsparticles-path-svg");

(async () => {
  await loadSvgPath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadSvgPath } from "tsparticles-path-svg";

(async () => {
  await loadSvgPath(tsParticles);
})();
```
