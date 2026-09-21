# Error Codes & Minified Message Stripping — Feature G of the 4.5.0 Release

## Status

**Executed (v1)** — linked from `4.5.0_PLAN.md` as Feature G. Replaces the current practice of
embedding full, human-readable error strings inside every delivered bundle with a code-based
error-management system:

**Implemented variant (requested by owner):** the catalog is *extensible*, not monolithic. The
engine ships only its own codes (`TSP-1001..1203`); every feature package defines a local
`ErrorCodes.ts` + `ErrorMessages.ts` and registers them at load time with
`addErrorMessages(ErrorMessages)` (called from `index.ts`/`index.lazy.ts` right after
`engine.checkVersion()`). `ErrorUtils.ts` keeps a lazily-initialized runtime `Map` seeded with the
engine messages; `addErrorMessages()` is a no-op in production (`typeof process !== "undefined" &&
process.env.NODE_ENV === "production"`) so the catalog is never read in prod and bundlers drop it
entirely. The `typeof process` guard (never optional chaining, which throws on an undeclared global)
keeps non-min ESM/CDN output safe in browsers; min builds fold it away via rollup `replace`.

- **non-minified / development builds** keep the full, formatted error message (as today)
- **minified builds** (`*.min.js` UMD via rollup) ship only an error code plus a stable
  link to a website page that explains the error (`https://particles.js.org/errors/#TSP-xxxx`)
- the **website errors page** (`websites/website/docs/errors/index.md`) is committed static
  markdown — the single external source of truth for codes → messages, updated every release

Constraint from the request: **this must not slow down or bloat the site/build pipeline.** The
design relies exclusively on constant-folding + dead-code elimination that the existing bundlers
already perform (rollup `replace` + terser): **no extra transpile step, no additional loader, no
runtime lookup table in prod**.

**Diststats delta (after-only; a clean "before" is unavailable because the tree was broken at the
start of this pass).** The deltas below are measured across the build runs of this pass:

| Bundle | Before (this pass, bytes) | After (bytes) | Delta |
| --- | --- | --- | --- |
| `engine/dist/tsparticles.engine.min.js` | 76964 | 75937 | **-1027 B** |
| `shapes/image/dist/tsparticles.shape.image.min.js` | 8139 | 7997 | **-142 B** |
| `interactions/particles/collisions/…collisions.min.js` | 7298 | 7222 | **-76 B** |
| gif / move / path / interactivity / polygon-mask / emitters | n/a | n/a | min sentences removed |

`.min.js` files no longer contain any full message sentence; the non-min dev bundles keep them
(verified for the engine + all 8 shippable packages, see §8). The `bundles/*` webpack `*.min.js`
path could not be rebuilt for verification because `@tsparticles/all` currently fails on a
pre-existing, unrelated missing build of `@tsparticles/plugin-easing-circ`/`-quint` types.

