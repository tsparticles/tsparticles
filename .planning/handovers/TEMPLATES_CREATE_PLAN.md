# Templates & `create-tsparticles` Plan

> **Note about language**: This document was discussed in Italian because the author is Italian, but **all implementation output must be in English**: English code, English user-facing text, English CLI messages, English docs, English comments. Every UI string, prompt, and console message that a user sees must be English. The templates themselves (HTML, text content, example data) should use English as the default language.

## Context

tsParticles has 23 framework wrappers but only 2 CRA templates (React JS + React TS), which are now obsolete. There is no quick-start system for users to bootstrap a tsParticles project (`npm create tsparticles`). The demo apps in `demo/` work but are internal to the monorepo — not published as templates.

## Goal

Create a template ecosystem for tsParticles with two dimensions:

| Dimension | Description | Examples |
|-----------|-------------|----------|
| **Scaffold** | Minimal framework skeleton | vanilla, react, vue3, angular, svelte, solid |
| **Use-case** | Complete example application | login, portfolio, landing, tictactoe, 404, coming-soon, birthday, quiz |

Each use-case template exists in **versions per framework** (e.g. login for vanilla, react, vue3, angular, svelte, solid).

## Architecture

### Repository layout

```
templates/
  login/                          # @tsparticles/template-login
    package.json
    template.json                 # Shared extra dependencies
    scripts/prebuild.js           # workspace:* → semver
    template/
      vanilla/                    # Vite + TS
        gitignore → .gitignore
        package.json              # {{projectName}} placeholder
        index.html
        vite.config.ts
        tsconfig.json
        src/
          main.ts
          style.css
          particles.ts            # tsParticles config
          ...
      react/                      # Vite + React + @tsparticles/react
        ...
      vue3/                       # Vite + Vue 3 + @tsparticles/vue3
        ...
      angular/                    # Angular CLI + @tsparticles/angular
        ...
      svelte/                     # Vite + Svelte + @tsparticles/svelte
        ...
      solid/                      # Vite + Solid + @tsparticles/solid
        ...
  portfolio/                      # @tsparticles/template-portfolio
    ... (same structure)
  landing/
  tictactoe/
  404/
  coming-soon/
  birthday/
  quiz/
  scaffold/                       # @tsparticles/template-scaffold
    template/
      vanilla/                    # Minimal vanilla skeleton
      react/                      # Minimal react skeleton
      vue3/
      angular/
      svelte/
      solid/

cli/
  commands/
    create-app/                   # @tsparticles/cli-command-create-app (NEW)
  packages/
    cli-create/                   # Existing, registers the new command
    create-tsparticles/           # @tsparticles/create-tsparticles (NEW)

wrappers/                         # Existing, no changes
demo/                             # Existing, no changes (possible future cleanup)
templates/react/                  # OLD CRA — to deprecate
templates/react-ts/               # OLD CRA — to deprecate
```

### Template package

Each template under `templates/<name>/` is an npm package published as `@tsparticles/template-<name>`.

