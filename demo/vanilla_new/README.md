# tsParticles Demo Website

Main production demo website showcasing tsParticles effects, samples, and interactive generator.

## Quick checklist

1. Install dependencies from the repository root
2. Build workspace packages
3. Build CSS and JavaScript assets in this folder

## Usage

From the repository root:

```bash
pnpm i
pnpm run build
cd demo/vanilla_new
pnpm build
```

## Available scripts

- `pnpm clear:cache` — Remove build cache
- `pnpm build:js` — Minify JavaScript assets
- `pnpm build:css` — Compile and minify SCSS
- `pnpm build` — Full production build (cache + CSS + JS)
- `pnpm build:ci` — CI-optimized production build
- `pnpm deploy` — Build and deploy to production

## Build process

The demo website uses:
- **SCSS** for stylesheet compilation (with Sass)
- **JavaScript** minification for 404 page
- **SWC** for transpilation support
- Workspace dependency bundling via build scripts

## Common pitfalls

- Cache should be cleared before CI builds
- Assets are minified for production; ensure dev versions work first before minifying
- Browser assets must be copied after building JavaScript

## Related docs

- Main docs: <https://particles.js.org/docs/>
- Homepage: <https://particles.js.org>
- Repository README: <https://github.com/tsparticles/tsparticles/blob/main/README.md>

