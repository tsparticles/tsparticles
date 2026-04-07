# Palettes Vite Demo

Vite-based demo application for previewing and testing palettes during development.

## Quick checklist

1. Install dependencies in the repository root
2. Build workspace packages
3. Start the dev server in this folder

## Usage

From the repository root:

```bash
pnpm i
pnpm run build
cd apps/vite
pnpm dev
```

Then open the local URL shown by Vite's dev server (usually http://localhost:5173).

## Available scripts

- `pnpm dev` — Start Vite dev server with hot reload
- `pnpm build` — Compile TypeScript and build for production
- `pnpm preview` — Preview production build locally

## Included palette

This demo loads `@tsparticles/palette-confetti` as a minimal palette-only example.

## Common pitfalls

- Running the dev server without building workspace packages first can load outdated palette bundles
- Hot reload works only for source changes; package updates may require a full rebuild
- Browser cache can retain old palette configurations; use hard refresh

## Related docs

- Palettes root README: <https://github.com/tsparticles/palettes/blob/main/README.md>
- Main docs: <https://particles.js.org/docs/>
- Samples: <https://particles.js.org/samples/palettes/>

