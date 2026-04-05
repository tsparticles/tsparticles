[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles ZigZag Path

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/path-zigzag/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/path-zigzag)
[![npmjs](https://badge.fury.io/js/@tsparticles/path-zigzag.zigzag)](https://www.npmjs.com/package/@tsparticles/path-zigzag)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/path-zigzag)](https://www.npmjs.com/package/@tsparticles/path-zigzag) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for on zigzag path movement.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.path.zigzag.min.js` file will export the function to load the path plugin:

```text
loadZigZagPath
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
(async () => {
  await loadZigZagPath(tsParticles);

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
$ npm install @tsparticles/path-zigzag
```

or

```shell
$ yarn add @tsparticles/path-zigzag
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadZigZagPath } = require("@tsparticles/path-zigzag");

(async () => {
  await loadZigZagPath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadZigZagPath } from "@tsparticles/path-zigzag";

(async () => {
  await loadZigZagPath(tsParticles);
})();
```

## Option mapping

- Primary options key: `particles.move.path`
- Path generator name: `"zigzag"`

```json
{
  "particles": {
    "move": {
      "enable": true,
      "path": {
        "enable": true,
        "generator": "zigzag",
        "options": {}
      }
    }
  }
}
```

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadZigZagPath(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- All packages catalog: <https://github.com/tsparticles/tsparticles>
- Main docs: <https://particles.js.org/docs/>
