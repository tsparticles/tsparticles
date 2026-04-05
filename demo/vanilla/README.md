# Vanilla Demo

Minimal vanilla demo for local development and quick visual testing.

## Quick checklist

1. Install dependencies from the repository root
2. Build workspace packages
3. Start the demo server in this folder

## Usage

From the repository root:

```bash
pnpm i
pnpm run build
cd demo/vanilla
pnpm start
```

Then open the local URL shown by the dev server.

## Common pitfalls

- Starting the demo before building packages may load stale or missing bundles
- Running commands from a different folder can pick the wrong workspace context
- Mixing old browser cache with new bundle output can show outdated behavior

## Related docs

- Main docs: <https://particles.js.org/docs/>
- Repository README: <https://github.com/tsparticles/tsparticles/blob/main/README.md>

