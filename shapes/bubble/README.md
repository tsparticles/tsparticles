[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Bubble Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-shape-bubble/badge)](https://www.jsdelivr.com/package/npm/tsparticles-shape-bubble)
[![npmjs](https://badge.fury.io/js/tsparticles-shape-bubble.svg)](https://www.npmjs.com/package/tsparticles-shape-bubble)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-shape-bubble)](https://www.npmjs.com/package/tsparticles-shape-bubble) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) additional bubble shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.bubble.min.js` file will export the function to load the shape:

```text
loadBubbleShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadBubbleShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "bubble" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-shape-bubble
```

or

```shell
$ yarn add tsparticles-shape-bubble
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadBubbleShape } = require("tsparticles-shape-bubble");

(async () => {
  await loadBubbleShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadBubbleShape } from "tsparticles-shape-bubble";

(async () => {
  await loadBubbleShape(tsParticles);
})();
```
