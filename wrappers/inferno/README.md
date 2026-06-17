[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/inferno

[![npm](https://img.shields.io/npm/v/@tsparticles/inferno)](https://www.npmjs.com/package/@tsparticles/inferno)
[![npm](https://img.shields.io/npm/dm/@tsparticles/inferno)](https://www.npmjs.com/package/@tsparticles/inferno)

Official Inferno component wrapper for [tsParticles](https://github.com/matteobruni/tsparticles).

## Installation

```bash
pnpm add @tsparticles/inferno @tsparticles/engine
```

or

```bash
npm install @tsparticles/inferno @tsparticles/engine
```

or

```bash
yarn add @tsparticles/inferno @tsparticles/engine
```

## Usage

Initialize tsParticles once in your app entry, then render one or more `<Particles />` components.

```tsx
import { Component } from "inferno";
import Particles, { initParticlesEngine } from "@tsparticles/inferno";
import type { Container, Engine } from "@tsparticles/engine";

void initParticlesEngine(async (engine: Engine) => {
  const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

  await loadSlim(engine);
});

export default class App extends Component {
  particlesLoaded(container?: Container): void {
    console.log(container);
  }

  render() {
    return (
      <Particles
        id="tsparticles"
        options={{
          fullScreen: {
            zIndex: -1,
          },
          particles: {
            number: { value: 80 },
            links: { enable: true },
            move: { enable: true },
          },
        }}
        loaded={this.particlesLoaded}
      />
    );
  }
}
```

## How init works

- `initParticlesEngine` should be called once per app lifecycle.
- All `<Particles />` instances wait for init completion before loading.
- You can choose what to load inside init (`@tsparticles/slim`, `tsparticles`, or custom plugins).

## Props

| Prop            | Type                                                                                                                                     | Definition                                                                                                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id              | string                                                                                                                                   | The id of the element.                                                                                                                                             |
| width           | string                                                                                                                                   | The width of the canvas.                                                                                                                                           |
| height          | string                                                                                                                                   | The height of the canvas.                                                                                                                                          |
| options         | object                                                                                                                                   | The options of the particles instance.                                                                                                                             |
| url             | string                                                                                                                                   | The remote options url, called using an AJAX request                                                                                                               |
| style           | object                                                                                                                                   | The style of the canvas element.                                                                                                                                   |
| className       | string                                                                                                                                   | The class name of the canvas wrapper.                                                                                                                              |
| canvasClassName | string                                                                                                                                   | The class name of the canvas.                                                                                                                                      |
| container       | object                                                                                                                                   | A ref-like object (`{ current?: Container }`) that receives the particles [container](https://particles.js.org/docs/modules/Core_Container.html) instance on load. |
| loaded          | function                                                                                                                                 | Callback invoked when particles are correctly loaded in canvas, receives `(container?: Container)`.                                                                |
| particlesLoaded | function                                                                                                                                 | Alias for `loaded`, receives `(container?: Container)`.                                                                                                            |
| theme           | string                                                                                                                                   | Theme name to apply. Requires `@tsparticles/plugin-themes` to be registered. Without the plugin, setting this prop is a safe no-op.                                |

### Reactivity

- Changing `id` destroys the current container and creates a new one.
- Changing `options` or `url` destroys the current container and reloads particles.
- Changing `theme` applies the theme via `loadTheme` without a full reload.
- The `loaded` and `particlesLoaded` callbacks fire after each successful reload.

> **Note**: Theme support requires the optional `@tsparticles/plugin-themes` package. Without it, `theme` changes are silently ignored and do not error.

### Cleanup

When the component unmounts, the container is destroyed automatically. No orphan animations remain.

Find your parameters configuration [here](https://particles.js.org).

## Demos

The demo website is [here](https://particles.js.org).

There is also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage).