Example `package.json`:
```json
{
  "name": "@tsparticles/template-login",
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

Example `template.json` (extra dependencies to merge into the scaffolded project's `package.json`):
```json
{
  "dependencies": {
    "@tsparticles/engine": "^4.1.3",
    "@tsparticles/slim": "^4.1.3",
    "@tsparticles/configs": "^4.1.3"
  },
  "devDependencies": {
    "typescript": "^6.0.0",
    "vite": "^8.0.0"
  }
}
```

Framework-specific wrappers (`@tsparticles/react`, `@tsparticles/vue3`, etc.) should be declared in the framework-specific template's `template.json` (e.g. `templates/login/template/react/template.json`) or directly in `template/package.json`.

## Planned templates

### Use-case: login
- Auth page with login/register form toggle
- Animated particles as fullscreen background
- Light/dark theme
- Basic form validation

### Use-case: portfolio
- Hero section with particles background
- Sections: about, projects (card grid), skills (animated bars), contact (form)
- Smooth scroll navigation

### Use-case: landing page
- Hero with impactful particle effect
- Feature cards with animations
- Pricing/plans section
- CTA, testimonials, footer
- SEO meta tags

### Use-case: tic-tac-toe
- Complete tic-tac-toe game (2 players)
- Confetti/ribbons explosion on win
- Score tracking, reset, turn indicator
- Clean responsive design

### Use-case: 404 page
- Creative 404 message
- Interactive particles (follow mouse)
- Link back to homepage

### Use-case: coming soon
- Countdown timer
- Moving particles
- Email pre-registration form
- Social links

### Use-case: birthday card
- Animated greeting card
- Confetti + fireworks integration
- Customizable message
- Share link

### Use-case: quiz app
- Multiple choice quiz (3-5 questions)
- Score tracking
- Confetti on perfect score
- Play again

## CLI Flow

### `tsparticles-create app [project-name]`

```bash
tsparticles-create app my-project
```

Interactive flow:

1. Welcome message
2. Select project type:
   - `[Scaffold]` — Minimal starter skeleton
   - `[Example]` — Complete example application
3. If **Scaffold**:
   - Select framework: vanilla / react / vue3 / angular / svelte / solid
   - Project name
4. If **Example**:
   - Select use-case: login / portfolio / landing / tictactoe / 404 / coming-soon / birthday / quiz
   - Select framework: vanilla / react / vue3 / angular / svelte / solid
     (only frameworks available for that use-case are shown)
5. CLI copies the selected template
6. Replaces placeholders:
   - `{{projectName}}` → project name
   - `{{packageName}}` → kebab-case name
   - `{{version}}` → current tsParticles version
7. Creates `.gitignore` from `gitignore`
8. Optional: `npm install` (user confirmation)
9. Final output:
   ```
   ✅ Project "my-project" created!
   
   cd my-project
   npm install
   npm run dev
   ```

### `npm create tsparticles`

Wrapper package `create-tsparticles` that calls `tsparticles-create app "$@"`.

```bash
npm create tsparticles@latest
# equivale a: npx tsparticles-create app
```

## New workspace packages

### 1. `cli/commands/create-app/` — `@tsparticles/cli-command-create-app`

**Dependencies:**
- `commander` (CLI framework, already in use)
- `prompts` (interactive prompt, already in use)
- `chalk` or `picocolors` (output colors)
- `ora` (install spinner)

**Files:**
```
src/
  index.ts              # Exports "app" command
  types.ts              # Interfaces (TemplateInfo, UserOptions, etc.)
  prompts.ts            # Interactive prompt functions
  scaffold.ts           # Copy template, replace placeholders
  template-resolver.ts  # Resolve template workspace/npm package
  package-manager.ts    # npm/pnpm/yarn detection + install
```

**Template discovery:**
- Templates are workspace dependencies (`@tsparticles/template-*`)
- In development: read from `node_modules/@tsparticles/template-<name>/`
- In production (published): read from `node_modules/` after install

**Registration:**
In `cli/packages/cli-create/package.json` add dependency on `@tsparticles/cli-command-create-app`.
In `cli/commands/create/src/index.ts` register the sub-command `app`.

### 2. `cli/packages/create-tsparticles/` — `create-tsparticles`

**package.json:**
```json
{
  "name": "create-tsparticles",
  "version": "4.1.3",
  "bin": {
    "create-tsparticles": "bin/create-tsparticles.js"
  },
  "dependencies": {
    "@tsparticles/cli-create": "workspace:^"
  }
}
```

**`bin/create-tsparticles.js`:**
```js
#!/usr/bin/env node
import { execSync } from "child_process";
const args = process.argv.slice(2);
execSync(`npx tsparticles-create app ${args.join(" ")}`, { stdio: "inherit" });
```

### 3. Template packages

See Architecture section above. Each lives under `templates/<name>/`.

## Template sharing / DRY

Different templates share UI boilerplate. Strategy:

```bash
templates/
  _shared/                  # NOT published, development-only
    components/
      Header/
      Footer/
      ParticleBackground/
      Form/
    styles/
      variables.css
      reset.css
    vite.config.ts          # Shared base config
```

At build time, `scripts/prebuild.js` copies shared files into the specific template. Alternatively, `template/<framework>/` imports partials via symlink.

**Simpler alternative**: Each template is self-contained. Duplication is acceptable for the MVP; partials can be extracted later.

## Implementation phases

### Phase 1 — MVP

**Scope:**
1. `cli/commands/create-app/` — working `app` command
2. `create-tsparticles` — `npm create` wrapper
3. Scaffold templates (6): vanilla, react, vue3, angular, svelte, solid
4. Use-case templates vanilla (4): login, portfolio, landing, tictactoe
5. Template scripts: `prebuild.js` for all
6. Deprecate old CRA templates

**Excluded from Phase 1:**
- Framework-specific versions of use-case templates
- Other use-cases (404, coming-soon, birthday, quiz)
- Website documentation

### Phase 2 — Expansion

**Scope:**
1. login → react, vue3 versions
2. landing → react, vue3 versions
3. New vanilla use-cases: 404, coming-soon, birthday, quiz
4. tictactoe → react, vue3, svelte versions
5. CI tests for templates (verify scaffold works)

### Phase 3 — Extended frameworks

**Scope:**
1. Portfolio → react, vue3 versions
2. Existing use-cases → angular, svelte, solid
3. Docs at `websites/website/docs/guide/`
4. Update getting-started with `npm create tsparticles`

## Required template contents

Each `template/<framework>/` directory must contain:

```
template/
  gitignore                # Rinominato in .gitignore
  package.json             # {{projectName}} come name
  index.html               # Entry HTML (per Vite)
  tsconfig.json            # TypeScript config
  vite.config.ts           # Vite config (per vanilla/react/vue3/svelte/solid)
  README.md                # Breve readme del progetto
  src/
    main.ts / main.tsx     # Entry point
    style.css              # Stili base
