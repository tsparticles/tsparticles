[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Template Shape

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-shape-template/badge)](https://www.jsdelivr.com/package/npm/tsparticles-shape-template)
[![npmjs](https://badge.fury.io/js/tsparticles-shape-template.svg)](https://www.npmjs.com/package/tsparticles-shape-template)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-shape-template)](https://www.npmjs.com/package/tsparticles-shape-template) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) additional template shape.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.shape.template.min.js` file will export the function to load the shape:

```text
loadTemplateShape
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the shape like this:

```javascript
(async () => {
  await loadTemplateShape(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.shape.type: "template" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-shape-template
```

or

```shell
$ yarn add tsparticles-shape-template
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadTemplateShape } = require("tsparticles-shape-template");

(async () => {
  await loadTemplateShape(tsParticles);
})();
```

or

```javascript
import { createEngine } from "@tsparticles/engine";
const tsParticles = createEngine();
import { loadTemplateShape } from "tsparticles-shape-template";

(async () => {
  await loadTemplateShape(tsParticles);
})();
```
