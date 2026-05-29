[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Ribbon Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-ribbon/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-ribbon)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-ribbon.svg)](https://www.npmjs.com/package/@tsparticles/shape-ribbon)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-ribbon)](https://www.npmjs.com/package/@tsparticles/shape-ribbon) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional ribbon shape.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.ribbon.min.js` file will export the function to load the shape:

```text
loadRibbonShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadRibbonShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "ribbon" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-ribbon
```

or

```shell
$ yarn add @tsparticles/shape-ribbon
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadRibbonShape } = require("@tsparticles/shape-ribbon");

(async () => {
  await loadRibbonShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadRibbonShape } from "@tsparticles/shape-ribbon";

(async () => {
  await loadRibbonShape(tsParticles);
})();
```

## Option mapping

- Primary options key: `particles.shape.type: "ribbon"`
- Shape-specific options key: `particles.shape.options.ribbon`

```json
{
  "particles": {
    "shape": {
      "type": "ribbon",
      "options": {
        "ribbon": {
          "points": 12,
          "waveAmplitude": 0.35,
          "waveFrequency": 1.8,
          "thickness": 0.45
        }
      }
    }
  }
}
```

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadRibbonShape(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- All packages catalog: <https://github.com/tsparticles/tsparticles>
- Main docs: <https://particles.js.org/docs/>
