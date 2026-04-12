# Vue 3 workspace

This folder contains the Vue 3 related packages in the monorepo:

- `wrappers/vue3` -> `@tsparticles/vue3`
- `wrappers/nuxt3` -> `@tsparticles/nuxt3`
- `wrappers/nuxt4` -> `@tsparticles/nuxt4`
- `demo/vue3` -> Vue 3 Vite demo
- `demo/nuxt3` -> Nuxt 3 demo
- `demo/nuxt4` -> Nuxt 4 demo

## Build from repo root

```bash
pnpm --filter @tsparticles/vue3 build
pnpm --filter @tsparticles/nuxt3 build
pnpm --filter @tsparticles/nuxt4 build
pnpm --filter vue3-demo build
pnpm --filter nuxt3-particles-demo build
pnpm --filter nuxt4-particles-demo build
```

## Package docs

- Vue wrapper docs: `wrappers/vue3/README.md`
- Nuxt module docs: `wrappers/nuxt3/README.md` and `wrappers/nuxt4/README.md`
