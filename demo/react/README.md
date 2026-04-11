# React Demo (Vite)

This demo shows `@tsparticles/react` with the provider-first initialization flow.

## Scripts

```bash
pnpm start
pnpm run lint
pnpm run build
pnpm run preview
```

## Architecture

- `src/main.jsx` wraps the app in `ParticlesProvider`.
- `src/particlesInit.js` exports the async callback passed to `ParticlesProvider`.
- `src/App.jsx` renders `Particles` instances after provider init completes.

The provider executes the init callback once for the app lifecycle.
