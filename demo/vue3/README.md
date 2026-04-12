# Vue 3 tsParticles Demo

Demo app for `@tsparticles/vue3`.

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

## Lint

```bash
pnpm run lint
```

## How init works

The plugin is registered once in `src/main.ts`:

- `app.use(Particles, { init: registerParticles })`
- `registerParticles` is defined in `src/particlesInit.ts`

This keeps `@tsparticles/vue3` minimal and lets app developers choose what to load.
