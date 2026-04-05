# Electron Demo

Desktop demo application using Electron to showcase tsParticles capabilities.

## Quick checklist

1. Install dependencies from the repository root
2. Build workspace packages
3. Run the Electron app from this folder

## Usage

From the repository root:

```bash
pnpm i
pnpm run build
cd demo/electron
pnpm start
```

## Build process

```bash
cd demo/electron
pnpm run build:client
```

This builds the client bundle using webpack in production mode.

## Common pitfalls

- Running without building packages first may load outdated or missing modules
- Ensure all workspace dependencies are properly linked before starting
- Build artifacts in this folder should not be committed to version control

## Related docs

- Main docs: <https://particles.js.org/docs/>
- Repository README: <https://github.com/tsparticles/tsparticles/blob/main/README.md>

