[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Cards Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/shape-cards/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/shape-cards)
[![npmjs](https://badge.fury.io/js/@tsparticles/shape-cards.svg)](https://www.npmjs.com/package/@tsparticles/shape-cards)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/shape-cards)](https://www.npmjs.com/package/@tsparticles/shape-cards) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional cards shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.cards.min.js` file will export the function to load the shape:

```text
loadCardsShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadCardsShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: ["heart", "diamond", "spade", "club"] */
      /*   or you can use particles.shape.type: ["hearts", "diamonds", "spades", "clubs"] */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/shape-cards
```

or

```shell
$ yarn add @tsparticles/shape-cards
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadCardsShape } = require("@tsparticles/shape-cards");

(async () => {
  await loadCardsShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadCardsShape } from "@tsparticles/shape-cards";

(async () => {
  await loadCardsShape(tsParticles);
})();
```
