[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Brownian Path

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/path-brownian/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/path-brownian)
[![npmjs](https://badge.fury.io/js/@tsparticles/path-brownian.svg)](https://www.npmjs.com/package/@tsparticles/path-brownian)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/path-brownian)](https://www.npmjs.com/package/@tsparticles/path-brownian) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for brownian movement.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.path.brownian.min.js` file will export the function to load the path plugin:

```text
loadBrownianPath
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
(async () => {
  await loadBrownianPath(tsParticles);

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
$ npm install @tsparticles/path-brownian
```

or

```shell
$ yarn add @tsparticles/path-brownian
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadBrownianPath } = require("@tsparticles/path-brownian");

(async () => {
  await loadBrownianPath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadBrownianPath } from "@tsparticles/path-brownian";

(async () => {
  await loadBrownianPath(tsParticles);
})();
```
