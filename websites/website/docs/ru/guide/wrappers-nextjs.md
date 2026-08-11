# Wrapper: @tsparticles/nextjs

Official Next.js wrapper built on `@tsparticles/react`.

## Install

```bash
pnpm add @tsparticles/nextjs @tsparticles/engine @tsparticles/slim
```

## Quick setup flow

1. Install Next.js wrapper and dependencies.
2. Keep rendering client-side only for particle canvas.
3. Place `NextParticlesProvider` at your app root (`layout.tsx` or `_app.tsx`) — it must be rendered only once.
4. Initialize engine once and render wrapper component.

## Monorepo references

- Package folder: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs>
- Demo apps: <https://github.com/tsparticles/tsparticles/tree/main/demo/nextjs>, <https://github.com/tsparticles/tsparticles/tree/main/demo/nextjs-legacy>

## Readme

- Wrapper README: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs#readme>

## Related docs

- [`/guide/wrappers`](/guide/wrappers)
- [`/guide/frameworks`](/guide/frameworks)
