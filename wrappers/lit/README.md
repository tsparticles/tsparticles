[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/lit

[![npm](https://img.shields.io/npm/v/@tsparticles/lit)](https://www.npmjs.com/package/@tsparticles/lit) [![npm](https://img.shields.io/npm/dm/@tsparticles/lit)](https://www.npmjs.com/package/@tsparticles/lit) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/matteobruni/tsparticles) Lit web component.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

## Installation

```shell
npm install @tsparticles/lit @tsparticles/engine
```

or

```shell
yarn add @tsparticles/lit @tsparticles/engine
```

## Usage

### Initialization

Before using the `<lit-particles>` component, you must initialize the engine once:

```ts
import { initParticlesEngine } from "@tsparticles/lit";
import { loadFull } from "tsparticles"; // or loadSlim / custom bundle

void initParticlesEngine((engine) => {
  loadFull(engine);
});
```

### Basic usage

```html
<lit-particles
  id="tsparticles"
  options='{ "background": { "color": "#000" }, "particles": { "number": { "value": 100 } } }'
></lit-particles>
```

### Properties

| Property    | Type     | Default          | Description                                       |
|-------------|----------|------------------|---------------------------------------------------|
| `id`        | `string` | `"tsparticles"`  | The DOM id for the particle container             |
| `options`   | `object` | —                | The tsParticles options configuration             |
| `url`       | `string` | —                | A URL to a JSON configuration file                |
| `theme`     | `string` | —                | The theme name (requires `@tsparticles/plugin-themes`) |

### Events

| Event              | Detail      | Description                                       |
|--------------------|-------------|---------------------------------------------------|
| `particlesLoaded`  | `Container` | Fired after the container is fully loaded         |

### Reactivity

- Changing `id` destroys the current container and creates a new one with the new id.
- Changing `options` or `url` destroys the current container and reloads particles with the new configuration.
- Changing `theme` applies the new theme via `loadTheme` (safe no-op if the `@tsparticles/plugin-themes` plugin is not loaded).

### Theme support

The `theme` property requires the `@tsparticles/plugin-themes` package to be installed and loaded during engine initialization. If the plugin is not loaded, setting `theme` is a safe no-op (no crash, no error).

### Cleanup

The component automatically destroys the particles container when it is removed from the DOM.

## Demos

The demo website is [here](https://particles.js.org)

<https://particles.js.org>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
