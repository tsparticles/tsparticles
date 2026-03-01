Repository structure and key locations

## Top-level layout

- `presets/` - the main content: each preset has its own folder with source and package metadata
- `apps/` - demo applications showcasing presets (`vite`, `demo`)
- `package.json` - root workspace scripts and dependencies
- `pnpm-workspace.yaml`, `pnpm-lock.yaml` - workspace configuration
- `.github/workflows/` - CI pipelines

Notable directories and files

- `presets/hyperspace/` - has its own `package.json`, `src/options.ts`, `webpack.config.js`, and eslint config
- `presets/stars/` - another preset (see `presets/stars/*`)
- `apps/vite/` - modern demo app (entry: `apps/vite/src/main.ts`, `index.html`)
- `apps/demo/` - server-side demo that uses Pug templates (`apps/demo/views/*.pug`) and `app.js`

File naming and conventions

- TypeScript for core code under `src/*.ts` and `presets/*/src/*.ts`
- Build configs exist per package (webpack, Vite), expect `package.dist.json` in preset packaging

How modules are organized

- Each preset exposes an entry (`src/index.ts`) and options (`src/options.ts`) used by demo apps
- Demos import presets directly from the workspace packages or from built bundles in `apps/vite/dist`

Developer workflow

- Use pnpm workspace to install and run scripts from root
- Build demos separately (`apps/vite` uses Vite) and presets may have packaging scripts

Where to explore next

- `presets/*/src` to inspect preset implementations
- `apps/vite/src/main.ts` to see how presets are consumed in-browser
