[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Bubble Effect

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/effect-bubble/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/effect-bubble)
[![npmjs](https://badge.fury.io/js/@tsparticles/effect-bubble.svg)](https://www.npmjs.com/package/@tsparticles/effect-bubble)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/effect-bubble)](https://www.npmjs.com/package/@tsparticles/effect-bubble) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional bubble effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.effect.bubble.min.js` file will export the function to load the effect:

```text
loadBubbleEffect
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the effect like this:

```javascript
(async () => {
  await loadBubbleEffect(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.effect.type: "bubble" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/effect-bubble
```

or

```shell
$ yarn add @tsparticles/effect-bubble
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadBubbleEffect } = require("@tsparticles/effect-bubble");

(async () => {
  await loadBubbleEffect(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadBubbleEffect } from "@tsparticles/effect-bubble";

(async () => {
  await loadBubbleEffect(tsParticles);
})();
```
