# Templates & `create-tsparticles` Plan

> **Note about language**: This document was discussed in Italian because the author is Italian, but **all implementation output must be in English**: English code, English user-facing text, English CLI messages, English docs, English comments. Every UI string, prompt, and console message that a user sees must be English. The templates themselves (HTML, text content, example data) should use English as the default language.

## Context

tsParticles has 23 framework wrappers but only 2 CRA templates (React JS + React TS), which are now obsolete. There is no quick-start system for users to bootstrap a tsParticles project (`npm create tsparticles`). The demo apps in `demo/` work but are internal to the monorepo — not published as templates.

## Goal

Create a template ecosystem for tsParticles with two dimensions:

| Dimension    | Description                  | Examples                                     |
|--------------|------------------------------|----------------------------------------------|
| **Scaffold** | Minimal framework skeleton   | vanilla, react, vue3, angular, svelte, solid |
| **Use-case** | Complete example application | login, portfolio, landing, tictactoe         |

## Status dashboard

| Step  | Status |
|-------|--------|
| 1     | ✅ Done |
| 1a    | ✅ Done |
| 1b-1f | ✅ Done |
| 2a-2g | ✅ Done |
| 3a-3c | ✅ Done |
| 4a    | ✅ Done |
| 4b    | ✅ Done |
| 5     | ✅ Done |
| 6     | ✅ Done |

## Steps summary

This table is the fastest overview of scope, order, and implementation risk.

| Step | Scope                           | Output                                 | Depends on | Parallelizable | Risk   | Status |
|------|---------------------------------|----------------------------------------|------------|----------------|--------|--------|
| 1    | Scaffold package infrastructure | `templates/scaffold/` root package     | None       | No             | Medium | ✅ Done |
| 1a   | Vanilla scaffold                | `template/vanilla/`                    | 1          | Yes            | Medium | ✅ Done |
| 1b   | React scaffold                  | `template/react/`                      | 1a         | Yes            | Medium | ✅ Done |
| 1c   | Vue 3 scaffold                  | `template/vue3/`                       | 1a         | Yes            | Medium | ✅ Done |
| 1d   | Angular scaffold                | `template/angular/`                    | 1          | Yes            | High   | ✅ Done |
| 1e   | Svelte scaffold                 | `template/svelte/`                     | 1          | Yes            | High   | ✅ Done |
| 1f   | Solid scaffold                  | `template/solid/`                      | 1          | Yes            | Medium | ✅ Done |
| 2a   | Login template                  | `templates/login/`                     | 1a         | Yes            | Medium | ✅ Done |
| 2b   | Portfolio template              | `templates/portfolio/`                 | 1a         | Yes            | Medium | ✅ Done |
| 2c   | Landing template                | `templates/landing/`                   | 1a         | Yes            | Medium | ✅ Done |
| 2d   | Tic-tac-toe template            | `templates/tictactoe/`                 | 1a         | Yes            | Medium | ✅ Done |
| 2e   | Confetti template               | `templates/confetti/`                  | 1a         | Yes            | Medium | ✅ Done |
| 2f   | Ribbons template                | `templates/ribbons/`                   | 1a         | Yes            | Medium | ✅ Done |
| 2g   | Particles template              | `templates/particles/`                 | 1a         | Yes            | Low    | ✅ Done |
| 3a   | CLI app architecture            | types + resolver                       | 1, 2       | Partially      | High   | ✅ Done |
| 3b   | CLI scaffold logic              | prompts + copy/merge flow              | 3a         | No             | High   | ✅ Done |
| 3c   | CLI registration                | integrate `app` into existing CLI      | 3a, 3b     | No             | Medium | ✅ Done |
| 4a   | Wrapper package alignment       | metadata/files for `create-*` packages | None       | Yes            | Low    | ✅ Done |
| 4b   | Wrapper delegation              | wrappers call `tsparticles-create app` | 3, 4a      | No             | Medium | ✅ Done |
| 5    | CRA deprecation                 | mark old templates deprecated          | None       | Yes            | Low    | ✅ Done |
| 6    | Documentation                   | website docs and usage pages           | None       | Yes            | Low    | ✅ Done |

### Recommended execution order

1. Finish Step 1 and Step 1a first
2. Complete framework scaffolds in Step 1b-1f
3. Complete example/bundle templates in Step 2a-2g
4. Implement the CLI flow in Step 3a-3c
5. Wire wrapper packages in Step 4a-4b
6. Finish deprecations and docs in Steps 5-6

## Critical implementation decisions

These points must be treated as fixed decisions before coding starts. They are the areas most likely to create friction, rework, or broken development flows if left ambiguous.

### 1. Official `template.json` schema

Use the same schema already present in existing template packages in this repo.

```json
{
  "package": {
    "dependencies": {
      "@tsparticles/engine": "^4.1.3",
      "@tsparticles/slim": "^4.1.3",
      "@tsparticles/configs": "^4.1.3"
    },
    "devDependencies": {
      "typescript": "^6.0.3",
      "vite": "^8.0.14"
    }
  }
}
```

Do not introduce a second root-level schema such as `{ "dependencies": ..., "devDependencies": ... }` for new templates. That would create unnecessary parser branching and make existing/new templates inconsistent.

### 2. Template resolution must support both development and published usage

The CLI must work in two environments:

- **Monorepo development**: templates exist under `templates/<name>/`
- **Published/installed usage**: templates are resolved from installed packages like `@tsparticles/template-<name>`

The resolver should support both. Do not assume `node_modules/@tsparticles/template-<name>/` is the only valid source, otherwise local development and testing of the CLI become more fragile than necessary.

### 3. Command registration must follow the real repo structure

The existing create command registrar in this repo is:

- `cli/commands/create/src/create.ts`

Do not document or implement changes against `cli/commands/create/src/index.ts` unless such a file is intentionally created as part of a separate refactor.

### 3b. There must remain exactly one user-facing create CLI

The repo already has a public CLI package:

- `@tsparticles/cli-create`
- binary: `tsparticles-create`

That package should remain the only user-facing create CLI.

If `@tsparticles/cli-command-create-app` is introduced, it must be treated as an internal command module only, consistent with the existing pattern:

- `@tsparticles/cli-command-create-bundle`
- `@tsparticles/cli-command-create-effect`
- `@tsparticles/cli-command-create-plugin`
- etc.

In other words:

- `@tsparticles/cli-create` = published CLI wrapper users install and run
- `@tsparticles/cli-command-create` = command aggregator
- `@tsparticles/cli-command-create-app` = internal implementation of the new `app` subcommand

This is not a second CLI unless it is exposed or documented as one.

**Recommendation:** keep the single public CLI package as-is and add `app` as a new subcommand under the existing create command tree. Do not create a second published binary package for app scaffolding.

### 4. Wrapper packages must not shell-concatenate forwarded args

The `create-*` wrapper packages must not build commands like:

