[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Polygon Path

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/path-polygon/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/path-polygon)
[![npmjs](https://badge.fury.io/js/@tsparticles/path-polygon.svg)](https://www.npmjs.com/package/@tsparticles/path-polygon)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/path-polygon)](https://www.npmjs.com/package/@tsparticles/path-polygon) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for polygon movement.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.path.polygon.min.js` file will export the function to load the path plugin:

```text
loadPolygonPath
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
(async () => {
  await loadPolygonPath(tsParticles);

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
$ npm install @tsparticles/path-polygon
```

or

```shell
$ yarn add @tsparticles/path-polygon
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadPolygonPath } = require("@tsparticles/path-polygon");

(async () => {
  await loadPolygonPath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadPolygonPath } from "@tsparticles/path-polygon";

(async () => {
  await loadPolygonPath(tsParticles);
})();
```

## Option mapping

- Primary options key: `particles.move.path`
- Path generator name: `"polygon"`

```json
{
  "particles": {
    "move": {
      "enable": true,
      "path": {
        "enable": true,
        "generator": "polygon",
        "options": {}
      }
    }
  }
}
```

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadPolygonPath(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- All packages catalog: <https://github.com/tsparticles/tsparticles>
- Main docs: <https://particles.js.org/docs/>
