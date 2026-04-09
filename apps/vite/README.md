# Presets Vite Demo

Vite-based demo application for previewing and testing all presets and palettes during development.

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

## Included presets and palettes

This demo loads all available presets and palettes for testing:

**Presets:**
- Ambient, Big Circles, Bubbles, Confetti (+ Cannon, Explosions, Falling, Parade)
- Fire, Firefly, Fireworks, Fountain, Hyperspace, Links
- Sea Anemone, Snow, Squares, Stars, Triangles

**Palettes:**
- 60+ color palettes available in `@tsparticles/palette-*` packages

## Common pitfalls

- Running the dev server without building workspace packages first loads outdated presets
- Hot reload works only for source changes; preset package updates require a full rebuild
- Browser cache can retain old preset configurations; use hard refresh

## Related docs

- Presets root README: <https://github.com/tsparticles/presets/blob/main/README.md>
- Main docs: <https://particles.js.org/docs/>
- Samples: <https://particles.js.org/samples/presets/>

