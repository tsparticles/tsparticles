## Vite

Vite-specific guidance for `nx import`. For generic import issues (pnpm globs, root deps, project references, name collisions, ESLint, frontend tsconfig base settings, `@nx/react` typings, Jest preset, non-Nx source handling), see `SKILL.md`.

---

### `@nx/vite/plugin` Typecheck Target

`@nx/vite/plugin` defaults `typecheckTargetName` to `"vite:typecheck"`. If the workspace expects `"typecheck"`, set it explicitly in `nx.json`. If `@nx/js/typescript` is also registered, rename one target to avoid conflicts (e.g. `"tsc-typecheck"` for the JS plugin).

Keep both plugins only if the workspace has non-Vite pure TS libraries — `@nx/js/typescript` handles those while `@nx/vite/plugin` handles Vite projects.

### @nx/vite Plugin Install Failure

Plugin init loads `vite.config.ts` before deps are available. **Fix**: `pnpm add -wD vite @vitejs/plugin-react` (or `@vitejs/plugin-vue`) first, then `pnpm exec nx add @nx/vite`.

### Vite `resolve.alias` and `__dirname` (Non-Nx Sources)

**`__dirname` undefined** (CJS-only): Replace with `fileURLToPath(new URL('./src', import.meta.url))` from `'node:url'`.

**`@/` path alias**: Vite's `resolve.alias` works at runtime but TS needs matching `"paths"`. Set `"baseUrl": "."` in project tsconfig.

**PostCSS/Tailwind**: Verify `content` globs resolve correctly after import.

### Missing TypeScript `types` (Non-Nx Sources)

Non-Nx tsconfigs may not declare all needed types. Ensure Vite projects include `"types": ["node", "vite/client"]` in their tsconfig.

### `noEmit` Fix: Vite-Specific Notes

See SKILL.md for the generic noEmit→composite fix. Vite-specific additions:

- Non-Nx Vite projects often have **both** `tsconfig.app.json` and `tsconfig.node.json` with `noEmit` — fix both
- Solution-style tsconfigs (`"files": [], "references": [...]`) may lack `extends`. Add `extends` pointing to the dest root `tsconfig.base.json` so base settings (`moduleResolution`, `lib`) apply.
- This is safe — Vite/Vitest ignore TypeScript emit settings.

### Dependency Version Conflicts

**Shared Vite deps (both frameworks):** `vite`, `vitest`, `jsdom`, `@types/node`, `typescript` (dev)

**Vite 6→7**: Typecheck fails (`Plugin<any>` type mismatch); build/serve still works. Fix: align versions.
**Vitest 3→4**: Usually works; type conflicts may surface in shared test utils.

---

## React-Specific

### React Dependencies

**Production:** `react`, `react-dom`
**Dev:** `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
**ESLint (Nx sources):** `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, `eslint-plugin-react-hooks`
**ESLint (`create-vite`):** `eslint-plugin-react-refresh`, `eslint-plugin-react-hooks` — self-contained flat configs can be left as-is
**Nx plugins:** `@nx/react` (generators), `@nx/vite`, `@nx/vitest`, `@nx/eslint`

### React TypeScript Configuration

Add `"jsx": "react-jsx"` — in `tsconfig.base.json` for single-framework workspaces, per-project for mixed (see Mixed section).

### React ESLint Config

```js
import nx from "@nx/eslint-plugin";
import baseConfig from "../../eslint.config.mjs";
export default [
  ...baseConfig,
  ...nx.configs["flat/react"],
  { files: ["**/*.ts", "**/*.tsx"], rules: {} },
];
```

### React Version Conflicts

React 18 (source) + React 19 (dest): pnpm may hoist mismatched `react-dom`, causing `TypeError: Cannot read properties of undefined (reading 'S')`. **Fix**: Align versions with `pnpm.overrides`.

### `@testing-library/jest-dom` with Vitest

If source used Jest: change import to `@testing-library/jest-dom/vitest` in test-setup.ts, add to tsconfig `types`.

---

## Vue-Specific

### Vue Dependencies

**Production:** `vue` (plus `vue-router`, `pinia` if used)
**Dev:** `@vitejs/plugin-vue`, `vue-tsc`, `@vue/test-utils`, `jsdom`
**ESLint:** `eslint-plugin-vue`, `vue-eslint-parser`, `@vue/eslint-config-typescript`, `@vue/eslint-config-prettier`
**Nx plugins:** `@nx/vue` (generators), `@nx/vite`, `@nx/vitest`, `@nx/eslint` (install AFTER deps — see below)

### Vue TypeScript Configuration

Add to `tsconfig.base.json` (single-framework) or per-project (mixed):

```json
{ "jsx": "preserve", "jsxImportSource": "vue", "resolveJsonModule": true }
```

### `vue-shims.d.ts`

Vue SFC files need a type declaration. Usually exists in each project's `src/` and imports cleanly. If missing:

```ts
declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
```

### `vue-tsc` Auto-Detection

Both `@nx/js/typescript` and `@nx/vite/plugin` auto-detect `vue-tsc` when installed — no manual config needed. Remove source scripts like `"typecheck": "vue-tsc --noEmit"`.