```js
execSync(`npx tsparticles-create app ${args} --template ${template}`)
```

That pattern is fragile for quoting and argument forwarding. Use `spawnSync` or `execFileSync` with an argument array instead.

### 5. Validation must distinguish workspace checks from generated-project checks

There are two separate verification modes in this plan:

- **Workspace verification**: `pnpm install`, `pnpm nx ...`, package build, repo integration
- **Generated project verification**: run the package manager inside a scaffolded temp app and confirm the app starts correctly

Both are required. Mixing them leads to confusing acceptance criteria and false negatives.

### 6. Version alignment is a hard requirement

Version consistency must be explicit in both implementation and maintenance.

This initiative introduces multiple places where versions can drift:

- template package `package.json`
- `template.json` dependency ranges
- generated scaffold `package.json`
- wrapper packages under `cli/packages/create-*`
- docs snippets and examples

If these are maintained manually without anti-drift rules, generated templates will inevitably fall behind after normal repo version bumps.

**Rule:** use current workspace package manifests as the source of truth wherever practical, and treat version drift detection as part of the feature, not an afterthought.

## Critical risks to keep visible

| Risk                                                       | Why it matters                                                    | Required mitigation                                                                                                         |
|------------------------------------------------------------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Ambiguous `template.json` shape                            | Different agents may implement incompatible parsers/merging logic | Standardize on `template.json -> package -> dependencies/devDependencies`                                                   |
| Resolver tied only to `node_modules`                       | Local CLI development becomes awkward and brittle                 | Support both workspace path resolution and installed package resolution                                                     |
| Wrong CLI file references                                  | Contributors patch the wrong file or think code is missing        | Always reference `cli/commands/create/src/create.ts` for command registration                                               |
| Confusion between public CLI and internal command packages | Contributors may think a second create CLI is being introduced    | Explicitly document that `@tsparticles/cli-create` remains the only public CLI package                                      |
| Shell-based wrapper delegation                             | Arguments with spaces or special chars can break                  | Use argument arrays with `spawnSync`/`execFileSync`                                                                         |
| Hard-coded versions drifting over time                     | The document becomes stale quickly                                | Treat listed versions as current examples, but derive implementation values from workspace package manifests where possible |
| Template/version drift after future bumps                  | Generated projects may lag behind current releases                | Add a clear version source of truth and checks that fail when templates fall behind                                         |

## Version alignment policy

This section is mandatory guidance for implementation and maintenance.

### Source of truth

Use workspace package manifests as the real source of truth for versions, not this document.

Relevant sources include:

- `engine/package.json`
- bundle manifests under `bundles/`
- wrapper manifests under `wrappers/`
- CLI manifests under `cli/commands/` and `cli/packages/`

### Monorepo authoring rules

Inside the repo source:

- prefer `workspace:^` or `workspace:*` for workspace-owned dependencies where appropriate
- avoid copying fixed semver strings into many files unless there is no better option
- keep all new template package versions aligned with the workspace release version
- keep `create-*` wrapper package versions aligned with the workspace release version once they stop being placeholders

### Publish and scaffold rules

For published templates and generated projects:

- `prebuild.js` must convert workspace ranges into publishable semver ranges
- scaffold generation must inject current dependency versions, not stale copied values
- template dependency merging must not depend on manually maintained duplicated version strings

### Anti-drift requirement

Where duplication cannot be avoided, add a validation or generation step that keeps values synchronized.

At minimum, implementation and release validation should verify:

- template package versions match the current workspace release line
- `template.json` does not reference stale tsParticles versions
- generated project `package.json` files receive current dependency ranges
- released `create-*` wrapper packages are aligned with the current release version
- docs do not mention obsolete versions, package names, or deprecated bootstrap flows

### Recommended anti-drift checks

- a validation script comparing template dependency ranges against current workspace package versions
- a CI check that fails on outdated tsParticles dependency ranges in templates
- a smoke test that inspects scaffolded `package.json` before install
- a release checklist that treats templates, wrappers, and docs as one versioned surface

## Template package convention

Every template under `templates/<name>/` is an npm package published as `@tsparticles/template-<name>`. Each follows this structure:

```
templates/<name>/
  package.json              # npm package metadata
  template.json             # Extra dependencies merged during scaffold
  scripts/
    prebuild.js             # Converts workspace:* to semver before publish
  template/                 # Scaffold source (not a standard npm layout — copied by CLI)
    gitignore               # Renamed to .gitignore on copy
    package.json            # {{projectName}} as name, with base deps
    index.html
    vite.config.ts
    tsconfig.json
    README.md
    src/
      main.ts / main.tsx    # Entry point
      style.css             # Base styles
```

### template.json

Defines extra dependencies merged into the scaffolded project's `package.json`:

```json
{
  "package": {
    "dependencies": {
      "@tsparticles/engine": "^4.1.3",
      "@tsparticles/slim": "^4.1.3",
      "@tsparticles/configs": "^4.1.3"
    },
    "devDependencies": {
      "typescript": "^6.0.3",
      "vite": "^8.0.14"
    }
  }
}
```

The CLI merges `template.json.package.dependencies` and `template.json.package.devDependencies` with the scaffolded `template/<framework>/package.json`. `template.json` values win on conflict.

This matches the existing template format already used in the repo today. Keep new templates aligned with that shape.

### prebuild.js

Converts `workspace:*` and `workspace:^` to real semver versions (e.g. `^4.1.3`) before npm publish. The existing CRA templates already have this pattern — copy it.

This script is part of the anti-drift strategy, not just packaging boilerplate.

### Package JSON requirements

```json
{
  "name": "@tsparticles/template-<name>",
  "version": "4.1.3",
  "private": false,
  "publishConfig": { "access": "public" },
  "scripts": {
    "prebuild": "node scripts/prebuild.js",
    "build": "pnpm run prebuild",
    "build:ci": "pnpm run prebuild"
  }
}
```

### Framework file additions

When a template includes a specific framework variant, additionally include:

- **react**: `vite-env.d.ts`, `src/App.tsx`, `src/App.css`, JSX source, `@vitejs/plugin-react`
- **vue3**: `env.d.ts`, `src/App.vue`, `src/main.ts` with createApp, `@vitejs/plugin-vue`
- **angular**: `angular.json`, `tsconfig.app.json`, `src/main.ts` with bootstrap + polyfills, `@tsparticles/angular`
- **svelte**: `src/App.svelte`, `src/main.ts` with mount, `@sveltejs/vite-plugin-svelte`
- **solid**: `src/App.tsx`, `src/index.tsx` with render, `vite-plugin-solid`

---

## Step-by-step implementation

Every step lists exactly what to create, what to read first, and how to verify. Steps are designed to be assignable to independent agents.

---

### Step 1 — Scaffold template: `templates/scaffold/` — package infrastructure

