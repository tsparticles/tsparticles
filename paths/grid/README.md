[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Grid Path

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/path-grid/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/path-grid)
[![npmjs](https://badge.fury.io/js/@tsparticles/path-grid.svg)](https://www.npmjs.com/package/@tsparticles/path-grid)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/path-grid)](https://www.npmjs.com/package/@tsparticles/path-grid) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for grid path movement.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

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

## Option mapping

- Primary options key: `particles.move.path`
- Path generator name: `"grid"`

```json
{
  "particles": {
    "move": {
      "enable": true,
      "path": {
        "enable": true,
        "generator": "grid",
        "options": {}
      }
    }
  }
}
```

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadGridPath(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- All packages catalog: <https://github.com/tsparticles/tsparticles>
- Main docs: <https://particles.js.org/docs/>