### ESLint Plugin Installation Order (Critical)

`@nx/eslint` init **crashes** if Vue ESLint deps aren't installed first (it loads all config files).

**Correct order:**

1. `pnpm add -wD eslint@^9 eslint-plugin-vue vue-eslint-parser @vue/eslint-config-typescript @typescript-eslint/parser @nx/eslint-plugin typescript-eslint`
2. Create root `eslint.config.mjs`
3. Then `npx nx add @nx/eslint`

### Vue ESLint Config Pattern

```js
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import tsParser from "@typescript-eslint/parser";
import baseConfig from "../../eslint.config.mjs";
export default [
  ...baseConfig,
  ...vue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: { parser: vueParser, parserOptions: { parser: tsParser } },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.vue"],
    rules: { "vue/multi-word-component-names": "off" },
  },
];
```

**Important**: `vue-eslint-parser` override must come **AFTER** base config — `flat/typescript` sets the TS parser globally without a `files` filter, breaking `.vue` parsing.

`vue-eslint-parser` must be an explicit pnpm dependency (strict resolution prevents transitive import).

**Known issue**: Some generated Vue ESLint configs omit `vue-eslint-parser`. Use the pattern above instead.

---

## Mixed React + Vue

When both frameworks coexist, several settings become per-project.

### tsconfig `jsx` — Per-Project Only

- React: `"jsx": "react-jsx"` in project tsconfig
- Vue: `"jsx": "preserve"`, `"jsxImportSource": "vue"` in project tsconfig
- Root: **NO** `jsx` setting

### Typecheck — Auto-Detects Framework

`@nx/vite/plugin` uses `vue-tsc` for Vue projects and `tsc` for React automatically.

```json
{
  "plugins": [
    { "plugin": "@nx/eslint/plugin", "options": { "targetName": "lint" } },
    {
      "plugin": "@nx/vite/plugin",
      "options": {
        "buildTargetName": "build",
        "typecheckTargetName": "typecheck",
        "testTargetName": "test"
      }
    }
  ]
}
```

Remove `@nx/js/typescript` if all projects use Vite. Keep it (renamed to `"tsc-typecheck"`) only for non-Vite pure TS libs.

### ESLint — Three-Tier Config

1. **Root**: Base rules only, no framework-specific rules
2. **React projects**: Extend root + `nx.configs['flat/react']`
3. **Vue projects**: Extend root + `vue.configs['flat/recommended']` + `vue-eslint-parser`

**Required packages**: Shared (`eslint@^9`, `@nx/eslint-plugin`, `typescript-eslint`, `@typescript-eslint/parser`), React (`eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, `eslint-plugin-react-hooks`), Vue (`eslint-plugin-vue`, `vue-eslint-parser`)

`@nx/react`/`@nx/vue` are for generators only — no target conflicts.

---

## Fix Orders

### Nx Source

1. Generic fixes from SKILL.md (pnpm globs, root deps, executor paths, frontend tsconfig base settings, `@nx/react` typings)
2. Configure `@nx/vite/plugin` typecheck target
3. **React**: `jsx: "react-jsx"` (root or per-project)
4. **Vue**: `jsx: "preserve"` + `jsxImportSource: "vue"`; verify `vue-shims.d.ts`; install ESLint deps before `@nx/eslint`
5. **Mixed**: `jsx` per-project; remove/rename `@nx/js/typescript`
6. `nx sync --yes && nx reset && nx run-many -t typecheck,build,test,lint`

### Non-Nx Source (additional steps)

1. Generic fixes from SKILL.md (stale files cleanup, pnpm globs, rewritten scripts, target name prefixing, noEmit→composite, ESLint handling)
2. Fix `noEmit` in **all** tsconfigs (app, node, etc. — non-Nx projects often have multiple)
3. Add `extends` to solution-style tsconfigs so root settings apply
4. Fix `resolve.alias` / `__dirname` / `baseUrl`
5. Ensure `types` include `vite/client` and `node`
6. Install `@nx/vite` manually if it failed during import
7. **Vue**: Add `outDir` + `**/*.vue.d.ts` to ESLint ignores
8. Full verification

### Multiple-Source Imports

See SKILL.md for generic multi-import (name collisions, dep refs). Vite-specific: fix tsconfig `references` paths for alternate directories (`../../libs/` → `../../libs-beta/`).

### Quick Reference: React vs Vue

| Aspect        | React                    | Vue                                       |
| ------------- | ------------------------ | ----------------------------------------- |
| Vite plugin   | `@vitejs/plugin-react`   | `@vitejs/plugin-vue`                      |
| Type checker  | `tsc`                    | `vue-tsc` (auto-detected)                 |
| SFC support   | N/A                      | `vue-shims.d.ts` needed                   |
| tsconfig jsx  | `"react-jsx"`            | `"preserve"` + `"jsxImportSource": "vue"` |
| ESLint parser | Standard TS              | `vue-eslint-parser` + TS sub-parser       |
| ESLint setup  | Straightforward          | Must install deps before `@nx/eslint`     |
| Test utils    | `@testing-library/react` | `@vue/test-utils`                         |