The runtime surface that ends up in user bundles is small (≈ 8 throw sites in the engine, ≈ 28 in
the feature packages that ship browser bundles) — the full audit is in
[0.2 Survey of today's messages](#02-survey-of-todays-messages).

Commits are intentionally left to the owner; nothing in this state is committed.

---

## Table of Contents

0. [Scope and constraints](#0-scope-and-constraints)
1. [Mechanism design](#1-mechanism-design)
2. [Error code catalog](#2-error-code-catalog)
3. [Bundler wiring (minimal, no new pipeline)](#3-bundler-wiring-minimal-no-new-pipeline)
4. [Website errors page](#4-website-errors-page)
5. [Default `getErrorMessage()` contract](#5-default-geterrormessage-contract)
6. [File-by-file specification](#6-file-by-file-specification)
7. [Testing strategy](#7-testing-strategy)
8. [Bundle-size measurement (diststats)](#8-bundle-size-measurement-diststats)
9. [Milestones and delivery order](#9-milestones-and-delivery-order)
10. [Verification plan](#10-verification-plan)
11. [Acceptance criteria](#11-acceptance-criteria)
12. [Risks and mitigations](#12-risks-and-mitigations)
13. [Rollback strategy](#13-rollback-strategy)
14. [Changelog entry (draft)](#14-changelog-entry-draft)
15. [Implementation checklist](#15-implementation-checklist)

---

## 0. Scope and constraints

### 0.1 In scope

1. **Engine** (`@tsparticles/engine`) error call sites converted to codes:
   `Core/Engine.ts`, `Core/Particle.ts`, `Core/CanvasManager.ts` (2× `TypeError`),
   `Core/Utils/PluginManager.ts`, `Options/Classes/HDROptions.ts` (3× options-validation throws).
2. **Feature/browser-shipping packages** that produce `*.min.js` UMD builds: shapes (`image`,
   `gif`), plugins (`polygon-mask`, `emitters`, `interactivity`, `move`, `emittersShapes/path`),
   interactions (`particles/collisions`). ~28 throw sites total.
3. **Single error-code catalog** (`ErrorCodes` + `getErrorMessage()` in the engine) as the single
   source of truth, re-exported via `engine/src/exports.ts` / `export-types.ts`.
4. **`LogUtils`** (`tsParticles - Error` prefix): aligns the logger prefix with the code system so
   console errors and thrown errors reference the same codes.
5. **Website errors page** under `websites/website` (`/docs/errors/`), generated from the catalog,
   kept in sync on release.
6. **Tests + bundle-size guard**: dev format, prod code+link format, catalog integrity, and a
   `diststats`-based regression guard that proves error strings no longer exist in `.min.js`.

### 0.2 Survey of today's messages

Current `throw new Error(...)` / `throw new TypeError(...)` / `console.error(...)` sites that reach
**user browser bundles** (audit, current session):

| Area | Sites | Notes |
| --- | --- | --- |
| engine | `Engine.ts` (version mismatch), `Particle.ts` (position), `PluginManager.ts` (load order), `CanvasManager.ts` (2× OffscreenCanvas), `HDROptions.ts` (3× option validation) | 8 sites |
| shapes/image | `index.ts`, `index.lazy.ts`, `ImageDrawer.ts` (missing collection/source/name/init) | 7 sites (2 duplicated across lazy) |
| shapes/gif | `GifUtils/Utils.ts` (unsupported GIF, frame size, frame parse, offscreen canvas) | 4 sites (frame parse carries `cause`) |
| plugins/polygon-mask | `PolygonMaskInstance.ts` (no polygon, download error, no data) | 7 sites (shared consts `noPolygonFound` / `noPolygonDataLoaded`) |
| plugins/emitters | `ensureEmittersPluginLoaded.ts` | 1 site |
| plugins/interactivity | `index.ts` + `index.lazy.ts` | 4 sites |
| plugins/move | `index.ts` + `index.lazy.ts` | 2 sites |
| plugins/emittersShapes/path | `EmittersPathShape.ts` (no 2d context / no path data) | 3 sites |
| interactions/particles/collisions | `OverlapPluginInstance.ts` | 1 site |
| **Total** | | **≈ 37 sites** |

Out of scope for conversions (still fine to keep as-is): CLI commands, `@tsparticles/mcp-server`,
framework wrappers, demos/templates/websites, `utils/tests`, `bundles/pjs` (legacy port). These do
not ship inside the particle bundle the end user downloads; they may adopt codes later if desired.

### 0.3 Out of scope

1. **No new build pipeline / no extra minifier step.** The mechanism must reuse the constant
   folding already present (webpack `mode` + Terser `dead_code`, rollup `replace` + terser).
2. **No runtime message table in production.** The full message strings must be removable from
   `.min.js` entirely (dead-code eliminated).
3. **No instrumentation/telemetry** and no network calls from the engine on error (the link is
   printed as plain text only; the engine never fetches it).
4. **CLI / MCP / wrappers / demos** error text (see 0.2), unless a follow-up explicitly opts them in.
5. **No i18n** of error messages in this iteration; messages stay English (as today).

### 0.4 Site-build weight guard (explicit constraint)

The website build (`websites/website`, Vitepress) is already large, so this feature **must add
~zero cost to it**. The rules below are binding:

- **The errors page is just a committed static markdown file.** It is generated **offline** by a
  standalone script run manually during the release pass; the resulting `.md` is committed to the
  repo and the Vitepress build renders it like any other plain docs page. No Vitepress plugin, no
  `buildEnd`/`transformPageData` hook, no on-build fetching, no site-build step that reads the
  engine catalog.
- **The engine catalog is never imported by the site at build time.** The generated page is
  self-contained static content; the site's JS/vendor bundle does not pull in `ErrorCodes.ts`/
  `ErrorMessages.ts`. Cost at build = a single markdown page through the normal pipeline (negligible).
- Generation happens only in two cases, both **offline and manual**: (a) a release pass, or (b)
  an error-code change, committed as a normal diff. If the script is deferred, a hand-edited
  markdown page is the fallback — still static and committed.
- No new site dependencies and no script is wired into any `websites/*` build/`package.json`
  script in this iteration (guarded by M5/M6 acceptance).

---

## 1. Mechanism design

### 1.1 Code catalog module (single source of truth)

New `engine/src/Utils/ErrorCodes.ts`:

```ts
export const enum ErrorCode ... // numeric or string; prefer string for stable URLs
```

concretely a `const` object or `enum` mapping stable codes to **English messages with optional
`{0}` placeholders**:

```ts
export const ErrorCodes = {
  engineVersionMismatch: "TSP-1001",
  particlePositionNotFound: "TSP-1002",
  pluginRegisterAfterLoad: "TSP-1003",
  offscreenCanvasUnsupported: "TSP-1101",
  offscreenCanvasTransferFailed: "TSP-1102",
  hdrEnableInvalid: "TSP-1201",
  hdrModeInvalid: "TSP-1202",
  hdrPeakNitsInvalid: "TSP-1203",
} as const;
```

### 1.2 Message table

`engine/src/Utils/ErrorMessages.ts` (dev-only content):

```ts
const messages: Record<ErrorCode, string> = {
  [ErrorCodes.engineVersionMismatch]: "The tsParticles version is different from the loaded plugins version. Engine version: {0}. Plugin version: {1}",
  // ...
};
```

This module is **referenced only from inside dev branches** (via the lazy `ensureRegisteredMessages()`
in `getErrorMessage()` / `addErrorMessages()`), so once the prod branches fold it is unreferenced and
dropped by dead-code elimination.

### 1.3 `getErrorMessage()` selector

```ts
export function getErrorMessage(code: ErrorCode, ...args: unknown[]): string {
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain -- optional chaining would throw on a missing global
  if (typeof process !== "undefined" && process.env.NODE_ENV === "production") {
    return `[tsParticles Error ${code}] https://particles.js.org/errors/#${code}`;
  }
  const template = ensureRegisteredMessages().get(code) ?? `Unknown error code ${code}`;
  return format(template, args);
}
```

Notes:

- the guard is `typeof process !== "undefined" && process.env.NODE_ENV === "production"` — **not**
  optional chaining. `process?.env` throws `ReferenceError` when the `process` identifier is
  undeclared (browsers); `?.` only guards `null`/`undefined` members. `typeof process` is always
  safe. The `prefer-optional-chain` lint rule is disabled per line because optional chaining is
  exactly what must be avoided here.
- in min builds the rollup `replace` folds **both** tokens: `process.env.NODE_ENV` → `"production"`
  and `typeof process !== "undefined"` → `true`, so the guard collapses and Terser removes the dead
  branch. Non-min outputs keep the guard, which is inert in browsers.
- `addErrorMessages()` uses the same guard for the same fold.
- `ensureRegisteredMessages()` lazily creates the runtime `Map`; the catalog must never be
  initialized at module scope because terser treats `new Map(...)` as potentially side-effectful and
  would keep a module-level expression even when unused.
- `format()` is a tiny positional `{0}`, `{1}`-style formatter — use the existing pattern already
  used in the codebase (avoid `JSON.stringify` hot paths; this is throw-path only, not a hot loop).
- The `"production"` message is kept short and version-agnostic; the **website link is the
  long-lived address** (updated per release on the site, not in the bundle).

### 1.4 Dev vs prod file outputs

| Output | Format | `NODE_ENV` at build | Result |
| --- | --- | --- | --- |
| `dist/*.js` (rollup, dev) | non-minified UMD | `development` | full messages |
| `dist/*.min.js` (rollup, prod) | minified UMD | `production` via `replace` | code + link only; strings removed |
| `dist/esm` + `dist/cjs` (tsc publish) | source dist | kept as runtime guard | full messages; downstream bundler may fold |

---

## 2. Error code catalog

Numbering scheme (stable, never reused after a release):

| Range | Area |
| --- | --- |
| `TSP-100x` | engine core (Engine, Particle, PluginManager) |
| `TSP-110x` | canvas/offscreen (CanvasManager) |
| `TSP-120x` | options validation (HDROptions today; pattern for future `load()` guards) |
| `TSP-200x` | shapes/image |
| `TSP-210x` | shapes/gif |
| `TSP-300x` | plugins/polygon-mask |
| `TSP-310x` | plugins/emitters + emittersShapes/path |
| `TSP-320x` | plugins/interactivity + move |
| `TSP-400x` | interactions (collisions) |

Formatting args stay embedded in the catalog (e.g. engine+plugin version numbers, image name).
Each code must have exactly one message; the page and the catalog can never drift because the page
is generated from the catalog (see [4. Website errors page](#4-website-errors-page)).

---

## 3. Bundler wiring (minimal, no new pipeline)

### 3.1 webpack (engine + feature packages)

`cli/utils/webpack-config/src/common/getConfig.ts` — **no change required.** webpack `mode:
"production"` already sets `process.env.NODE_ENV` (via `optimization.nodeEnv` default), Terser
`compress.dead_code: true` removes the folded branch, and the engine already declares
`"sideEffects": false` so the dropped `ErrorMessages` module does not survive. Verify with a
post-build assertion (see [8. Bundle-size measurement](#8-bundle-size-measurement-diststats)).

### 3.2 rollup (engine + feature packages)

`cli/utils/rollup-plugin/src/config/createSingleConfig.ts` — a shared `getReplacements(min, version)`
helper adds the production env token to the existing `replace({ preventAssignment: true, ... })`
calls **only when `min` is true** (three call sites: base, lazy, lazy-runtime):

```ts
replace({
  preventAssignment: true,
  __VERSION__: JSON.stringify(version),
  ...(min
    ? {
        "process.env.NODE_ENV": JSON.stringify("production"),
        'typeof process !== "undefined"': JSON.stringify(true),
      }
    : {}),
}),
```

The engine and every feature package that ships a browser bundle guard their error-catalog
registration behind the same foldable guard:

```ts
// eslint-disable-next-line @typescript-eslint/prefer-optional-chain -- optional chaining would throw on a missing global
if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
  addErrorMessages(ErrorMessages);
}
```

and `addErrorMessages()` in the engine returns early in production. After the rollup `replace`
folds both tokens (`true && "production" !== "production"`), terser dead-code-eliminates the
registration call, the now-unused per-package `ErrorMessages` constant, and (for the engine) the
whole message table:

- the engine wraps catalog initialization in `ensureRegisteredMessages()` (a lazy function only
  reached from dev branches); a module-level `new Map(...)` survives terser because `new` is treated
  as potentially side-effectful, but an inside-a-dropped-function `new Map` is removed
- feature packages drop their own top-level `const ErrorMessages = {...}` because the only
  reference (the registration call) is inside the folded-dead branch

This is the entire bundler change: `getReplacements` in `createSingleConfig.ts` (3 call sites) +
call-site guards, zero new tooling, negligible build-time cost (a single replace).

### 3.3 Published ESM/CJS (tsc)

No change to the tsc pipeline. `getErrorMessage()` keeps its runtime guard so module builds work
in any environment: downstream bundlers fold the plain `process.env.NODE_ENV` token, while the
`typeof process` guard stays runtime-safe. In a browser without a `process` global the guard is
`false`, so the full development message is used instead of throwing — verbose but never a
`ReferenceError`; the engine's own minified outputs always get the compact code + link.

---

## 4. Website errors page

Constraint (from 0.4): the site build must stay **unchanged in cost** — no Vitepress hooks, no
engine import, no on-build generation. The page is a plain committed markdown file.

- New page: `websites/website/docs/errors/index.md` (+ optional `errors.md`), linked from the
  Vitepress nav/sidebar under a "Reference / Errors" section.
- URL pattern rendered by the engine/link: `https://particles.js.org/docs/errors/#TSP-xxxx`.
- Content: a table of all `ErrorCodes` → message (with params documented as placeholders).
  The markdown is produced **offline** by a **standalone script** (new `utils/` helper or `cli/`
  command, e.g. `scripts/generate-errors-doc` reading `engine/src/Utils/ErrorCodes.ts` +
  `ErrorMessages.ts`) and the generated file is **committed**. The script runs manually during the
  release pass only; it is **never wired into the Vitepress build or any `websites/*` script**, so
  the site build cost is exactly the same as for any other static docs page (0.4).
- Fallback if the script is deferred in this iteration: hand-maintained markdown updated during the
  release pass; the catalog remains the source of truth and the page is regenerated later.
- A short "How to read tsParticles errors" section documents that minified bundles print the code +
  link while dev builds print the full message.

---

## 5. Default `getErrorMessage()` contract

- Export: `getErrorMessage(code, ...args)`, `ErrorCodes` (type + const) from `@tsparticles/engine`
  (`engine/src/exports.ts`, `engine/src/export-types.ts`) so plugins can throw codes too.
- Dev: returns the formatted English message (or `Unknown error code <code>` for a bad code).
- Prod: returns `[tsParticles Error <CODE>] https://particles.js.org/errors/#<CODE>`.
- Never throws, never allocates per-frame (throw-path only), never touches the network.
- `LogUtils` error prefix becomes code-aware: `tsParticles - <CODE> - <message>` in dev, and
  `tsParticles - <CODE>` in prod, reusing the same selector.

---

## 6. File-by-file specification

| File | Change |
| --- | --- |
| `engine/src/Utils/ErrorCodes.ts` | **new** — code constants + type |
| `engine/src/Utils/ErrorMessages.ts` | **new** — code → English template map (dev-only) |
| `engine/src/Utils/ErrorUtils.ts` | **new** — `getErrorMessage()` + positional `format()` |
| `engine/src/Utils/LogUtils.ts` | prefix loose strings, reuse `getErrorMessage()` |
| `engine/src/Core/Engine.ts` | `checkVersion()` throws `getErrorMessage(TSP-1001, engineV, pluginV)` |
| `engine/src/Core/Particle.ts` | position error → `TSP-1002` |
| `engine/src/Core/Utils/PluginManager.ts` | load-order error → `TSP-1003` |
| `engine/src/Core/CanvasManager.ts` | 2 `TypeError` → `TSP-1101` / `TSP-1102` |
| `engine/src/Options/Classes/HDROptions.ts` | 3 validation throws → `TSP-1201..1203` (keep current method for type messages that embed the accepted enum list in args) |
| `engine/src/exports.ts` / `export-types.ts` | export `getErrorMessage`, `ErrorCode` type, `ErrorCodes` |
| `shapes/image/src/{index,index.lazy}.ts`, `ImageDrawer.ts` | throws → `TSP-200x` |
| `shapes/gif/src/GifUtils/Utils.ts` | throws → `TSP-210x` (keep `cause` option on the frame-parse error) |
| `plugins/polygonMask/src/PolygonMaskInstance.ts` | 7 throws → `TSP-300x` (replace shared consts with codes + params) |
| `plugins/emitters/.../ensureEmittersPluginLoaded.ts` | → `TSP-310x` |
| `plugins/emittersShapes/path/src/EmittersPathShape.ts` | → `TSP-310x` |
| `plugins/interactivity/src/{index,index.lazy}.ts` | → `TSP-320x` |
| `plugins/move/src/{index,index.lazy}.ts` | → `TSP-320x` |
| `interactions/particles/collisions/src/OverlapPluginInstance.ts` | → `TSP-400x` |
| `cli/utils/rollup-plugin/src/config/createSingleConfig.ts` | `getReplacements(min, version)` adds `process.env.NODE_ENV` → `"production"` **and** `typeof process !== "undefined"` → `true` replaces when `min` (3 spots) |
| `websites/website/docs/errors/index.md` | **new** — committed static error-reference page (generated offline, never wired into the site build) |
| `utils/tests/src/tests/ErrorMessages.ts` | **new** — catalog + format + prod-format tests |
| `cli/commands/build-diststats` (ext) | add a `no-error-strings-in-min` check as part of the size guard (optional) |

---

## 7. Testing strategy

New `utils/tests/src/tests/ErrorMessages.ts`:

1. **Catalog integrity**: every `ErrorCode` has exactly one message; messages unique; codes unique
   and stable numeric ranges.
2. **Dev format**: `getErrorMessage(ErrorCodes.hdrEnableInvalid, "x")` returns the formatted full
   message; unknown code returns `Unknown error code …`.
3. **Prod format**: `vi.stubEnv("NODE_ENV", "production")` → returns exactly
   `[tsParticles Error TSP-1201] https://particles.js.org/errors/#TSP-1201`.
4. **Parametrized messages**: version-mismatch and image-name templates render `{0}`, `{1}`.
5. **Conversion regression**: a sweep asserting the old full strings ("a valid position cannot be
   found", "Register plugins can only be done", …) are no longer present in `engine/src` and the
   converted feature-package sources (they moved to the catalog only).
6. **Thrown errors carry codes**: run the few reachable throw paths (HDROptions invalid load,
   `checkVersion`) and assert `error.message.startsWith("[tsParticles Error TSP-")` under a stubbed
   prod env.

## 8. Bundle-size measurement (diststats)

- Baseline (before): record `engine/dist/*.min.js` and `bundles/all` (or `slim`) min/min+gz sizes
  with the existing `tsparticles-build -d`/`build-diststats` tooling.
- After: same measurement; assert `.min.js` shrank and **no catalog message sentence** appears in
  the minified bytes (grep for a known phrase — must be zero hits in `.min.js`, present in `*.js`).
- Keep the guard as part of the Feature G verification, not a permanent CI gate, unless `diststats`
  already supports assertions (extend then).
- Report the delta in the plan status (expected savings in the hundreds of bytes for the engine,
  larger for bundles that embed image/gif/polygon-mask messages).

---

## 9. Milestones and delivery order

| Milestone | Deliverable | Depends on |
| --- | --- | --- |
| M1 | Catalog + `getErrorMessage()` + engine conversion + exports (P0) | — |
| M2 | Feature-package conversion (shapes, plugins, interactions) + rollup replace (P0) | M1 |
| M3 | `LogUtils` alignment + test suite (`ErrorMessages.ts`) (P1) | M1 |
| M4 | diststats before/after + `.min.js` string-absence guard (P1) | M2 |
| M5 | Website errors page — committed static markdown, generated offline, site build untouched (P2, manual/pre-release) | M1 |
| M6 | Docs (markdown errors note) + changelog + release pass (P2) | M3, M5 |

P0/P1 are the 4.5.0 core gate; M5–M6 are release-pass items and may carry to the website-update
final gate if not needed for the engine gate.

---

## 10. Verification plan

## Build and test

- `pnpm --filter @tsparticles/engine run build` — dev + min outputs; `.min.js` contains no catalog
  sentence; `.js` still does.
- `pnpm exec vitest` — full suite green incl. new `ErrorMessages.ts`.
- `pnpm nx run @tsparticles/engine:lint` — sort-imports/format clean on new files.
- Rebuild one bundle (`pnpm --filter @tsparticles/all run build`) and inspect `dist/*.min.js` for
  the same absence check (validates the rollup `replace` change).
- `tsparticles-build -d` (= `build-diststats`) deltas recorded.

## Behavioral verification

1. Dev bundle throws full messages (unchanged DX).
2. Min bundle throws `[tsParticles Error TSP-xxxx] https://particles.js.org/errors/#TSP-xxxx`.
3. The URL for an existing code resolves to a page row explaining the error.
4. `checkVersion()` with a version mismatch surfaces `TSP-1001` with both versions in dev.
5. No `process` reference leaks into a bundler-less browser path (guard in place).

## Documentation verification

1. `engine` exports include `getErrorMessage`/`ErrorCode`/`ErrorCodes`.
2. `websites/website/docs/errors/index.md` is a committed static markdown page listing every code
   with its message; it builds through the normal Vitepress pipeline **with no plugin, no engine
   import, and no on-build generation** — site build cost unchanged.
3. Engine release notes mention the new code-based errors + link scheme.

---

## 11. Acceptance criteria

1. Every engine + browser-package throw site from the 0.2 survey throws through
   `getErrorMessage()` (zero raw `throw new Error("...")` in the converted surface).
2. `*.min.js` (webpack + rollup) contain **no** full message sentence; only the code + link.
3. `*.js` (non-min) keep full messages; published ESM/CJS keep full messages and are safe
   without a bundler.
4. The errors page matches the catalog (no code without a page row, no row without a code).
5. Full suite green; lint clean; diststats delta recorded.
6. No new build tooling and no measurable build-time impact: the rollup change is a single
   `replace` token, and **the website build performs no error-specific work** (page is committed
   static markdown; verified by diffing/nothing wired into `websites/*` scripts).

---

## 12. Risks and mitigations

### Risk 12.1 — Terser/rollup do not tree-shake the message module

Mitigation (resolved): `ErrorMessages` is referenced only from dev branches. The engine seeds the
catalog inside `ensureRegisteredMessages()` (lazy, callable only from dev branches), never at module
scope — module-level `new Map(...)` survives terser because `new` is treated as potentially
side-effectful; inside a dead function it is removed. Feature packages guard their registration call
behind `typeof process !== "undefined" && process.env.NODE_ENV !== "production"`, and
`addErrorMessages()` no-ops in production, so their top-level message constants become unreferenced
and are dropped. In min builds rollup folds both tokens (`process.env.NODE_ENV` → `"production"`,
`typeof process !== "undefined"` → `true`) so the guard collapses to a constant. Confirmed on real
outputs (see §8) — all `.min.js` clean, dev bundles intact.

### Risk 12.2 — `process` undefined in bundler-less ESM/CDN

Mitigation: the guard is `typeof process !== "undefined" && process.env.NODE_ENV === "production"`,
never optional chaining. `process?.env` throws `ReferenceError` when the `process` identifier is
undeclared (browsers), because `?.` only guards `null`/`undefined` members. `typeof process` is
always safe, so a missing global falls to the dev branch (full messages) instead of throwing.
Minified outputs fold the guard away entirely; downstream bundlers fold the plain
`process.env.NODE_ENV` token and leave the harmless `typeof process` check at runtime. The
`prefer-optional-chain` lint rule is disabled per guard line because optional chaining is exactly
what must be avoided.

### Risk 12.3 — Codes drift from the website page after release

Mitigation: single catalog = single truth; page generated from it at release; numbering never
reused; a regression test asserts the page-catalog table (or the generator script) stays in sync.

### Risk 12.4 — Params rendered into messages leak user data (image names, versions)

Mitigation: prod builds never render params (code + link only), so no runtime data is exposed in
prod; dev builds unchanged from today.

### Risk 12.5 — Type/`TypeError` semantics changed by wrapping in generic `Error`

Mitigation: keep the original error class at each site (`throw new TypeError(getErrorMessage(…))`),
preserving `instanceof` behavior downstream.

### Risk 12.6 — Touching collision/polygon-mask throws bumps Feature A/F work

Mitigation: conversions are text-level only (throw value changes, control flow identical);
re-run the affected package tests. If merge conflicts arise, the feature packages convert after the
engine gate (M2 is P0 but independently revertible).

---

## 13. Rollback strategy

1. Whole feature: revert the converted throw sites to their original strings and delete
   `ErrorCodes.ts`/`ErrorMessages.ts`/`ErrorUtils.ts` + tests + website page → identical 4.4.0
   behavior; the rollup `replace` token is inert if no code uses `process.env.NODE_ENV`.
2. Partial: keep the engine (M1) and drop the feature-package sweep (M2) — engine-only still
   delivers most of the bundle savings; plugins pages/codes deferred.
3. Website page is purely additive and time-invariant (codes pending) — removable without impact.

---

## 14. Changelog entry (draft)

```markdown
### New Features

- Errors: introduced code-based error management. All engine and browser-package errors now throw
  through `getErrorMessage()` with stable `TSP-xxxx` codes. Non-minified builds keep the full,
  formatted English message; minified builds print only the code plus a link to
  `https://particles.js.org/docs/errors/#TSP-xxxx`. New `getErrorMessage` / `ErrorCode` /
  `ErrorCodes` exports on `@tsparticles/engine`. Website gains an error-reference page generated
  from the catalog.
```

---

## 15. Implementation checklist

### M1 — Engine catalog + selector + conversion (P0)

- [x] `engine/src/Utils/ErrorCodes.ts` (codes + type)
- [x] `engine/src/Utils/ErrorMessages.ts` (dev-only message table)
- [x] `engine/src/Utils/ErrorUtils.ts` (`getErrorMessage()` + `format()` + `addErrorMessages()`)
- [x] Convert `Engine.ts` (`TSP-1001`), `Particle.ts` (`TSP-1002`), `PluginManager.ts` (`TSP-1003`),
      `CanvasManager.ts` (`TSP-1101/1102`), `HDROptions.ts` (`TSP-1201..1203`)
- [x] Preserve original error classes (`Error` vs `TypeError`) at each site
- [x] Export `getErrorMessage`/`ErrorCode`/`ErrorCodes` from `exports.ts` + `export-types.ts`
- [x] Engine build compiles (lint + tsc + bundle)

### M2 — Feature packages + rollup (P0)

- [x] shapes/image (`TSP-2001..2004` incl. lazy variants)
- [x] shapes/gif (`TSP-2101..2104`, keep `cause`)
- [x] plugins/polygon-mask (`TSP-3001..3003`)
- [x] plugins/emitters (`TSP-3101`) + emittersShapes/path (`TSP-3102..3103`)
- [x] plugins/interactivity (`TSP-3201..3202`) + move (`TSP-3203`, incl. lazy variants)
- [x] interactions/particles/collisions (`TSP-4001`)
- [x] rollup `replace` folds `process.env.NODE_ENV` → `"production"` + `typeof process !== "undefined"` → `true` when min (3 call sites) + call-site registration guards

### M3 — Logger + tests (P1)

- [x] `LogUtils` error prefix aligned to codes
- [x] `utils/tests/src/tests/ErrorMessages.ts` (catalog integrity, dev/prod format, params, registration)
- [x] Full suite green (233 tests), engine + feature packages lint clean

### M4 — Bundle-size guard (P1)

- [x] Record diststats before/after for `engine` + bundles (see Status; engine -1027 B, image -142 B,
      collisions -76 B; clean "before" unavailable — tree was broken at start)
- [x] `.min.js` contains no catalog sentence; `.js` still contains it (verified engine + 8 packages)
- [ ] `bundles/*` webpack `*.min.js` spot-check — **blocked on pre-existing missing
      `@tsparticles/plugin-easing-circ`/`-quint` builds** (unrelated to this feature)

### M5 — Website errors page (P2)

- [x] `websites/website/docs/errors/index.md` — **committed static markdown**, generated offline
      (hand-maintained this pass) 
- [x] Page is **not wired into the Vitepress build / any `websites/*` script** — renders like any
      other docs page; no engine import, no plugin, no on-build generation (0.4)
- [x] Nav/sidebar link under Reference / Errors (`docs/.vitepress/config.ts` → `/errors/`)

### M6 — Docs + release (P2)

- [x] `markdown/Errors.md` note on error codes (linked from `markdown/Pages/index.md`)
- [x] Changelog entry wired into `4.5.0_PLAN.md` release notes
- [x] Status block updated to Executed; diststats delta reported