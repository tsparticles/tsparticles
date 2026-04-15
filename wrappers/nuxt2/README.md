[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/nuxt2

Nuxt 2 module for [@tsparticles/vue2](https://www.npmjs.com/package/@tsparticles/vue2) with client-side registration only.

This package does not enforce `slim`/`full` presets. The app controls what to load in its own `registerParticles` function.

## Installation

```bash
pnpm add @tsparticles/nuxt2 @tsparticles/vue2 @tsparticles/engine
```

## Usage

Add the module in `nuxt.config.js`:

```js
export default {
  modules: ["@tsparticles/nuxt2"],
};
```

Create `utils/particlesInit.ts`:

```ts
import type { Engine } from "@tsparticles/engine";

export async function registerParticles(engine: Engine): Promise<void> {
  const { loadSlim } = await import("@tsparticles/slim");

  await loadSlim(engine);
}
```

The module loads `~/utils/particlesInit` by default. You can customize it:

```js
export default {
  modules: ["@tsparticles/nuxt2"],
  tsparticles: {
    initPath: "~/particles/customInit",
  },
};
```

## Notes

- The module registers `@tsparticles/vue2` only on the client.
- Required export in the init file: `registerParticles(engine)`.
- Keep `registerParticles` focused on your app needs (load only desired plugins/bundles).
