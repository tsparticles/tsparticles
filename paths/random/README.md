[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Random Path

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/path-random/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/path-random)
[![npmjs](https://badge.fury.io/js/@tsparticles/path-random.svg)](https://www.npmjs.com/package/@tsparticles/path-random)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/path-random)](https://www.npmjs.com/package/@tsparticles/path-random) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) path plugin for random path movement.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.path.random.min.js` file will export the function to load the path plugin:

```text
loadRandomPath
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the path plugin like this:

```javascript
(async () => {
  await loadRandomPath(tsParticles);

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
$ npm install @tsparticles/path-random
```

or

```shell
$ yarn add @tsparticles/path-random
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadRandomPath } = require("@tsparticles/path-random");

(async () => {
  await loadRandomPath(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadRandomPath } from "@tsparticles/path-random";

(async () => {
  await loadRandomPath(tsParticles);
})();
```

## Option mapping

- Primary options key: `particles.move.path`
- Path generator name: `"random"`

```json
{
  "particles": {
    "move": {
      "enable": true,
      "path": {
        "enable": true,
        "generator": "random",
        "options": {}
      }
    }
  }
}
```

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadRandomPath(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- All packages catalog: <https://github.com/tsparticles/tsparticles>
- Main docs: <https://particles.js.org/docs/>
