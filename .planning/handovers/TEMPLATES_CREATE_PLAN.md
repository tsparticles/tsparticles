# Templates & `create-tsparticles` Plan

> **Note about language**: This document was discussed in Italian because the author is Italian, but **all implementation output must be in English**: English code, English user-facing text, English CLI messages, English docs, English comments. Every UI string, prompt, and console message that a user sees must be English. The templates themselves (HTML, text content, example data) should use English as the default language.

## Context

tsParticles has 23 framework wrappers but only 2 CRA templates (React JS + React TS), which are now obsolete. There is no quick-start system for users to bootstrap a tsParticles project (`npm create tsparticles`). The demo apps in `demo/` work but are internal to the monorepo — not published as templates.

## Goal

Create a template ecosystem for tsParticles with two dimensions:

| Dimension | Description | Examples |
|-----------|-------------|----------|
| **Scaffold** | Minimal framework skeleton | vanilla, react, vue3, angular, svelte, solid |
| **Use-case** | Complete example application | login, portfolio, landing, tictactoe |

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
```

The CLI merges these with `template/package.json` deps. template.json values win on conflict.

### prebuild.js

Converts `workspace:*` and `workspace:^` to real semver versions (e.g. `^4.1.3`) before npm publish. The existing CRA templates already have this pattern — copy it.

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
```

**prebuild.js**: Copy the pattern from `templates/react/scripts/prebuild.js`. It reads the current template versions from the monorepo and replaces `workspace:*` references with actual semver ranges.

**Acceptance criteria:**
- `pnpm install` resolves `@tsparticles/template-scaffold` without errors
- `pnpm --filter @tsparticles/template-scaffold build` runs prebuild.js successfully
- No v3 references

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

**Dependencies**: Step 1 (package infrastructure). Independent of 1b and 1d.

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

---

### Step 3a — CLI command: package scaffolding + types + template-resolver

**Goal**: Create the `@tsparticles/cli-command-create-app` package directory, install dependencies, define TypeScript types, and implement the template-resolver module.

**Dependencies**: Steps 1, 2 (templates must exist in node_modules for testing).

**Files to create:**
```
cli/commands/create-app/
  package.json              # @tsparticles/cli-command-create-app
  tsconfig.json
  src/
    types.ts                # TemplateInfo, UserOptions, ScaffoldResult
    template-resolver.ts    # Resolve template path from node_modules
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
- `resolveTemplatePath(name: string): string` — looks up `node_modules/@tsparticles/template-<name>/`
- `listAvailableFrameworks(templateName: string): string[]` — reads subdirectories of `template/` dir
- `listAvailableTemplates(): TemplateInfo[]` — discovers all installed `@tsparticles/template-*` packages

**Acceptance criteria:**
- `pnpm install` resolves the new package
- TypeScript compiles without errors
- template-resolver can find a template when one exists in node_modules

**Reference files:**
- `cli/commands/create/src/index.ts` — Existing command aggregator
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
  5. Reads `template.json` from template package root, merges dependencies into scaffolded `package.json`
  6. Returns `ScaffoldResult`

**Acceptance criteria:**
- Prompts render correctly in terminal
- scaffold.ts copies files and replaces placeholders correctly
- template.json dependencies are merged into target package.json
- `gitignore` is renamed to `.gitignore`

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
  .option("--template <name>", "Template to use (scaffold|login|portfolio|landing|tictactoe)")
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

`cli/commands/create/src/index.ts` — add:
```ts
import appCommand from "@tsparticles/cli-command-create-app";
// ... in the create command setup:
createCommand.addCommand(appCommand);
```

**Acceptance criteria:**
- `tsparticles-create app --help` shows all options
- `tsparticles-create app my-project` runs interactive flow and creates a project
- `tsparticles-create app my-project --template scaffold --framework vanilla` creates a project non-interactively
- `cd my-project && npm install && npm run dev` works
- Existing `tsparticles-create create bundle` etc. still work

---

### Step 4 — `npm create *` wrapper packages

**Goal**: Create thin npm packages enabling `npm create tsparticles`, `npm create confetti`, `npm create ribbons`, and `npm create particles`. Each delegates to `tsparticles-create app` with the corresponding template pre-selected.

**Architecture**: Each package is identical in structure, only differing in:
- npm package name (`create-tsparticles`, `create-particles`, `create-confetti`, `create-ribbons`)
- Binary name (must match package name for `npm create`)
- Template parameter passed to the CLI

**All packages** live under `cli/packages/create-*` and have the same structure:
```
cli/packages/create-<name>/
  package.json
  bin/
    create-<name>.js           # Thin wrapper that calls tsparticles-create app
  README.md
