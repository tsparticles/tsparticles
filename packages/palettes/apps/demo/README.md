# Palettes Demo App

Local demo app for previewing palettes during development.

## Quick checklist

1. Install dependencies in the repository root
2. Build workspace packages
3. Start this demo app

## Usage

From the repository root:

```bash
pnpm i
pnpm run build
cd apps/demo
pnpm start
```

## Common pitfalls

- Running the demo without building first can load outdated package artifacts
- Starting from a different working directory may use the wrong workspace context
- Browser cache can keep stale bundles after package updates

## Related docs

- Palettes root README: <https://github.com/tsparticles/palettes/blob/main/README.md>
- Main docs: <https://particles.js.org/docs/>