**Goal**: Create the `templates/scaffold/` npm package directory with package.json, template.json, and prebuild.js. This is the shell that will contain framework sub-templates in later sub-steps.

**Files to create:**
```
templates/scaffold/
  package.json              # @tsparticles/template-scaffold
  template.json             # Base deps
  scripts/
    prebuild.js             # workspace:* → semver conversion
```

**package.json:**
```json
{
  "name": "@tsparticles/template-scaffold",
  "version": "4.1.3",
  "private": false,
  "publishConfig": { "access": "public" },
  "scripts": {
    "prebuild": "node scripts/prebuild.js",
    "build": "pnpm run prebuild",
    "build:ci": "pnpm run prebuild"
  }
}
```

**template.json:**
```json
{
  "package": {
    "dependencies": {
      "@tsparticles/engine": "^4.1.3",
      "@tsparticles/slim": "^4.1.3",
      "@tsparticles/configs": "^4.1.3"
    },
    "devDependencies": {
      "typescript": "^6.0.3",
      "vite": "^8.0.14"
    }
  }
}
```

**prebuild.js**: Copy the pattern from `templates/react/scripts/prebuild.js`. It reads the current template versions from the monorepo and replaces `workspace:*` references with actual semver ranges.

This script is part of the anti-drift strategy, not just packaging boilerplate.

**Acceptance criteria:**
- `pnpm install` resolves `@tsparticles/template-scaffold` without errors
- `pnpm --filter @tsparticles/template-scaffold build` runs prebuild.js successfully
- No v3 references
- `template.json` uses the repo-standard `package.dependencies` / `package.devDependencies` shape
- workspace-owned dependencies are authored so they can stay aligned with future version bumps

**Reference files:**
- `templates/react/package.json` — Existing CRA template package.json
- `templates/react/scripts/prebuild.js` — prebuild pattern to copy
- `templates/react/template.json` — template.json structure

---

### Step 1a — Scaffold template: `template/vanilla/`

**Goal**: Create the vanilla framework sub-template under `templates/scaffold/template/vanilla/`. This is a minimal Vite + TypeScript app with tsParticles rendering.

**Dependencies**: Step 1 (package infrastructure must exist).

**Files to create:**
```
templates/scaffold/template/vanilla/
  gitignore
  package.json              # {{projectName}} as name
  index.html                # Vite entry HTML
  vite.config.ts            # Minimal Vite config
  tsconfig.json             # TypeScript config
  README.md
  src/
    main.ts                 # Entry: loadTsParticles, init with default config
    style.css               # Fullscreen canvas, centered content
```

**package.json** (what the user gets after scaffold — `{{projectName}}` placeholder):
```json
{
  "name": "{{projectName}}",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

**main.ts**: Initialize tsParticles with `loadSlim` and a basic configuration. Use `@tsparticles/configs` preset or inline config. Add a centered heading ("Hello, tsParticles!") above the canvas.

**Acceptance criteria:**
- Copy `template/vanilla/` to a temp directory
- `npm install && npm run dev` starts Vite dev server
- Browser shows particles + centered heading
- No v3 references

**Reference files:**
- `demo/vite/` — The reference vanilla implementation
- `demo/vite/src/main.ts` — How tsParticles is loaded in vanilla

---

### Step 1b — Scaffold template: `template/react/`

**Goal**: Create the React framework sub-template under `templates/scaffold/template/react/`.

**Dependencies**: Step 1a (vanilla template shows the expected structure).

**Files to create:**
```
templates/scaffold/template/react/
  gitignore
  package.json                    # {{projectName}} + react, react-dom, @tsparticles/react
  index.html
  vite.config.ts                  # @vitejs/plugin-react
  tsconfig.json
  README.md
  src/
    vite-env.d.ts
    main.tsx                      # ReactDOM.createRoot, render <App />
    App.tsx                       # <Particles> component + heading
    App.css                       # Styles
```

**package.json additions** (on top of base deps from template.json):
- `"react": "^19.2.5"`, `"react-dom": "^19.2.5"`, `"@tsparticles/react": "^4.1.3"`, `"@vitejs/plugin-react": "^6.0.1"`

**Acceptance criteria:**
- Copy `template/react/` to a temp directory
- `npm install && npm run dev` starts without errors
- Browser shows particles + centered heading rendered by React

**Reference files:**
- `demo/react/` — React demo structure
- `wrappers/react/` — @tsparticles/react component API

---

### Step 1c — Scaffold template: `template/vue3/`

**Goal**: Create the Vue 3 framework sub-template under `templates/scaffold/template/vue3/`.

**Dependencies**: Step 1a (vanilla template shows the expected structure).

**Files to create:**
```
templates/scaffold/template/vue3/
  gitignore
  package.json                    # {{projectName}} + vue, @tsparticles/vue3
  index.html
  vite.config.ts                  # @vitejs/plugin-vue
  tsconfig.json
  README.md
  src/
    env.d.ts
    main.ts                       # createApp(App).mount(#app)
    App.vue                       # <Particles> component + heading in SFC
```

**package.json additions** (on top of base deps from template.json):
- `"vue": "^3.5.32"`, `"@tsparticles/vue3": "^4.1.3"`, `"@vitejs/plugin-vue": "^6.0.5"`

**Acceptance criteria:**
- Copy `template/vue3/` to a temp directory
- `npm install && npm run dev` starts without errors
- Browser shows particles + centered heading rendered by Vue 3

**Reference files:**
- `demo/vue3/` — Vue 3 demo structure
- `wrappers/vue3/` — @tsparticles/vue3 component API

---

### Step 1d — Scaffold template: `template/angular/`

**Goal**: Create the Angular framework sub-template. Angular uses Angular CLI (not plain Vite), so this has a different structure.

**Dependencies**: Step 1 (package infrastructure). Independent of 1b, 1c, 1e, 1f.

**Files to create:**
```
templates/scaffold/template/angular/
  gitignore
  .angular/
  .browserslistrc
  .editorconfig
  angular.json                  # Angular CLI config
  tsconfig.json
  tsconfig.app.json
  tsconfig.spec.json
  package.json                  # {{projectName}} + @angular/core + @tsparticles/angular
  README.md
  src/
    main.ts                     # platformBrowserDynamic().bootstrapModule(AppModule)
    polyfills.ts
    styles.css
    index.html
    app/
      app.module.ts             # NgModule with NgxParticlesModule
      app.component.ts          # Component with <ngx-particles>
      app.component.html        # Template with particles + heading
      app.component.css
