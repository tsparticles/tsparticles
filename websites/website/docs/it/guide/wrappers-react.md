# Wrapper: @tsparticles/react

Official React wrapper for `tsParticles`.

## Install

```bash
pnpm add @tsparticles/react @tsparticles/engine @tsparticles/slim
```

## Quick setup flow

1. Install wrapper + engine + loader package.
2. Place `ParticlesProvider` at your app root (e.g., `main.tsx` or `layout.tsx`) — it must be rendered only once for the entire app lifecycle.
3. Initialize once with `ParticlesProvider` and `loadSlim`.
4. Render `Particles` component with typed options.

## Monorepo references

- Package folder: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react>
- Demo app: <https://github.com/tsparticles/tsparticles/tree/main/demo/react>

## Readme

- Wrapper README: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react#readme>

## Related docs

- [`/guide/wrappers`](/guide/wrappers)
- [`/guide/frameworks`](/guide/frameworks)
