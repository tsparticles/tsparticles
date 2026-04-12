[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/nuxt4

Nuxt 4 module for [@tsparticles/vue3](https://www.npmjs.com/package/@tsparticles/vue3) with client-side registration only.

This package does not enforce `slim`/`full` presets. The app controls what to load in its own `registerParticles` function.

## Installation

```bash
pnpm add @tsparticles/nuxt4 @tsparticles/vue3 @tsparticles/engine
```

## Usage

Add the module in `nuxt.config.ts`:

```ts
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@tsparticles/nuxt4"],
});
```

Create `utils/particlesInit.ts`:

```ts
import type { Engine } from "@tsparticles/engine";

export async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

  await loadSlim(engine);
}
```

The module loads `~/utils/particlesInit` by default. You can customize it:

```ts
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@tsparticles/nuxt4"],
  tsparticles: {
    initPath: "~/particles/customInit",
  },
});
```

## Notes

- The module registers `@tsparticles/vue3` only on the client.
- Required export in the init file: `registerParticles(engine)`.
- Keep `registerParticles` focused on your app needs (load only desired plugins/bundles).