```

**Acceptance criteria:**
- Copy `template/angular/` to a temp directory
- `npm install && npx ng serve` starts without errors
- Browser shows particles + heading
- No v3 references

**Reference files:**
- `demo/angular/` — Angular demo structure
- `wrappers/angular/` — @tsparticles/angular component API

---

### Step 1e — Scaffold template: `template/svelte/`

**Goal**: Create the Svelte framework sub-template under `templates/scaffold/template/svelte/`.

**Dependencies**: Step 1 (package infrastructure). Independent of 1b, 1c, 1d, 1f.

**Files to create:**
```
templates/scaffold/template/svelte/
  gitignore
  package.json                  # {{projectName}} + svelte + @tsparticles/svelte
  index.html
  vite.config.ts                # @sveltejs/vite-plugin-svelte
  tsconfig.json
  README.md
  src/
    main.ts                     # mount App to target
    App.svelte                  # <Particles> + heading
    app.css
```

**Note**: The existing `demo/svelte/` uses Rollup, but the template should use Vite (`@sveltejs/vite-plugin-svelte`). Check the latest Svelte 5 conventions for the component API.

**Acceptance criteria:**
- Copy `template/svelte/` to a temp directory
- `npm install && npm run dev` starts without errors
- Browser shows particles + heading
- No v3 references

**Reference files:**
- `demo/svelte/` — Svelte demo (adapt from Rollup to Vite)
- `wrappers/svelte/` — @tsparticles/svelte component API

---

### Step 1f — Scaffold template: `template/solid/`

**Goal**: Create the Solid framework sub-template under `templates/scaffold/template/solid/`.

**Dependencies**: Step 1 (package infrastructure). Independent of 1b, 1c, 1d, 1e.

**Files to create:**
```
templates/scaffold/template/solid/
  gitignore
  package.json                  # {{projectName}} + solid-js + @tsparticles/solid
  index.html
  vite.config.ts                # vite-plugin-solid
  tsconfig.json
  README.md
  src/
    main.tsx                    # render(() => <App />, root)
    App.tsx                     # <Particles> component + heading
    index.css
```

**Acceptance criteria:**
- Copy `template/solid/` to a temp directory
- `npm install && npm run dev` starts without errors
- Browser shows particles + heading
- No v3 references

**Reference files:**
- `demo/solid/` — Solid demo structure
- `wrappers/solid/` — @tsparticles/solid component API

---

### Step 2a — Use-case template: `templates/login/`

**Goal**: Create a login/register page template package with vanilla framework variant.

**Dependencies**: Step 1a (scaffold/vanilla structure pattern).

**Files to create:**
```
templates/login/
  package.json                  # @tsparticles/template-login
  template.json                 # Engine + slim
  scripts/prebuild.js           # Same as scaffold
  template/
    vanilla/
      gitignore
      package.json              # {{projectName}}
      index.html
      vite.config.ts
      tsconfig.json
      README.md
      src/
        main.ts                 # Entry: setup tsParticles + auth UI
        style.css               # Auth page styling, light/dark theme
        auth-form.ts            # Login/register form logic + toggle
        particles-config.ts     # Fullscreen particle background config
```

**App features:**
- Login form (email + password) / Register form (email + password + confirm) toggle
- Fullscreen tsParticles background (subtle moving particles)
- Theme toggle (light/dark) or system preference detection
- Basic form validation (empty fields, email format, password match)
- Smooth transitions between login/register views

**Acceptance criteria:**
- Copy `template/vanilla/` to temp dir, `npm install && npm run dev` works
- Can toggle between login and register forms
- Particles render in background
- Form validation shows error messages
- Dark/light theme switching works

---

### Step 2b — Use-case template: `templates/portfolio/`

**Goal**: Create a personal portfolio page template with vanilla framework variant.

**Dependencies**: Step 1a (scaffold/vanilla structure pattern).

**Files to create:**
```
templates/portfolio/
  package.json                  # @tsparticles/template-portfolio
  template.json
  scripts/prebuild.js
  template/
    vanilla/
      gitignore
      package.json
      index.html
      vite.config.ts
      tsconfig.json
      README.md
      src/
        main.ts                 # Entry: init particles hero + section navigation
        style.css               # Portfolio styling
        particles-config.ts     # Hero particle effect config
        sections/
          hero.ts               # Hero section with particles
          about.ts              # About me section
          projects.ts           # Project cards with grid
          skills.ts             # Skills with animated bars
          contact.ts            # Contact form
```

**App features:**
- Hero section with fullscreen particles as background
- Smooth scroll navigation (about → projects → skills → contact)
- Project cards with hover effects
- Skill bars with animation on scroll
- Contact form with validation
- Responsive design

**Acceptance criteria:**
- Copy `template/vanilla/` to temp dir, `npm install && npm run dev` works
- All sections render and are navigable
- Particles animate in hero section
- Responsive layout works on mobile viewport

---

### Step 2c — Use-case template: `templates/landing/`

**Goal**: Create a marketing landing page template with vanilla framework variant.

**Dependencies**: Step 1a (scaffold/vanilla structure pattern).

**Files to create:**
```
templates/landing/
  package.json                  # @tsparticles/template-landing
  template.json
  scripts/prebuild.js
  template/
    vanilla/
      gitignore
      package.json
      index.html
      vite.config.ts
      tsconfig.json
      README.md
      src/
        main.ts                 # Entry: init particles hero + scroll sections
        style.css               # Landing page styling
        particles-config.ts     # Hero particle effect
        sections/
          hero.ts               # Hero with big particle impact
          features.ts           # Feature cards with icons
          pricing.ts            # Pricing plans comparison
          testimonials.ts       # Testimonial cards
          cta.ts                # Call to action section
          footer.ts             # Footer with links
```

**App features:**
- Hero section with impactful particle effect (large particles, trails, colors)
- Feature cards with staggered entrance animations
- Pricing section with 3-tier comparison
- Testimonial carousel or cards
- CTA section with prominent button
- SEO meta tags in index.html
- Responsive design

**Acceptance criteria:**
- Copy `template/vanilla/` to temp dir, `npm install && npm run dev` works
- All sections render
- Particle effect has visual impact (not just subtle — this is a hero)
- Pricing and features sections look complete
- Responsive at mobile width

---

### Step 2d — Use-case template: `templates/tictactoe/`

**Goal**: Create a tic-tac-toe game template with confetti celebration on win.

**Dependencies**: Step 1a (scaffold/vanilla structure pattern).

**Files to create:**
```
templates/tictactoe/
  package.json                  # @tsparticles/template-tictactoe
  template.json                 # Also include @tsparticles/confetti
  scripts/prebuild.js
  template/
    vanilla/
      gitignore
      package.json
      index.html
      vite.config.ts
      tsconfig.json
      README.md
      src/
        main.ts                 # Entry: game initialization
        style.css               # Game styling
        particles-config.ts     # Background particle effect
        game/
          board.ts              # 3x3 board logic + rendering
          game-state.ts         # Turn management, win detection, score
          confetti-effect.ts    # Confetti/ribbons trigger on win