```

**General pattern** for `bin/create-<name>.js`:
```js
#!/usr/bin/env node
import { execSync } from "child_process";
const args = process.argv.slice(2).join(" ");
const template = "<bundle>"; // e.g. "confetti", "ribbons", "particles"
execSync(`npx tsparticles-create app ${args} --template ${template} --framework vanilla`, { stdio: "inherit" });
```

**General pattern** for `package.json`:
```json
{
  "name": "create-<name>",
  "version": "4.1.3",
  "type": "module",
  "bin": {
    "create-<name>": "bin/create-<name>.js"
  },
  "dependencies": {
    "@tsparticles/cli-create": "workspace:^"
  },
  "publishConfig": {
    "access": "public"
  },
  "description": "Scaffold a <bundle> project — npm create <name>"
}
```

**Package listing:**

| npm name | Binary | Template | Bundle | User runs |
|----------|--------|----------|--------|-----------|
| `create-tsparticles` | `create-tsparticles` | (interactive) | — | `npm create tsparticles` |
| `create-particles` | `create-particles` | `particles` | `@tsparticles/particles` | `npm create particles` |
| `create-confetti` | `create-confetti` | `confetti` | `@tsparticles/confetti` | `npm create confetti` |
| `create-ribbons` | `create-ribbons` | `ribbons` | `@tsparticles/ribbons` | `npm create ribbons` |

**Acceptance criteria (all 4 packages):**
- `node cli/packages/create-<name>/bin/create-<name>.js` invokes `tsparticles-create app --template <bundle>`
- Generated project installs and runs with `npm install && npm run dev`
- The specific bundle effect (confetti, ribbons, particles) works out of the box
- No v3 references

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
Step 1 ──┬── Step 1  (package infra)
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
          
Step 4 ──┬── Step 4a (create-tsparticles)    ← interactive
          ├── Step 4b (create-particles)     ← delegates to template particles
          ├── Step 4c (create-confetti)      ← delegates to template confetti
          └── Step 4d (create-ribbons)       ← delegates to template ribbons
          
Step 5 ── (independent)
Step 6 ── (independent)
```

**Parallel execution possibilities:**
- All of Step 1a-1f can be fully parallel after Step 1
- All of Step 2 (2a-2g) can be fully parallel
- Step 3a → 3b (sequential) → 3c (after both)
- All of Step 4 (4a-4d) can be fully parallel after Step 3
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
- `cli/commands/create/src/index.ts` — Command registrar to modify
- `cli/packages/cli-create/package.json` — Binary entry point
- `pnpm-workspace.yaml` — Workspace config (line 15: `templates/*`)
- `websites/website/docs/guide/getting-started.md` — Getting started to update
- `websites/website/docs/guide/templates-resources.md` — Templates docs to update

## Useful commands

```bash
# Install
pnpm install

# Test template scaffolding during development
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

## Notes for build agents

1. **Do not break existing CLI**: `tsparticles-create` already has commands (`create bundle`, `create effect`, etc.). Only add the new `app` sub-command.
2. **English everywhere**: All CLI output, prompts, error messages, docs, comments, and template UI text must be in English.
3. **Version consistency**: All packages are at v4.1.3. TypeScript is ^6.0.3. Vite is ^8.0.14. No v3 references anywhere.
4. **gitignore handling**: Name the file `gitignore` (no leading dot) in template dirs. The CLI renames it to `.gitignore` during scaffold.
5. **Placeholder convention**: Use `{{name}}` format in template files. The CLI substitutes with user values.
6. **publishConfig**: Every template `package.json` needs `"private": false` and `"publishConfig": { "access": "public" }`.
7. **Acceptance testing**: After each step, verify with `pnpm install` (workspace resolution) and manual scaffold test.
