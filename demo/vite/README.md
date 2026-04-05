# Vite Demo

Vite-based demo application for rapid local development and hot module reloading of tsParticles.

## Quick checklist

1. Install dependencies from the repository root
2. Build workspace packages
3. Start the dev server in this folder

## Usage

From the repository root:

```bash
pnpm i
pnpm run build
cd demo/vite
pnpm dev
```

Then open the local URL shown by Vite's dev server (usually http://localhost:5173).

## Available scripts

- `pnpm dev` — Start Vite dev server with hot reload
- `pnpm build` — Compile TypeScript and build for production
- `pnpm preview` — Preview production build locally

## Common pitfalls

- Starting the dev server before building workspace packages may load outdated bundles
- Hot reload requires proper module boundaries; changes to workspace packages need a full rebuild
- Browser cache can interfere with bundle updates; use hard refresh or clear cache

## Related docs

- Main docs: <https://particles.js.org/docs/>
- Repository README: <https://github.com/tsparticles/tsparticles/blob/main/README.md>