```

**App features:**
- Full tic-tac-toe game (2 players, takes turns)
- Win detection (rows, columns, diagonals) + draw detection
- Score tracking (X wins, O wins, draws)
- Reset button to play again
- Confetti/ribbons particle explosion on win (use `@tsparticles/confetti` or custom `loadConfetti`)
- Subtle particle background during gameplay (different from victory effect)
- Responsive, clean design

**Acceptance criteria:**
- Copy `template/vanilla/` to temp dir, `npm install && npm run dev` works
- Two players can play a full game
- Win detection works for all patterns
- Confetti/ribbons fire on win
- Reset clears the board and resets particles
- No v3 references

**Reference files:**
- `bundles/confetti/` — Confetti bundle API
- `websites/confetti/` — Confetti standalone site

---

### Step 2e — Bundle template: `templates/confetti/`

**Goal**: Create a confetti demo template package (`@tsparticles/template-confetti`) that showcases `@tsparticles/confetti` in action.

**Dependencies**: Step 1a (scaffold/vanilla structure pattern).

**Files to create:**
```
templates/confetti/
  package.json                  # @tsparticles/template-confetti
  template.json                 # @tsparticles/confetti + engine
  scripts/prebuild.js
  template/
    vanilla/
      gitignore
      package.json              # {{projectName}}
      index.html
      vite.config.ts
      tsconfig.json
      README.md
      src/
        main.ts                 # Entry: confetti cannon + UI controls
        style.css               # Fullscreen, control panel overlay
```

**App features:**
- Button to fire a confetti burst
- Optional: burst type selector (cannon, waterfall, random)
- Fullscreen or canvas-contained confetti
- Built with `@tsparticles/confetti` API

**Acceptance criteria:**
- Copy `template/vanilla/` to temp dir, `npm install && npm run dev` works
- Clicking the button fires confetti
- No v3 references

**Reference files:**
- `bundles/confetti/` — Confetti bundle API and exports
- `websites/confetti/` — Confetti standalone demo site

---

### Step 2f — Bundle template: `templates/ribbons/`

**Goal**: Create a ribbons demo template package (`@tsparticles/template-ribbons`) showcasing `@tsparticles/ribbons`.

**Dependencies**: Step 1a (scaffold/vanilla structure pattern).

**Files to create:**
```
templates/ribbons/
  package.json                  # @tsparticles/template-ribbons
  template.json                 # @tsparticles/ribbons + engine
  scripts/prebuild.js
  template/
    vanilla/
      gitignore
      package.json              # {{projectName}}
      index.html
      vite.config.ts
      tsconfig.json
      README.md
      src/
        main.ts                 # Entry: init ribbons with tslib
        style.css               # Fullscreen
```

**App features:**
- Auto-starting ribbons animation
- Optional controls: color, speed, density
- Built with `@tsparticles/ribbons` bundle

**Acceptance criteria:**
- Copy `template/vanilla/` to temp dir, `npm install && npm run dev` works
- Ribbons render and animate on screen
- No v3 references

**Reference files:**
- `bundles/ribbons/` — Ribbons bundle API
- `websites/ribbons/` — Ribbons standalone demo site

---

### Step 2g — Bundle template: `templates/particles/`

**Goal**: Create a minimal particles demo template package (`@tsparticles/template-particles`) showcasing `@tsparticles/particles`.

**Dependencies**: Step 1a (scaffold/vanilla structure pattern).

**Files to create:**
```
templates/particles/
  package.json                  # @tsparticles/template-particles
  template.json                 # @tsparticles/particles + engine
  scripts/prebuild.js
  template/
    vanilla/
      gitignore
      package.json              # {{projectName}}
      index.html
      vite.config.ts
      tsconfig.json
      README.md
      src/
        main.ts                 # Entry: load particles.js compatible config
        style.css               # Fullscreen
```

**App features:**
- Classic particles.js-style demo (floating dots with connections)
- Uses `@tsparticles/particles` bundle
- Clean, minimal — the "hello world" of tsParticles

**Acceptance criteria:**
- Copy `template/vanilla/` to temp dir, `npm install && npm run dev` works
- Floating particles with connection lines render
- No v3 references

**Reference files:**
- `bundles/particles/` — Particles bundle API
- `demo/vanilla_new/` — Classic particles demo inspiration

---

### Step 3a — CLI command: package scaffolding + types + template-resolver

**Goal**: Add the implementation for the new `app` subcommand in a way that stays aligned with the current CLI architecture.

**Architecture note:** the repo already exposes a public CLI via `@tsparticles/cli-create` / `tsparticles-create`. The new app scaffolding flow should extend that existing CLI, not introduce a second user-facing CLI.

The recommended implementation is:

- keep `@tsparticles/cli-create` as the public binary package
- keep `@tsparticles/cli-command-create` as the command aggregator
- add `@tsparticles/cli-command-create-app` only as an internal subcommand package, following the same pattern already used for bundle/effect/plugin/etc.

If the team prefers fewer packages, implementing `app` directly inside `cli/commands/create/` is also valid, but mixing one subcommand inline while all others remain split packages would be less consistent with the current repo structure.

**Dependencies**: Steps 1, 2 (templates must exist and be resolvable both from the workspace during development and from installed packages in published usage).

**Files to create:**
```
cli/commands/create-app/
  package.json              # @tsparticles/cli-command-create-app
  tsconfig.json
  src/
    types.ts                # TemplateInfo, UserOptions, ScaffoldResult
    template-resolver.ts    # Resolve template path from workspace or installed package
```

**package.json:**
```json
{
  "name": "@tsparticles/cli-command-create-app",
  "version": "4.1.3",
  "private": true,
  "type": "module",
  "dependencies": {
    "@tsparticles/cli-command-create": "workspace:^",
    "commander": "^15.0.0",
    "prompts": "^2.4.2"
  },
  "devDependencies": {
    "@types/prompts": "^2.4.9",
    "typescript": "^6.0.3"
  }
}
```

**types.ts — key interfaces:**
```ts
export interface TemplateInfo {
  name: string          // e.g. "scaffold", "login"
  displayName: string   // e.g. "Scaffold", "Login Page"
  type: "scaffold" | "example"
  frameworks: string[]  // e.g. ["vanilla", "react", "vue3"]
}

export interface UserOptions {
  projectName: string
  template: string
  framework: string
  skipInstall: boolean
}

