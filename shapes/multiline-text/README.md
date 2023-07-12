[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Multiline Text Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-shape-multiline-text/badge)](https://www.jsdelivr.com/package/npm/tsparticles-shape-multiline-text)
[![npmjs](https://badge.fury.io/js/tsparticles-shape-multiline-text.svg)](https://www.npmjs.com/package/tsparticles-shape-multiline-text)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-shape-multiline-text)](https://www.npmjs.com/package/tsparticles-shape-multiline-text) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) additional multiline text shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.multiline-text.min.js` file will export the function to load the shape:

```text
loadMultilineTextShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadMultilineTextShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "multiline-text" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-shape-multiline-text
```

or

```shell
$ yarn add tsparticles-shape-multiline-text
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadMultilineTextShape } = require("tsparticles-shape-multiline-text");

(async () => {
  await loadMultilineTextShape(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadMultilineTextShape } from "tsparticles-shape-multiline-text";

(async () => {
  await loadMultilineTextShape(tsParticles);
})();
```
