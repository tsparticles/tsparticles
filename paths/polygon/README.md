[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Polygon Path

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-path-polygon/badge)](https://www.jsdelivr.com/package/npm/tsparticles-path-polygon)
[![npmjs](https://badge.fury.io/js/tsparticles-path-polygon.svg)](https://www.npmjs.com/package/tsparticles-path-polygon)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-path-polygon)](https://www.npmjs.com/package/tsparticles-path-polygon)

[tsParticles](https://github.com/matteobruni/tsparticles) path plugin for polygon movement.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.path.polygon.min.js` file will export the function to load the path plugin:

```javascript
loadPolygonPath;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
loadPolygonPath(tsParticles);

tsParticles.load("tsparticles", {
    /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-path-polygon
```

or

```shell
$ yarn add tsparticles-path-polygon
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadPolygonPath } = require("tsparticles-path-polygon");

loadPolygonPath(tsParticles);
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadPolygonPath } from "tsparticles-path-polygon";

loadPolygonPath(tsParticles);
```
