[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/stencil

[![npm](https://img.shields.io/npm/v/@tsparticles/stencil)](https://www.npmjs.com/package/@tsparticles/stencil) [![npm](https://img.shields.io/npm/dm/@tsparticles/stencil)](https://www.npmjs.com/package/@tsparticles/stencil) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/tsparticles/tsparticles) Stencil wrapper.

## Installation

```shell
npm install @tsparticles/stencil @tsparticles/engine
```

or

```shell
yarn add @tsparticles/stencil @tsparticles/engine
```

If you need prebuilt features, install one loader package too, for example `@tsparticles/slim`.

## Usage

Register Stencil custom elements once:

```ts
import { defineCustomElements } from "@tsparticles/stencil/loader";

defineCustomElements();
```

Use the component in your app and initialize features with the `init` callback:

```tsx
import { h } from "@stencil/core";
import { loadSlim } from "@tsparticles/slim";

export const Background = () => (
  <stencil-particles
    container-id="tsparticles"
    init={async engine => {
      await loadSlim(engine);
    }}
    options={{
      fullScreen: { enable: false },
      particles: {
        move: { enable: true },
        number: { value: 80 }
      }
    }}
  ></stencil-particles>
);
```

You can also load options from URL:

```html
<stencil-particles container-id="tsparticles" url="/assets/default.json"></stencil-particles>
```

## Props

- `container-id`: container id used by `tsParticles.load`
- `options`: inline particles options (`ISourceOptions`)
- `url`: path/url to a JSON options file
- `init`: async callback used to register plugins on the same engine instance used by the component

## Monorepo references

- Package folder: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/stencil>
- Demo app: <https://github.com/tsparticles/tsparticles/tree/main/demo/stencil>