export interface ScaffoldResult {
  targetDir: string
  templateUsed: string
  frameworkUsed: string
}
```

**template-resolver.ts — core logic:**
- `resolveTemplatePath(name: string): string` — resolves templates from either:
  - workspace source: `templates/<name>/`
  - installed package: `node_modules/@tsparticles/template-<name>/`
- `listAvailableFrameworks(templateName: string): string[]` — reads subdirectories of the resolved `template/` dir
- `listAvailableTemplates(): TemplateInfo[]` — discovers templates from workspace packages during monorepo development and from installed `@tsparticles/template-*` packages in published usage

**Resolver behavior requirements:**
- Prefer workspace paths when running inside the monorepo
- Fall back to installed packages when workspace sources are not available
- Throw a clear error if neither source exists
- Do not make the resolver depend on a single package manager layout detail

**Acceptance criteria:**
- `pnpm install` resolves the new package
- TypeScript compiles without errors
- template-resolver can find a template from the monorepo workspace during local development
- template-resolver can find a template from installed packages in published usage
- `tsparticles-create` remains the only documented user-facing CLI entrypoint

**Reference files:**
- `cli/commands/create/src/create.ts` — Existing command aggregator
- `cli/commands/create-bundle/` — Reference for module structure
- `cli/commands/create-utils/` — Existing utilities

---

### Step 3b — CLI command: prompts + scaffold logic

**Goal**: Implement interactive prompts and the file copying/placeholder replacement logic.

**Dependencies**: Step 3a (types + resolver must exist).

**Files to create/modify:**
```
cli/commands/create-app/src/
  prompts.ts              # Interactive prompt functions (using 'prompts' library)
  scaffold.ts             # File copy, placeholder replacement, template.json merge
```

**prompts.ts — key functions:**
- `promptProjectType(): Promise<"scaffold" | "example">` — Choose project type
- `promptFramework(frameworks: string[]): Promise<string>` — Choose framework from available list
- `promptUseCase(templates: TemplateInfo[]): Promise<string>` — Choose use-case template
- `promptProjectName(): Promise<string>` — Enter project name (validate: npm-safe name)
- `promptSkipInstall(): Promise<boolean>` — Ask whether to run npm install

**scaffold.ts — core logic:**
- `scaffoldProject(options: UserOptions): Promise<ScaffoldResult>`:
  1. Creates target directory `<projectName>` in current working directory
  2. Reads template files from resolved template path
  3. Copies all files recursively, replacing placeholders:
     - `{{projectName}}` → user's project name
     - `{{packageName}}` → kebab-case version of project name
     - `{{version}}` → current tsParticles version (read from engine package.json)
  4. Renames `gitignore` → `.gitignore`
  5. Reads `template.json` from template package root, merges `template.json.package.dependencies` and `template.json.package.devDependencies` into the scaffolded `package.json`
  6. Returns `ScaffoldResult`

**Important implementation notes:**
- Do not support multiple `template.json` schemas unless there is a real backward-compatibility requirement
- Validate that `template/<framework>/package.json` exists before copying files
- Fail with explicit messages when template files are incomplete or placeholders are unresolved
- Avoid scattering hard-coded tsParticles version strings when current values can be resolved from workspace manifests

**Acceptance criteria:**
- Prompts render correctly in terminal
- scaffold.ts copies files and replaces placeholders correctly
- `template.json.package.dependencies` and `template.json.package.devDependencies` are merged into target `package.json`
- `gitignore` is renamed to `.gitignore`
- Missing template/framework errors are clear and actionable
- Generated `package.json` files receive current tsParticles dependency versions, not stale copied values

**Reference files:**
- `cli/commands/create-utils/src/create-project.ts` — Existing pattern for file generation

---

### Step 3c — CLI command: commander integration + registration

**Goal**: Wire everything together as a commander command, register it in the existing CLI.

**Dependencies**: Steps 3a, 3b (all modules must exist).

**Files to create/modify:**
```
cli/commands/create-app/src/
  index.ts              # Commander command definition, orchestrates flow
```

**index.ts — key logic:**
```ts
import { Command } from "commander";
// Create command
const appCommand = new Command("app")
  .argument("[project-name]", "Project name")
  .option("--template <name>", "Template to use (scaffold|login|portfolio|landing|tictactoe|confetti|ribbons|particles)")
  .option("--framework <name>", "Framework (vanilla|react|vue3|angular|svelte|solid)")
  .option("--skip-install", "Skip npm install")
  .action(async (projectName, options) => {
    // Orchestrate: if args missing → run prompts
    // Resolve template → scaffold → optionally install → print success
  });

export default appCommand;
```

**Registration (modify existing files):**

`cli/packages/cli-create/package.json` — add dependency:
```json
"dependencies": {
  "@tsparticles/cli-command-create-app": "workspace:^"
}
```

This keeps the existing public package (`@tsparticles/cli-create`) as the entrypoint. The new package is an implementation detail, not a second CLI.

`cli/commands/create/src/create.ts` — add:
```ts
import appCommand from "@tsparticles/cli-command-create-app";
// ... in the create command setup:
createCommand.addCommand(appCommand);
```

**Important note:** this repo currently uses `cli/commands/create/src/create.ts` as the command registrar. Do not target `src/index.ts` unless the CLI package is separately refactored.

**Acceptance criteria:**
- `tsparticles-create app --help` shows all options
- `tsparticles-create app my-project` runs interactive flow and creates a project
- `tsparticles-create app my-project --template scaffold --framework vanilla` creates a project non-interactively
- `cd my-project && npm install && npm run dev` works
- Existing `tsparticles-create create bundle` etc. still work

---

### Step 4 — `npm create *` wrapper packages

**Goal**: Create thin npm packages enabling `npm create tsparticles`, `npm create confetti`, `npm create ribbons`, and `npm create particles`. Each delegates to `tsparticles-create app` with the corresponding template pre-selected.

**Status**: Placeholder packages already exist at `cli/packages/create-*/` with v0.0.0. They print a "coming soon" message. The following splits the work into two sub-steps: first align them to monorepo conventions, then wire up the real CLI.

**Architecture**: Each package is identical in structure, only differing in:
- npm package name (`create-tsparticles`, `create-particles`, `create-confetti`, `create-ribbons`)
- Binary name (must match package name for `npm create`)
- Template parameter passed to the CLI

---

#### Step 4a — Complete package metadata and files (independent, can run anytime)

**Goal**: Turn the placeholder stubs into proper packages aligned with monorepo conventions — add LICENSE, CHANGELOG.md, project.json, and augment package.json with homepage, bugs, funding, keywords. The bin scripts remain "coming soon" stubs for now (wired in Step 4b).

**Dependencies**: None (fully independent — can even run before Steps 1–3).

**Files to update/create in each of `cli/packages/create-tsparticles/`, `cli/packages/create-particles/`, `cli/packages/create-confetti/`, `cli/packages/create-ribbons/`:**

**`package.json`** — augment with standard metadata fields (keeping existing `name`, `version: "0.0.0"`, `private: false`, `license`, `type`, `bin`, `publishConfig`, `repository`, `prettier`, `scripts`, `devDependencies`, `author`, `description`):
```json
{
  "name": "create-<name>",
  "version": "0.0.0",
  "description": "Scaffold a <bundle> project — npm create <name>",
  "homepage": "https://particles.js.org",
  "license": "MIT",
  "type": "module",
  "bin": {
    "create-<name>": "bin/create-<name>.js"
  },
  "publishConfig": {
    "access": "public",
    "tagVersionPrefix": "v"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/tsparticles/tsparticles.git",
    "directory": "cli/packages/create-<name>"
  },
  "keywords": [
    "tsparticles",
    "particles.js",
    "particles",
    "confetti",
    "ribbons",
    "front-end",
    "web",
    "animation",
    "canvas",
    "html5",
    "cli",
    "scaffold",
    "create",
    "template"
  ],
  "author": "Matteo Bruni <matteo.bruni@me.com>",
  "bugs": {
    "url": "https://github.com/tsparticles/tsparticles/issues"
  },
  "funding": [
    {
      "type": "github",
      "url": "https://github.com/sponsors/matteobruni"
    },
    {
      "type": "github",
      "url": "https://github.com/sponsors/tsparticles"
    },
    {
      "type": "buymeacoffee",
      "url": "https://www.buymeacoffee.com/matteobruni"
    }
  ],
  "prettier": "@tsparticles/prettier-config",
  "scripts": {
    "prettify:ci:readme": "prettier --check ./README.md",
    "prettify:readme": "prettier --write ./README.md",
    "build": "pnpm run prettify:readme",
    "build:ci": "pnpm run prettify:ci:readme",
    "prepack": "pnpm run build"
  },
  "devDependencies": {
    "@tsparticles/prettier-config": "workspace:^"
  }
}
```

**`LICENSE`** — standard MIT license file (same content as repo root):
```
MIT License