```

For framework-specific templates, additionally include:

- **react**: `vite-env.d.ts`, `src/App.tsx`, `src/App.css`, JSX source
- **vue3**: `env.d.ts`, `src/App.vue`, `src/main.ts` with createApp
- **angular**: `angular.json`, `tsconfig.app.json`, `src/main.ts` with bootstrap + polyfills
- **svelte**: `src/App.svelte`, `src/main.ts` with mount
- **solid**: `src/App.tsx`, `src/index.tsx` with render

## Template JSON (template.json)

The `template.json` file defines extra dependencies that the CLI merges into the scaffolded project's `package.json`.

```json
{
  "dependencies": {
    "@tsparticles/engine": "^4.1.3",
    "@tsparticles/slim": "^4.1.3"
  },
  "devDependencies": {
    "typescript": "^6.0.0",
    "vite": "^8.0.0"
  }
}
```

The CLI merges these dependencies with those already in `template/package.json`. Dependencies from `template.json` take precedence in case of conflict.

## Contributing new templates

To add a new template:

1. Create `templates/<name>/` with `package.json`, `template.json`, `scripts/prebuild.js`
2. Add a `template/vanilla/` directory (minimum required)
3. In `scripts/prebuild.js`, convert `workspace:*` to current semver version
4. Verify with `pnpm install` that it resolves as a workspace package
5. Test manually: `node cli/packages/cli-create/bin/tsparticles-create.cjs app test-project --template <name> --framework vanilla`

## Useful commands

```bash
# Install
pnpm install

# Test template scaffolding during development
node cli/packages/cli-create/bin/tsparticles-create.cjs app test-project
# or, after build:
pnpm --filter @tsparticles/cli-create build
tsparticles-create app test-project

# Build template packages
pnpm --filter "@tsparticles/template-*" build

# New template: verify it's registered in pnpm-workspace.yaml
grep templates pnpm-workspace.yaml  # must include templates/*

# Test npm create
node cli/packages/create-tsparticles/bin/create-tsparticles.js
```

## Existing reference files (read first)

- `demo/vite/` — Minimal working vanilla template (Vite + TS)
- `demo/react/` — Working React demo
- `demo/vue3/` — Working Vue 3 demo
- `demo/svelte/` — Svelte demo (Rollup, not Vite — needs modernization)
- `demo/solid/` — Working Solid demo
- `demo/angular/` — Working Angular demo
- `templates/react/template/` — Old CRA template structure
- `templates/react-ts/template/` — Old CRA TS template structure
- `cli/commands/create-utils/` — Existing scaffolding utilities
- `cli/commands/create-utils/files/empty-project/` — Contributor package template
- `cli/commands/create-utils/src/create-project.ts` — Dynamic code generation
- `cli/commands/create/src/index.ts` — Command registrar
- `cli/packages/cli-create/package.json` — Binary entry point
- `pnpm-workspace.yaml` — Workspace config (line `templates/*`)
- `websites/website/docs/guide/templates-resources.md` — Docs to update

## Notes for build agent

1. **Do not break the existing CLI**: `tsparticles-create` already has commands for plugin development. Add only the new `app` sub-command without modifying existing ones.
2. **Template packages**: Every template must be publishable to npm. `scripts/prebuild.js` must convert `workspace:*` to semver (e.g. `^4.1.3`) before publish. This pattern already exists in CRA templates — copy it.
3. **Placeholder convention**: Use `{{name}}` for placeholders in template files. The CLI replaces them with user-provided values.
4. **gitignore handling**: Name the file `gitignore` (no dot) in the template directory. The CLI renames it to `.gitignore` during copy.
5. **Framework availability**: Not all frameworks are available for every use-case. The CLI must show only valid options. An optional `manifest.json` in each template can declare supported frameworks.
6. **Stay within plan scope**: Follow the specified phases. Phase 1 = scaffold (6) + use-case vanilla (4). No more.
7. **Manual testing**: After each implementation, test `tsparticles-create app my-project` with different templates and verify that `cd my-project && npm install && npm run dev` works.
8. **publishConfig**: Every template `package.json` must have `"private": false` and `"publishConfig": { "access": "public" }` to publish to npm.
