[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Emoji Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-emoji/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-emoji)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-emoji.svg)](https://www.npmjs.com/package/@tsparticles/shape-emoji)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-emoji)](https://www.npmjs.com/package/@tsparticles/shape-emoji) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional emoji shape.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.emoji.min.js` file will export the function to load the shape:

```javascript
loadEmojiShape;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadEmojiShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "emoji" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-emoji
```

or

```shell
$ yarn add @tsparticles/shape-emoji
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadEmojiShape } = require("@tsparticles/shape-emoji");

(async () => {
  await loadEmojiShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadEmojiShape } from "@tsparticles/shape-emoji";

(async () => {
  await loadEmojiShape(tsParticles);
})();
```

## Option mapping

- Primary options key: `particles.shape.type: "emoji"`
- Shape-specific options key: `particles.shape.options.emoji`

```json
{
  "particles": {
    "shape": {
      "type": "emoji",
      "options": {
        "emoji": {}
      }
    }
  }
}
```

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadEmojiShape(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- All packages catalog: <https://github.com/tsparticles/tsparticles>
- Main docs: <https://particles.js.org/docs/>