Copyright (c) 2020 Matteo Bruni

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**`CHANGELOG.md`** — standard initial changelog:
```markdown
# Changelog

## 0.0.0

- Initial placeholder release
```

**`project.json`** — Nx project configuration (same pattern as `cli/packages/cli-create/project.json`):
```json
{
  "name": "create-<name>",
  "$schema": "https://json.schemastore.org/nx-project.json",
  "projectType": "library",
  "sourceRoot": "cli/packages/create-<name>",
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "options": {
        "commands": ["pnpm run build"],
        "cwd": "cli/packages/create-<name>"
      },
      "dependsOn": ["^build"]
    }
  }
}
```

**All packages** now look like:
```
cli/packages/create-<name>/
  LICENSE
  CHANGELOG.md
  project.json
  package.json
  README.md
  bin/
    create-<name>.js           # Stub (prints "coming soon")
```

**Acceptance criteria (Step 4a):**
- `pnpm install` resolves all 4 packages without errors
- `pnpm run build` and `build:ci` pass
- `pnpm nx run create-tsparticles:build` succeeds (Nx project registered)
- `ls cli/packages/create-<name>/` shows LICENSE, CHANGELOG.md, project.json
- `node cli/packages/create-<name>/bin/create-<name>.js` prints "coming soon" message (stub still works)

---

#### Step 4b — Wire up CLI delegation (after Step 3)

**Goal**: Replace stub bin scripts with real `tsparticles-create app` delegation, bump version to 4.1.3, add `@tsparticles/cli-create` dependency.

**Dependencies**: Step 3 (`tsparticles-create app` command must exist).

**All packages** have the same structure (unchanged from Step 4a):
```
cli/packages/create-<name>/
  LICENSE
  CHANGELOG.md
  project.json
  package.json
  README.md
  bin/
    create-<name>.js           # Real wrapper that calls tsparticles-create app
```

**Final `bin/create-<name>.js`** (replace stub):
```js
#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const forwardedArgs = process.argv.slice(2);
const template = "<bundle>"; // e.g. "confetti", "ribbons", "particles"
const result = spawnSync(
  "tsparticles-create",
  ["app", ...forwardedArgs, "--template", template, "--framework", "vanilla"],
  {
    stdio: "inherit",
    shell: process.platform === "win32",
  },
);

process.exit(result.status ?? 1);
```

**For `create-tsparticles`** (interactive, no fixed template):
```js
#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const forwardedArgs = process.argv.slice(2);
const result = spawnSync("tsparticles-create", ["app", ...forwardedArgs], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
```

**Why this matters:** do not concatenate forwarded CLI args into a shell string. Passing an argument array is safer and avoids quoting/escaping bugs.

**Update `package.json`** — add `@tsparticles/cli-create` dependency and bump version:
```json
{
  "name": "create-<name>",
  "version": "4.1.3",
  "dependencies": {
    "@tsparticles/cli-create": "workspace:^"
  }
  // all other fields preserved from Step 4a
}
```

**Package listing:**

| npm name             | Binary               | Template      | Bundle                   | User runs                |
|----------------------|----------------------|---------------|--------------------------|--------------------------|
| `create-tsparticles` | `create-tsparticles` | (interactive) | —                        | `npm create tsparticles` |
| `create-particles`   | `create-particles`   | `particles`   | `@tsparticles/particles` | `npm create particles`   |
| `create-confetti`    | `create-confetti`    | `confetti`    | `@tsparticles/confetti`  | `npm create confetti`    |
| `create-ribbons`     | `create-ribbons`     | `ribbons`     | `@tsparticles/ribbons`   | `npm create ribbons`     |

**Acceptance criteria (Step 4b):**
- `node cli/packages/create-<name>/bin/create-<name>.js` invokes `tsparticles-create app --template <bundle>`
- Generated project installs and runs with `npm install && npm run dev`
- The specific bundle effect (confetti, ribbons, particles) works out of the box
- No v3 references
- Forwarded args are passed without shell-quoting issues
- Wrapper package versions stay aligned with the repo release version when published

**Steps to finalize (when CLI is ready):**
1. Update `bin/create-<name>.js` from placeholder message → delegation to CLI
2. Add `@tsparticles/cli-create` to `dependencies` in `package.json`
3. Bump `version` from `0.0.0` to `4.1.3`
4. Publish to npm

---

### Step 5 — Deprecate old CRA templates

**Goal**: Mark old CRA-based templates as deprecated.

**Dependencies**: Independent.

**Files to modify:**

`templates/react/package.json` — add `"deprecated"` field:
```json
{
  "name": "cra-template-particles",
  "deprecated": "Use @tsparticles/template-scaffold instead. Create React App is deprecated. Run `npm create tsparticles` for Vite-based templates.",
  // ... rest unchanged
}
```

`templates/react-ts/package.json` — same:
```json
{
  "name": "cra-template-particles-typescript",
  "deprecated": "Use @tsparticles/template-scaffold instead. Create React App is deprecated. Run `npm create tsparticles` for Vite-based templates.",
  // ... rest unchanged
}
```

**Approach**: Keep directories in place. Add the `"deprecated"` field only. Npm will show the deprecation warning to users who install these packages.

**Acceptance criteria:**
- Old CRA templates have `"deprecated"` field with descriptive message
- No structural changes to directories or pnpm-workspace.yaml
- Existing published versions remain installable

---

### Step 6 — Documentation

**Goal**: Update website docs.

**Dependencies**: Independent.

**Files to modify:**

