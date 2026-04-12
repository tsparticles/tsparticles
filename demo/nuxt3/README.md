# Nuxt tsParticles Demo

This demo uses the `@tsparticles/nuxt3` module.

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm run dev
```

## Build

```bash
pnpm run build
```

## How init works

The module reads `~/utils/particlesInit` by default.

- File used in this demo: `utils/particlesInit.ts`
- Export required: `registerParticles(engine)`

The init function is where app developers decide which tsParticles packages to load.

## Optional custom path

You can customize the init file path in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@tsparticles/nuxt3'],
  tsparticles: {
    initPath: '~/particles/customInit',
  },
})
```
