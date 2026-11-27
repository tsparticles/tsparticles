[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/stencil

[![npm](https://img.shields.io/npm/v/@tsparticles/stencil)](https://www.npmjs.com/package/@tsparticles/stencil) [![npm](https://img.shields.io/npm/dm/@tsparticles/stencil)](https://www.npmjs.com/package/@tsparticles/stencil) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/tsparticles/tsparticles) Stencil wrapper.

## Installation

```shell
npm install @tsparticles/stencil @tsparticles/engine @tsparticles/slim
```

or

```shell
yarn add @tsparticles/stencil @tsparticles/engine @tsparticles/slim
```

This example uses `@tsparticles/slim`; substitute another loader package if needed.

## Usage

Register Stencil custom elements once:

```ts
import { defineCustomElements } from "@tsparticles/stencil/loader";

defineCustomElements();
```

Use the component in your app and initialize features with the `init` callback:

```tsx
import { h } from "@stencil/core";
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();

export const Background = () => (
  <stencil-particles
    engine={engine}
    container-id="tsparticles"
    init={async engine => {
      await loadSlim(engine);
    }}
    options={{
      fullScreen: { enable: false },
      particles: {
        move: { enable: true },
        number: { value: 80 },
      },
    }}
  ></stencil-particles>
);
```

For DOM usage, pass the initialized `engine` as a JavaScript property before
connecting the element. Engine objects cannot be serialized as HTML attributes:

```js
const particles = document.createElement("stencil-particles");
particles.engine = engine;
particles.url = "/assets/default.json";
document.body.append(particles);
```

## Props

- `engine` (required): engine instance used to create the container; this is a property, not an HTML attribute
- `container-id`: container id used by `engine.load`
- `options`: inline particles options (`ISourceOptions`)
- `url`: path/url to a JSON options file
- `init`: async callback used to register plugins on the same engine instance used by the component
- `theme`: theme name to apply (requires `@tsparticles/plugin-themes` to be loaded in `init`; without the plugin, the prop is a safe no-op)

## Events

- `particlesLoaded`: emitted after `engine.load()` completes; its detail may be `undefined`

### Reactive behavior

The component reloads particles when `container-id`, `options`, or `url` props change. Changes to `theme` apply the theme via `loadTheme` without a full reload.

### Cleanup

When the component is removed from the DOM, the particles container is automatically destroyed, stopping all animations and freeing resources.

## Monorepo references

- Package folder: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/stencil>
- Demo app: <https://github.com/tsparticles/tsparticles/tree/main/demo/stencil>