`websites/website/docs/guide/getting-started.md`:
- Before the existing "Installation" section, add a "Quick start" section:
  ````md
  ## Quick start
  
  The fastest way to start is with our CLI:
  
  ```bash
  npm create tsparticles@latest
  ```
  
  Follow the interactive prompts to choose a template and framework.
  A new project will be created in the current directory.
  ````
- Update any CRA or v3 references to point to Vite-based templates

`websites/website/docs/guide/templates-resources.md`:
- Replace entire content:
  - Remove CRA-specific instructions
  - List scaffold templates (6 frameworks)
  - List use-case templates (login, portfolio, landing, tictactoe)
  - Show `tsparticles-create app` usage examples with `--template` and `--framework` flags
  - Link to each `@tsparticles/template-*` package on npm

**Acceptance criteria:**
- Getting-started guide starts with `npm create tsparticles`
- No CRA references
- All v4 package names are correct
- Templates-resources page lists all available templates

---

## Dependency graph with sub-steps

```
Step 1 ──┬── (package infra)
          ├── Step 1a (template/vanilla/) ──┐
          │                                  ├── Step 1b (react)
          │                                  ├── Step 1c (vue3)
          │                                  ├── Step 1d (angular)
          │                                  ├── Step 1e (svelte)
          │                                  └── Step 1f (solid)
          │
Step 2 ──┬── Step 2a (login/)
          ├── Step 2b (portfolio/)
          ├── Step 2c (landing/)
          ├── Step 2d (tictactoe/)
          ├── Step 2e (confetti/)      ← NEW
          ├── Step 2f (ribbons/)       ← NEW
          └── Step 2g (particles/)     ← NEW
          
Step 3 ──┬── Step 3a (types + resolver)
          ├── Step 3b (prompts + scaffold)
          └── Step 3c (commander + registration) ← depends on 3a+3b
          
Step 4 ──┬── Step 4a (metadata + files)   ← independent, can run anytime
          │
          └── Step 4b (CLI delegation)     ← after Step 3
          
Step 5 ── (independent)
Step 6 ── (independent)
```

**Parallel execution possibilities:**
- All of Step 1a-1f can be fully parallel after Step 1
- All of Step 2 (2a-2g) can be fully parallel
- Step 3a → 3b (sequential) → 3c (after both)
- Step 4a can run anytime (independent of all other steps)
- Step 4b after Step 3 (and after Step 4a)
- Steps 5 and 6 can run anytime

## Existing reference files

- `demo/vite/` — Minimal working vanilla template (Vite + TS)
- `demo/react/` — Working React demo
- `demo/vue3/` — Working Vue 3 demo
- `demo/svelte/` — Svelte demo (Rollup, not Vite — needs modernization)
- `demo/solid/` — Working Solid demo
- `demo/angular/` — Working Angular demo
- `templates/react/template/` — Old CRA template structure (prebuild.js pattern)
- `templates/react-ts/template/` — Old CRA TS template structure
- `cli/commands/create-utils/` — Existing scaffolding utilities
- `cli/commands/create-utils/files/empty-project/` — Contributor package template
- `cli/commands/create-utils/src/create-project.ts` — Dynamic code generation
- `cli/commands/create/src/create.ts` — Command registrar to modify
- `cli/packages/cli-create/package.json` — Binary entry point
- `pnpm-workspace.yaml` — Workspace config (line 15: `templates/*`)
- `websites/website/docs/guide/getting-started.md` — Getting started to update
- `websites/website/docs/guide/templates-resources.md` — Templates docs to update

## Useful commands

```bash
# Install
pnpm install

# Test template scaffolding during monorepo development
node cli/packages/cli-create/bin/tsparticles-create.cjs app test-project

# After building CLI:
pnpm --filter @tsparticles/cli-create build
tsparticles-create app test-project

# Build template packages
pnpm --filter "@tsparticles/template-*" build

# Verify workspace registration
grep templates pnpm-workspace.yaml

# Test npm create wrapper
node cli/packages/create-tsparticles/bin/create-tsparticles.js
```

## Verification strategy

Use both verification layers below. Do not consider the feature complete if only one of them passes.

### A. Workspace verification

Confirms the monorepo stays healthy while the new packages/commands are being built.

- `pnpm install`
- `pnpm --filter @tsparticles/template-scaffold build`
- `pnpm --filter @tsparticles/cli-command-create build`
- `pnpm --filter @tsparticles/cli-create build`
- Relevant `pnpm nx run <project>:build` checks for new wrapper packages
- Version drift checks across templates, wrappers, and referenced tsParticles dependencies

### B. Generated project verification

Confirms the generated user project actually works outside the monorepo.

For scaffold templates:

1. Generate into a temp directory
2. Enter the generated project
3. Inspect the generated `package.json` dependency versions
4. Run its package manager install
5. Start the dev server
6. Confirm the expected tsParticles effect and visible UI render correctly

For wrapper packages:

1. Execute the wrapper binary directly
2. Confirm the expected template/framework selection is applied
3. Inspect the generated `package.json` dependency versions
4. Install dependencies in the generated project
5. Run the app and validate the bundled effect

### Validation policy

- Use `pnpm`/`nx` for workspace-level validation inside this repo
- Use the generated project's intended package manager commands inside the scaffolded temp app
- Keep these two verification modes clearly separate in PR notes and acceptance checks
- Keep docs and help output centered on `tsparticles-create` / `@tsparticles/cli-create` as the public CLI surface

## Notes for build agents

1. **Do not break existing CLI**: `tsparticles-create` already has commands (`create bundle`, `create effect`, etc.). Only add the new `app` sub-command.
2. **English everywhere**: All CLI output, prompts, error messages, docs, comments, and template UI text must be in English.
3. **Version consistency**: All packages are currently at v4.1.3. TypeScript is ^6.0.3. Vite is ^8.0.14. No v3 references anywhere. Treat these as current repo-aligned values, but derive real implementation values from workspace package manifests where practical so the code does not depend on this document staying perfectly updated.
4. **gitignore handling**: Name the file `gitignore` (no leading dot) in template dirs. The CLI renames it to `.gitignore` during scaffold.
5. **Placeholder convention**: Use `{{name}}` format in template files. The CLI substitutes with user values.
6. **publishConfig**: Every template `package.json` needs `"private": false` and `"publishConfig": { "access": "public" }`.
7. **Acceptance testing**: After each step, verify with `pnpm install` (workspace resolution) and manual scaffold test.
8. **Do not introduce schema drift**: New templates must use the same `template.json` shape as existing templates in this repo.
9. **Resolver dual-mode support is mandatory**: Local monorepo development and installed-package usage are both first-class scenarios.
10. **One public CLI only**: `@tsparticles/cli-create` remains the only public create CLI package. Any `cli-command-create-app` package is internal and should not be presented as a separate CLI product.
11. **Version drift must fail fast**: template packages, wrapper packages, generated dependencies, and docs must be checked together so future version bumps do not leave templates behind.
