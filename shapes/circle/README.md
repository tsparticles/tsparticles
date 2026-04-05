[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Circle Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-circle/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-circle)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-circle.svg)](https://www.npmjs.com/package/@tsparticles/shape-circle)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-circle)](https://www.npmjs.com/package/@tsparticles/shape-circle) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional circle shape.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.circle.min.js` file will export the function to load the shape:

```javascript
loadCircleShape;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadCircleShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "circle" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-circle
```

or

```shell
$ yarn add @tsparticles/shape-circle
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadCircleShape } = require("@tsparticles/shape-circle");

(async () => {
  await loadCircleShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadCircleShape } from "@tsparticles/shape-circle";

(async () => {
  await loadCircleShape(tsParticles);
})();
```

## Option mapping

- Primary options key: `particles.shape.type: "circle"`
- Shape-specific options key: `particles.shape.options.circle`

```json
{
  "particles": {
    "shape": {
      "type": "circle",
      "options": {
        "circle": {}
      }
    }
  }
}
```

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadCircleShape(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- All packages catalog: <https://github.com/tsparticles/tsparticles>
- Main docs: <https://particles.js.org/docs/>
