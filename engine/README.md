[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Engine

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/engine/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/engine)
[![npmjs](https://badge.fury.io/js/@tsparticles/engine.svg)](https://www.npmjs.com/package/@tsparticles/engine)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/engine)](https://www.npmjs.com/package/@tsparticles/engine) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) is a lightweight TypeScript library for creating particles. Dependency free (\*), browser ready and compatible with React.js, Vue.js (2.x and 3.x), Angular, Svelte, jQuery, Preact, Inferno, Riot.js, Solid.js, and Web Components.

**This is the core engine package that all other features depend on.**

## Quick checklist

1. Install `@tsparticles/engine`
2. Create an explicit engine instance in your code
3. Load additional plugins/shapes/updaters as needed
4. Use `engine.load()` to apply particle configurations

## How to use it

### Installation

```shell
npm install @tsparticles/engine
```

or

```shell
yarn add @tsparticles/engine
```

or

```shell
pnpm install @tsparticles/engine
```

### Basic Usage

```javascript
import { createBrowserEngine } from "@tsparticles/engine";

const engine = createBrowserEngine();

await engine.load({
  id: "tsparticles",
  options: {
    particles: {
      number: {
        value: 80,
      },
      move: {
        enable: true,
        speed: 2,
      },
    },
  },
});
```

### Migration note (singleton -> explicit engine)

| Scenario                  | Before                          | After (recommended)                    |
| ------------------------- | ------------------------------- | -------------------------------------- |
| Bootstrap browser runtime | `tsParticles` singleton         | `const engine = createBrowserEngine()` |
| Load feature bundles      | `await loadSlim(tsParticles)`   | `await loadSlim(engine)`               |
| Load container options    | `await tsParticles.load({...})` | `await engine.load({...})`             |

## Features

- **Lightweight**: Core engine without unnecessary dependencies
- **Modular**: Load only the features you need (plugins, shapes, updaters)
- **Framework agnostic**: Works with vanilla JS, React, Vue, Angular, Svelte, and more
- **Browser ready**: CDN bundles available for immediate use
- **Highly customizable**: Rich configuration options for particle behavior

## Loading Additional Features

To extend the engine with more capabilities, load additional packages:

```javascript
import { createBrowserEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // or other bundles

const engine = createBrowserEngine();

await loadSlim(engine); // Load preset features

await engine.load({
  id: "tsparticles",
  options: {
    // Your configuration here
  },
});
```

## Common pitfalls

- Loading plugins after calling `engine.load(...)` may not work as expected
- Ensure all required peer packages are loaded before using their features
- Some shapes or updaters need their specific packages to be loaded

## Related docs

- Main documentation: <https://particles.js.org/docs/>
- Main repository: <https://github.com/tsparticles/tsparticles>
- Available bundles: <https://github.com/tsparticles/tsparticles#bundles>
- All options: <https://particles.js.org/docs/interfaces/tsParticles_Engine.Options_Interfaces_IOptions.IOptions.html>
