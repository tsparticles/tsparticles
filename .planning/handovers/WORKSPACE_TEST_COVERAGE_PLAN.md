# Workspace Test Coverage Expansion — Feature E of the 4.5.0 Release

## Status

**Planned** — linked from `4.5.0_PLAN.md` as Feature E. Extends the coverage work started in
Feature D (`ENGINE_PARTICLE_TESTS_PLAN.md`, done) from `ParticlesManager` add/remove to the
workspace-wide, currently-untested surface: the engine internals, every shape/updater/interaction
package, deterministic math libraries, the configs/presets catalogs, the CLI command tree and the
framework wrappers.

Design goal: additive, deterministic, workspace-aware. No visual/E2E tests, no timing-based
assertions, no mocking of engine internals that are already reachable through the public API.
**Demo projects, templates and the `palettes/` data catalog are explicitly out of scope** and are
listed only to be ruled out.

Baseline (audit, current session): **461 nx projects**. Excluding demos (27), templates (11),
websites (3) and the `palettes/` catalog (193 projects of generated data), the testable surface is
**227 packages**. Today only **41 real test files carry ~426 `it()` blocks** (11 engine tests in
`@tsparticles/tests`, 9 in `@tsparticles/mcp-server`, 10 color conversion specs, 2 background-mask,
6 CLI, 2 solid, 1 ember). The engine has **no test target of its own** (150 source files), and
every shapes/updaters/interactions/effects/paths/presets/bundles/easings/exports/emittersShapes
package ships **zero tests**. **21 of 23 wrappers** run zero tests (solid + ember have tests), and
**22 of 25 CLI projects** run zero tests (21 without a script + `build` false-green); in total three
wrappers and one CLI command advertise a `test` target that runs **zero** tests (false-green).

---

## Table of Contents

0. [Scope and constraints](#0-scope-and-constraints)
1. [Coverage baseline and gaps (by area)](#1-coverage-baseline-and-gaps-by-area)
2. [Priority model](#2-priority-model)
3. [Wave 1 — Engine internals (P0)](#3-wave-1--engine-internals-p0)
4. [Wave 2 — Deterministic libraries & catalogs (P0/P1)](#4-wave-2--deterministic-libraries--catalogs-p0p1)
5. [Wave 3 — Feature packages: shapes, updaters, interactions, effects, paths, exports (P1/P2)](#5-wave-3--feature-packages-shapes-updaters-interactions-effects-paths-exports-p1p2)
6. [Wave 4 — Plugins option loaders + emittersShapes (P2)](#6-wave-4--plugins-option-loaders--emittersshapes-p2)
7. [Wave 5 — CLI command tree (P3)](#7-wave-5--cli-command-tree-p3)
8. [Wave 6 — Framework wrappers (P3)](#8-wave-6--framework-wrappers-p3)
9. [File plan](#9-file-plan)
10. [Milestones and delivery order](#10-milestones-and-delivery-order)
11. [Verification plan](#11-verification-plan)
12. [Acceptance criteria](#12-acceptance-criteria)
13. [Risks and mitigations](#13-risks-and-mitigations)

---

## 0. Scope and constraints

### 0.1 In scope

1. **Engine** (`@tsparticles/engine`), tested from `@tsparticles/tests`:
   option `load()` classes, `loadParticlesOptions`/`loadProperty`, `Container` lifecycle,
   `Retina`, `CanvasManager`, `RenderManager`, deterministic utils and updater math.
2. **Deterministic math libraries + catalogs**: `@tsparticles/configs` (226 presets),
   `@tsparticles/simplex-noise`, `fractal-noise`, `perlin-noise`, `smooth-value-noise`,
   `noise-field`, `animation-utils`, `canvas-utils`, `path-utils`, and the 14 easing plugins.
3. **Feature packages** (geometry/math-heavy): shapes (21), updaters (13), interactions (21),
   effects (5), paths (15), exports (3), emittersShapes (5).
4. **Plugin option loaders**: `absorbers`, `emitters`, `polygon-mask`, `canvas-mask`,
   `manual-particles`, `sounds`, `themes`, `motion`, `move`, `zoom`, `trail`, `responsive`,
   `blend`, `interactivity`, `infection`, `poisson-disc` — targeted at their `load()`/options
   surface and any pure helper.
5. **Presets (22) and bundles (8)**: registration/load smoke tests.
6. **CLI (25 projects)**: commander registration + dry-run invocation; build-command options
   parsing (bundle targets, config variants) where deterministic.
7. **Wrappers (23 projects)**: component-contract tests — prop handling, engine-init call with the
   correct options/id/url/theme, SSR safety, cleanup. At minimum **one runnable test per wrapper**;
   full contract suite where the wrapper logic is non-trivial.

### 0.2 Out of scope (explicitly excluded)

1. **Demo projects and websites** (`*-demo`, `demo/*`, `websites/*`): 30 projects (27 demos + 3 websites) — excluded by design.
2. **Templates** (`templates/*`): generated scaffold boilerplate, not tsParticles logic.
3. **`palettes/` catalog** (193 nx projects under `palettes/*/*`): generated data fixtures, not logic.
4. **Visual/E2E/screenshot tests** and browser-based demo verification.
5. **Full exhaustive coverage** of every feature package in one release — Wave priorities define
   what must ship vs what is tracked as follow-up (see [2. Priority model](#2-priority-model)).
6. **Cold-water refactors** of engine internals purely to ease mocking.
7. **Empirical performance/benchmark tests** (out of scope for unit coverage).

### 0.3 Constraints

1. Engine tests live in `utils/tests/src/tests/` and follow the existing pattern
   (`tsParticles.load`, `TestWindow`, `createCustomCanvas`, chai-style asserts, vitest + jsdom).
2. Package-local tests (noise, configs, presets, CLI, wrappers) use vitest + jsdom where the
   module touches the DOM; they must pass with `pnpm exec vitest` from the repo root **and** via
   the package's own `test` script.
3. Deterministic only — no timing assertions; drive `update()` with explicit `{ value, factor }`
   deltas (the existing `Particles.ts` convention).
4. Every wave runs green before the next one proceeds; each phase is independently shippable.
5. A test that exposes an engine/package bug is a bug report against the source, NOT a test to
   weaken — fix source + `CHANGELOG.md` entry, re-run green.
6. No new test framework; vitest v5 (repo standard) + jsdom only. Angular wrappers may keep
   `ng test` only if it can run headless in CI; otherwise they are swapped to vitest.
7. Nx-aware: `test` targets are added via `pnpm add -D vitest` as `workspace:*`/devDeps and use the
   package.json `test` script convention so `nx run <project>:test` and
   `nx show projects --withTarget test` stay consistent.

---

## 1. Coverage baseline and gaps (by area)

Snapshot taken during the audit. "Test files" = real `.test.ts`/`.spec.ts`/qunit specs owned by the
package; false-green = a `test` target that runs zero files.

| Area                         | Projects | Test files today | Notes                                                                                    |
| ---------------------------- | -------- | ---------------- | ---------------------------------------------------------------------------------------- |
| Engine (`@tsparticles/tests`) | 1 (150 src) | 11 files / ~203 `it()` | Only indirect engine coverage; options/`Retina`/`CanvasManager`/`RenderManager`/updaters untested |
| Shapes                       | 21       | 0                | vertex math, gif frames, image metrics — all untested                                     |
| Updaters                     | 13       | 0                | roll/tilt/orbit/wobble/twinkle/gradient/destroy/life/rotate/size/opacity/paint/outModes   |
| Interactions external        | 17       | 0                | attract, bounce, bubble, cannon, connect, destroy, drag, grab, parallax, particle, pause, pop, push, remove, repulse, slow, trail |
| Interactions particles       | 4        | 0                | attract, collisions, links, repulse                                                      |
| Effects                      | 5        | 0                | bubble, filter, shadow, trail, particles                                                 |
| Paths                        | 15       | 0                | fractal, simplex, perlin, curl, branches, brownian, polygon, curves, random, spiral, zig-zag, grid, levy, svg + utils |
| Presets                      | 22       | 0                | `loadPreset` smoke entirely missing                                                      |
| Bundles                      | 8        | 0                | basic/slim/all/pjs/particles/confetti/fireworks/ribbons registration smoke               |
| Easings                      | 14       | 0                | deterministic curves, ideal unit-test candidates                                         |
| Exports                      | 3        | 0                | image/video/json generation                                                              |
| Colors                       | 10       | 10 (`conversion.spec.ts`, 12 `it()` total) | thin but present |
| Background-mask              | 1        | 2 files / 15 `it()` | `BackgroundMaskPluginInstance` + `BackgroundMaskCover` specs (already landed with the plugin) |
| Configs                      | 1 (226 src) | 0                | 226 presets, easiest high-value sweep                                                    |
| Util libs                    | 9        | 0                | simplex/fractal/perlin/smooth-value/noise-field/animation-utils/canvas-utils/path-utils   |
| CLI                          | 25       | 6 files in 3 pkgs | only `create` (3), `create-utils` (2), `nx-plugin` (1); `build` has empty glob (false-green); 21 others no test script |
| Wrappers                     | 23       | 3 (solid 2, ember 1) | 21 wrappers zero tests; `angular`, `angular-confetti`, `angular-fireworks` have `ng test` scripts but 0 specs (false-green) |
| MCP server                   | 1        | 9 files / ~148 `it()` | the most thoroughly tested package; baseline only, no further work needed |
| **Demos / templates / websites / palettes** | **234**    | —    | **excluded by design**                             |

### 1.1 Highest-risk uncovered surfaces (why)

| Surface | Risk |
| ------- | ---- |
| Engine `Options/Classes/*` (61 classes, ~5 `it()` today) | base of the entire plugin ecosystem; every `IOptionLoader` extends these |
| Engine `Retina`/`CanvasManager`/`RenderManager`/`Container` lifecycle | public surface used by every wrapper |
| Updater value math (roll/tilt/orbit/wobble/twinkle/gradient) | pure deterministic math, silent visual regressions |
| Shape vertex generation (polygon/star/cog/rounded-polygon/rounded-rect) | exact math, off-by-one/radius bugs are silent visually |
| Interaction geometry (links distance, collision pair resolution, bubble/grab/repulse radius) | geometry bugs are silent but visual |
| Configs catalog (226 presets) | one option-shape rename silently breaks every preset |
| Wrapper reactivity contract (option/url/id/theme) | broke historically (S1–S23 wrapper audit), zero regression protection |
| CLI command tree (25 projects) | 21 with no tests; `build` target is false-green |

---

## 2. Priority model

Coverage budget is finite; this plan sequences work so the 4.5.0 release gate is achievable while
the plan stays complete enough to track the full surface.

| Priority | What | Release gate |
| -------- | ---- | ------------ |
| **P0** | Engine internals (Wave 1) + configs sweep, noise/easing/math libs (Wave 2) | **required to ship 4.5.0** |
| **P1** | Feature packages: shapes, updaters, interactions, effects, paths, exports (Wave 3) | required for the "feature packages covered" gate, scoped to the deterministic high-value subset |
| **P2** | Plugin option loaders + emittersShapes (Wave 4) | required, but may land as the last wave before gate |
| **P3** | CLI (Wave 5) + wrappers (Wave 6) | stretch — tracked in this plan; if not completed, they are promoted to 4.6.0 with the file plan carried over. No false-green target is allowed to remain either way |

**Exclusion invariant:** demos/templates/palettes never get tests; a "no-tests" decision for an
excluded area is deliberate, not an omission.

---

## 3. Wave 1 — Engine internals (P0)

All under `@tsparticles/tests` (`utils/tests/src/tests/`). No engine test target is added; the
engine is exercised through its public API (tsParticles/Container) plus direct
`@tsparticles/engine` internal imports where the class is not reachable via the API (existing
pattern in Feature D).

### 3.1 `OptionsLoad.ts` — option `load()` classes (highest risk)

Cover, for **every class** in `engine/src/Options/Classes/*` (61 files):

- fresh-instance **defaults** (assert values, not object identity);
- `load(options, data)` **merge semantics**: partial objects merge, arrays replace, `undefined`
  input leaves defaults, `null` input tolerated;
- `loadProperty` optional-loader behavior for `undefined` / `null` / primitive / object inputs;
- `loadParticlesOptions` deep-extend: group overrides win over global, invalid input safe.

Class families to reach (existing factory covers ~5 classes today — `Options.ts`):

| Family | Classes |
| ------ | ------- |
| Particle basics | `ParticlesOptions`, `ParticlesNumber`, `ParticlesDensity`, `ParticlesGroups` |
| Shape/colour | `ColorAnimation`, `AnimatableColor`, `Shape`, `ShapeValues` |
| Movement | `Move`, `MoveAngle`, `MoveGravity`, `MoveTrail`, `OutModes`, `PathOptions`, `Spin`, `MoveAttract` |
| Appearance | `Opacity`, `OpacityAnimation`, `Size`, `SizeAnimation`, `ZIndex`, `Shadow` |
| Lifecycle | `Life`, `LifeDelay`, `LifeDuration`, `Destroy`, `DestroyBounds` |
| Effects | `Roll`, `RollLight`, `Tilt`, `TiltAnimation`, `Wobble`, `Twinkle`, `TwinkleValues`, `Orbit`, `OrbitRotation`, `Gradient`, `GradientColorOpacity` |
| Collisions | `Collisions`, `CollisionsAbsorb`, `CollisionsOverlap` |
| Links/repulse | `Links`, `LinksShadow`, `LinksTriangle`, `Repulse`, `RepulseDivider` |
| Background/canvas | `Background`, `BackgroundMask`, `BackgroundMaskCover`, `FullScreen`, `MotionReduce` |
| Interactivity | `Interactivity`, `InteractivityDetect`(enum), `HoverMode`, `ClickMode` option classes |
| Container | `ContainerOptions` (raw), `ManualParticles` |

**Goal:** every class referenced by ≥1 assertion; per-class branch coverage target > 80% on the
`load()` methods.

### 3.2 `EngineUtils.ts` — deterministic math

Exact-value tests for engine helpers not covered today (`Utils.ts` covers 73 cases already):

- `calcEasing`, easing application across a range;
- range/value helpers: `setRangeValue`, `getRangeValue`, `randomInRangeValue`, `inRange`,
  `updateFromDirection`, `updateRangeFromDirection` edge cases (min limit, max limit, zero);
- `gravitation`/`process`-family acceleration applied over explicit deltas;
- color/transform helpers (non-HDR paths already covered by `ColorUtils.ts`);
- `orderByRgba`/`mix` deterministic interpolation.

### 3.3 `UpdaterMath.ts` — engine-side updater math

Pure value computations extracted for testability without a canvas:

- `RollUpdater` rotation-angle from options + factors;
- `TiltUpdater` tilt value update;
- `OrbitUpdater` -radius/-angle progression;
- `TwinkleUpdater` value timing;
- `WobbleUpdater` factor composition;
- `GradientUpdater` interpolated color stops.

Each asserted with fixed inputs (explicit `(value, delta)`), deterministic, NaN-free.

### 3.4 `ContainerLifecycle.ts` — container public surface

Smoke tests through the public API:

- `tsParticles.load` → container reachable: `retina.pixelRatio`, `canvas.size`,
  `particles.count`, `options` resolved;
- `refresh()` → count reset + options re-resolved; `stop()` → ticking halted;
- `load()` again on the same engine → new independent container id;
- `canvas.size` + `particles.setDensity()` resize re-scale (Feature D harness pattern);
- `Container.destroy()` cleanup smoke (no post-destroy exceptions when touched).

---

## 4. Wave 2 — Deterministic libraries & catalogs (P0/P1)

### 4.1 `@tsparticles/configs` sweep (`Configs.ts` in @tsparticles/tests, P0)

- Iterate every named export from `utils/configs/src/index.ts` (226 presets);
- for each, `tsParticles.load` with the preset object into a throwaway container
  (`TestWindow` + `createCustomCanvas`);
- assert: no throw, `particles.number.value > 0` for the non-empty presets, `load` returns a
  container with `count` equal to the configured number.
- Performance gate: if the sweep exceeds ~30s, split into a fast structural check (serialize,
  `number.value > 0`) over all 226 + a live-load subset, and drop the package-local duplicate.

### 4.2 Noise & value libraries (P0) — package-local

Each gains a vitest config (`include: ["src/*.test.ts"]`), a `test` script, and a
`workspace:*` vitest devDep. `Utils`-style deterministic snapshots:

| Package | Tests |
| ------- | ----- |
| `@tsparticles/simplex-noise` | seed → known value snapshot; output bounds in range; 2D+3D sampling sanity |
| `@tsparticles/fractal-noise` | seeded octaves bounded output; parameter combination table |
| `@tsparticles/perlin-noise` | same-seed determinism; classic gradient behavior |
| `@tsparticles/smooth-value-noise` | same-seed determinism; boundary clamp |
| `@tsparticles/noise-field` | field update determinism; index wrapping |
| `@tsparticles/animation-utils` | ease/mix/lerp exact values (imported by paths) |
| `@tsparticles/canvas-utils` | canvas helper functions against the mock 2D context fixture |
| `@tsparticles/path-utils` | path point math, known coordinate outputs |

Path generators consuming these libs are exercised in Wave 3 (paths section).

### 4.3 Easings (14 packages, P1) — package-local or consolidated

Every `plugin-easing-*` (`utils/easings`? under `plugins/easings/*`) exposes a pure curve
function. Two options, chosen by the executor during Phase 0 measurement:

- (a) one consolidated test file per easing (`src/index.test.ts`) asserting known anchor values
  (e.g. `linear(0) === 0`, `linear(1) === 1`, monotonic midpoint);
- (b) a single `Easings.test.ts` in `@tsparticles/tests` that imports all 14
  `@tsparticles/easing-*` exports and asserts each curve at `{0, 0.5, 1}`.

Preference: (a) is closer to the code; (b) is one file. Executor picks the one that yields the
fewest duplicated fixtures.

### 4.4 Presets (22 packages, P1) — registration smoke

Every preset exports `load<Name>Preset(engine)`. Test in a single `Presets.ts` in
`@tsparticles/tests` (or per-package `src/index.test.ts` if package-local isolation is preferred):

- `load*Preset(engine)` registers a plugin (assert via engine plugin list or load smoke);
- `tsParticles.load` with the preset name/options produces a container without throwing;
- spot-check each preset's `presets` mapping for the expected `number.value` range (structural).

### 4.5 Bundles (8, P1) — registration smoke

`Bundles.ts` in `@tsparticles/tests`: for `basic`, `slim`, `all`, `pjs`, `particles`, `confetti`,
`fireworks`, `ribbons`, import the bundle entry, `tsParticles.load` a minimal container, assert
the plugin/shape loaders registered (e.g. via `plugin` load smoke) and no throw. This guards
bundle composition regressions (a feature dropped from a bundle the same way `fluid` was).

---

## 5. Wave 3 — Feature packages: shapes, updaters, interactions, effects, paths, exports (P1/P2)

Strategy for all feature packages: **deterministic, exact-value tests of pure logic**; canvas
interaction through the existing mock-2D-context fixture (`createCustomCanvas`). Constructor/option
load tests import `@tsparticles/engine` utilities and the package's own classes.

### 5.1 Shapes (21) — vertex/geometry math

| Shape | Test focus |
| ----- | ---------- |
| `polygon`, `rounded-polygon`, `cog` | exact vertex count from `sides`; outer/inner radius passthrough; `draw` path point coordinates for a known polygon |
| `star` | radius `r` vs `rOuter` scaling; point count; first-point angle |
| `rounded-rect`, `squircle` | corner radius path; bounding box |
| `spiral`, `heart`, `infinity`, `ribbon` | parameterized curve point count and bounds |
| `circle`, `square`, `line`, `arrow` | trivial shape invariants (diameter, side, endpoints) |
| `text`, `emoji` | font/`textSize` option resolution (no real canvas text measurement — use a fixture with stubbed `measureText`) |
| `matrix`, `cards`, `path` | option load + path parsing invariants |
| `gif` | frame parsing: GIF header parsing, frame delay reconstruction, first-frame logic on a tiny fixture GIF byte array |
| `image` | `load`/`getImage` option resolution with a mocked `HTMLImageElement`/ImageManager |

**Output:** `ShapeGeometry.ts` (+ `GifFrames.ts` if the gif fixture grows) in `@tsparticles/tests`.
Exact coordinates asserted; no real canvas dependency beyond the existing fixture.

### 5.2 Updaters (13) — value/state math

| Updater | Test focus |
| ------- | ---------- |
| `roll` | rotation per `particle.rollAngle` + options accel; no-op when disabled |
| `tilt` | `tiltSin`/`tiltCos` progression; value clamp |
| `orbit` | radius/rotation delta application; flag on enable/disable |
| `twinkle` | timing windows from `TwinkleValues` |
| `wobble` | factor composition over delta |
| `gradient` | color stop interpolation exact values |
| `destroy` | `reduceLife` counters, `destroy.mode` split/remove boundary math (pure) |
| `life` | countdown/times counters with explicit deltas |
| `rotate`, `size`, `opacity` | delta application vs `value` + `AnimationOptions` |
| `paint` | paint option resolution (color/`paint` config) |
| `outModes` | mode decision helper for known positions/velocity |

**Output:** `UpdaterMath.ts` (pure math) + targeted drawer-independent asserts. Updaters that
require particle/canvas context fall back to update-smoke semantics (like Feature D's
`Particles.ts` update test) rather than exact math.

### 5.3 Interactions (21) — geometry/resolution

| Package | Test focus |
| ------- | ---------- |
| `links` | distance threshold decision; color-lerp between two fixed particles; triangle/fade logic pure parts |
| `collisions` | pair overlap detection + classic `bounce`/`absorb`/`destroy` resolution on two fixed particles; fluid-mode smoke separate (links to Feature A plan) |
| `bubble`, `grab`, `repulse`, `attract` | radius-threshold geometry, opacity/color application over explicit mouse position |
| `connect`, `slow`, `parallax` | distance/coordinate math with fixed pointer state |
| `pop`, `push`, `remove`, `cannon`, `destroy`, `particle` | addition/removal counts and position math (reuse `ParticlesManager` approach where relevant) |
| `drag`, `trail`, `pause`, `bounce` | mode-flag behavior + hit-test geometry |

**Output:** `InteractionGeometry.ts` (+ `CollisionResolve.ts` for the collision pair math).

### 5.4 Effects (5) — `Effects.ts`

- `bubble`: option load + effect application math;
- `filter`: color filter matrix/values resolution;
- `shadow`: shadow color/offset option load;
- `trail`: trail length/count bookkeeping;
- `particles`: sub-particles options/load smoke.

### 5.5 Paths (15) — generator determinism

Path packages define `IPathGenerator` with `init(options)` and `update(particle)`. Deterministic:

- `init()` produces a generator; consecutive `update()` calls with fixed particle position return
  a bounded, deterministically equal velocity vector for the same seed/options;
- per-package known-value snapshots for `fractal-noise`, `simplex-noise`, `perlin-noise`,
  `curl-noise`, `branches`, `brownian`, `polygon`, `curves`, `random`, `spiral`, `zig-zag`, `grid`,
  `levy`, `svg`, `path-utils`.

**Output:** `PathGenerators.ts` in `@tsparticles/tests` + package-local snapshots where the path
needs its own seed fixture.

### 5.6 Exports (3) — generation smoke

- `image`/`video`/`json`: with the mock canvas/convenience API, assert the export promise resolves
  to the expected artifact shape (data URL / JSON payload) for a known tiny scene. If the export
  requires real canvas/snapshot, gate to a structural smoke (files written/stream produced) and
  document the limitation.

---

## 6. Wave 4 — Plugins option loaders + emittersShapes (P2)

Mirror the engine option-`load()` discipline for the plugin option classes:

| Plugin | Test focus |
| ------ | ---------- |
| `absorbers` | `Absorber` option load + drag/draw parity state (mirrors emitters Feature C) |
| `emitters` | `Emitter` option load + Feature C `draw`/`draggable` defaults |
| `emittersShapes` (5) | `EmitterShapeBase.draw(context)`/`drawingSizes` per shape; `canvas` shape no-op contract |
| `polygon-mask` | `PolygonMask` options load, polygon point generation |
| `canvas-mask` | mask type/scale resolution |
| `manual-particles` | manual particle options load |
| `sounds`, `themes`, `motion`, `move`, `zoom`, `trail`, `responsive`, `blend`, `interactivity`, `infection`, `poisson-disc` | per-plugin option `load()` + any pure helper (e.g. infection progress, poisson point sampling determinism, blend mode resolution) |

**Output:** per-plugin `src/Options.spec.ts` (package-local) or a consolidated
`PluginOptions.ts` in `@tsparticles/tests`. Preference: package-local for plugins with
non-trivial option trees (absorbers, emitters, polygon-mask, sounds); consolidated for the thin
ones.

---

## 7. Wave 5 — CLI command tree (P3)

**Current state:** 25 projects; only `cli-command-create` (4 files), `cli-create-utils` (3),
`cli-nx-plugin` (1) have tests. `cli-command-build` has a vitest config globbing `tests/**/*.test.ts`
but **no `tests/` directory** (false-green, exits 0 with zero tests). The 20 remaining commands
(`build-{bundle-webpack,bundle-rollup,tsc,eslint,prettier,distfiles,diststats,circular-deps,clear}`,
`create-{interaction,palette,updater,bundle,effect,plugin,preset,shape,path,app}`,
`cli-create`, `cli-build`) have no `test` script at all.

Plan:

1. **Add a `test` script** (`vitest run --config vitest.config.ts`) + `.gitignore`d vitest config
   to every `cli/commands/*` package that lacks one (mirror `cli/commands/build`).
2. **`cli-command-build`** (false-green): create `tests/build.test.ts` with ≥1 real assert —
   commander registration + dry invocation smoke (build command constructs its option set and
   fails fast without touching the filesystem).
3. **Shared build-pipeline fixture**: `build-clear`, `build-prettier`, `build-distfiles`,
   `build-diststats`, `build-tsc`, `build-eslint`, `build-circular-deps` interact with a temp dir
   (`mkdtemp` in `os.tmpdir()`, cleaned up after). Assert the command exits correctly on a tiny
   fixture workspace (empty dir / one-file dir / valid + invalid config).
4. **Bundle commands** (`build-bundle-webpack`, `build-bundle-rollup`): assert bundler option
   construction for a known fixture input without invoking the real bundler (mock the bundler API);
   if that is not viable, document and gate to a registration-only test.
5. **`create-*` commands** (8): extend the existing `cli-command-create` pattern — each command's
   argument/options validation and the generated-file scaffold for a temp target (create-plugin,
   create-preset, create-shape already have 2 tests each via `cli-command-create`; add the
   missing command-specific ones and move them package-local where they belong).
6. **`cli-create-utils`** already has 23 string tests — extend with the file/path utils that the
   create commands rely on.
7. **`cli-build` / `cli-create` / `cli-nx-plugin`** entry points: programmatic invocation smoke.

**Output:** one `tests/*.test.ts` per CLI package (25 targets, no false-green). Where a command is
deterministic on options only, test at that boundary; where it touches the filesystem, use a temp
dir with cleanup. Time-boxed; if a command cannot be tested without heavy OS coupling, it gets a
registration-only test + a documented limitation.

> Note: `nx run <project>:test` only runs when the project's npm script exposes `test`; adding the
> script is what removes the false-green and makes the target real.

---

## 8. Wave 6 — Framework wrappers (P3)

**Current state:** 23 wrapper projects. Solid (2 specs) and ember (6 qunit tests) are the only ones
with real tests. `angular`, `angular-confetti`, `angular-fireworks` run `ng test` with **0 specs**
(false-green); the remaining 18 have no test script.

The wrapper contract worth protecting (regressed multiple times per the S1–S23 audit):

1. **Init**: mounting the wrapper calls `initParticlesEngine` + `load*` with the correct `options`
   (object or parsed JSON), `url`, `id`, and registers the right plugins.
2. **Props**: `options`/`url`/`id`/`theme` changes → destroy+reload (or documented safe path);
   `theme` uses `loadTheme` (optional plugin) safely.
3. **SSR safety**: server render does not throw on `window`/`document`/`canvas` access.
4. **Cleanup**: unmount calls `destroy()`/`stop()` exactly once; no `setState` after destroy.
5. **Type contract**: `particlesLoaded` callback receives `Container | undefined`.

Strategy per wrapper family (vitest + jsdom, engine functions mocked via `vi.mock` of the
`@tsparticles/engine` module, canvas fixture reused from `@tsparticles/tests`):

| Wrapper (23) | Approach |
| ------------ | -------- |
| `react`, `nextjs`, `preact`, `inferno`, `solid` | JSX render (react-test-renderer / `@testing-library`-free render), mock engine, assert `load` args; unmount cleanup test ×2 |
| `vue2`, `vue3`, `nuxt2/3/4` | component mount (vue/server-renderer for SSR check), prop reactivity via wrapper API |
| `svelte` | SSR `render()` + client tick with mocked engine |
| `qwik`, `astro`, `lit`, `stencil`, `webcomponents`, `riot`, `wordpress` | custom-element/component lifecycle tests with mock engine (lit/webcomponents share a harness) |
| `angular` + `angular-confetti` + `angular-fireworks` | **false-green fix**: either add a real `ng test` spec (karma+ChromeHeadless) or replace with vitest + jsdom spec asserting `OnChanges`/init contract — executor picks based on CI headless availability, must end with ≥1 real test |
| `jquery` | load/ajax option contract on a fake element; `setTheme` path |
| `ember` | extend existing qunit suite (6 → contract cases) |

**Minimum gate:** every wrapper runs ≥1 real test; the shared contract (init args, cleanup exact-once)
is asserted for the 5 highest-traffic wrappers (react, vue3, angular, svelte, solid); the rest get
at minimum init+cleanup.

**Excluded:** all `*-demo` and `template/*` wrapper installations (scaffold boilerplate).

---

## 9. File plan

### 9.1 `@tsparticles/tests` (`utils/tests/src/tests/`, engine + workspace sweep)

| File | Action | Content |
| ---- | ------ | ------- |
| `OptionsLoad.ts` | **New** | 61 option classes: defaults + `load()` merge + `loadProperty` + `loadParticlesOptions` deep-extend |
| `EngineUtils.ts` | **New** | `calcEasing`, range/value/gravity helpers, `orderByRgba`/`mix` exact math |
| `UpdaterMath.ts` | **New** | engine-side roll/tilt/orbit/twinkle/wobble/gradient pure math |
| `ContainerLifecycle.ts` | **New** | load/refresh/stop/reload/destroy smoke; `Retina`/`CanvasManager` public surface |
| `Configs.ts` | **New** | 226-preset `@tsparticles/configs` load sweep |
| `Presets.ts` | **New** | 22 preset registration + load smoke |
| `Bundles.ts` | **New** | 8 bundles registration + load smoke |
| `ShapeGeometry.ts` | **New** | shape vertex/radius math + draw fixtures (20 of 21 shapes) |
| `GifFrames.ts` | **New** | GIF frame parsing on a fixture byte array |
| `Updaters.ts` | **New** | 13 updaters' value/state math (`UpdaterMath.ts` is engine-side; this covers package updaters) |
| `InteractionGeometry.ts` | **New** | links/collisions/bubble/grab/repulse/attract geometry |
| `CollisionResolve.ts` | **New** | classic collision pair resolve + fluid-mode smoke |
| `Effects.ts` | **New** | 5 effect packages options/application math |
| `PathGenerators.ts` | **New** | 15 path generator determinism snapshots |
| `Exports.ts` | **New** | image/video/json export structural smoke |
| `PluginOptions.ts` | **New** | thin plugin option `load()` coverage (consolidated) |

### 9.2 Package-local (in owning projects, "where needed elsewhere")

| Package | Action | Content |
| ------- | ------ | ------- |
| `@tsparticles/configs` | test script + `src/index.test.ts` | structural duplicate of `Configs.ts` (kept only if live sweep < 30s) |
| `@tsparticles/simplex-noise`, `fractal-noise`, `perlin-noise`, `smooth-value-noise`, `noise-field`, `animation-utils`, `canvas-utils`, `path-utils` | vitest config + `test` script + `src/*.test.ts` | seed/value/range snapshots, bounds, determinism |
| `plugin-easing-*` (14) | `src/index.test.ts` | known-value curve anchors (or consolidated `Easings.ts` in `@tsparticles/tests`) |
| CLI (25) | `test` script + vitest config + `tests/*.test.ts` | commander registration + dry invocation; temp-dir pipeline tests; `cli-command-build` false-green fixed |
| Wrappers (23) | `test` script (vitest) + `src/*.spec.*` | component-contract tests (init args, prop reactivity, SSR safety, cleanup); angular false-green fixed |

---

## 10. Milestones and delivery order

| Milestone | Contents | Ships with |
| --------- | -------- | ---------- |
| **M1 (P0)** | Waves 1–2: engine internals, configs sweep, noise/value libs, easings | 4.5.0 core gate |
| **M2 (P1)** | Wave 3: shapes, updaters, interactions, effects, paths, exports (deterministic subset) | 4.5.0 core gate |
| **M3 (P2)** | Wave 4: plugin option loaders + emittersShapes | 4.5.0 gate (last coverage wave) |
| **M4 (P3)** | Waves 5–6: CLI + wrappers; **no false-green target may remain** | 4.5.0 if feasible, else promoted to 4.6.0 with this file plan carried over |

Each milestone is independently shippable; a milestone that fails its gate does not block the ones
before it.

---

## 11. Verification plan

- `pnpm exec vitest` from repo root — full workspace suite green (no flaky/timing assertions).
- Per-phase quick loops, e.g. `pnpm --filter @tsparticles/tests exec vitest run src/tests/OptionsLoad.ts`.
- `pnpm --filter @tsparticles/tests run lint` and `pnpm --filter @tsparticles/tests run prettify:ci` clean
  on all new engine-side files (sort-imports, repo style).
- Package-local verification, one per wave:
  `pnpm --filter @tsparticles/configs test`, `--filter @tsparticles/simplex-noise test`,
  `--filter @tsparticles/cli-command-build test`, `--filter @tsparticles/react test`,
  `--filter @tsparticles/angular test`.
- `nx show projects --withTarget test` — every advertised target runs ≥1 file (false-green sweep).
- Coverage: `pnpm exec vitest --coverage` on `@tsparticles/tests` — report per-area delta vs the
  Phase-0 baseline; targets: `engine/src/Options/Classes/*` > 80% branch; global `@tsparticles/tests`
  file+function coverage above baseline; feature-package coverage reported per package touched.

Behavioral sanity (manual):

1. Every option class in `engine/src/Options/Classes/*` appears in ≥1 test.
2. All 226 configs + 22 presets + 8 bundles load through the engine without throwing.
3. Noise/easing packages: two runs with the same seed return identical values.
4. CLI: `cli-command-build` reports ≥1 passing test (never "no test files found").
5. Angular wrappers: `ng test` (or vitest replacement) executes ≥1 spec headlessly.
6. React/vue3/angular/svelte/solid: mounting the wrapper invokes the engine with the correct
   options/id/theme and cleans up exactly once.

---

## 12. Acceptance criteria

1. Option-class `load()`/defaults covered for every class in `engine/src/Options/Classes/*`;
   `loadParticlesOptions` deep-extend and `loadProperty` merge semantics pinned.
2. Engine deterministic math (utils, roll/tilt/orbit/twinkle/wobble/gradient) exact-value and
   NaN-free; `ContainerLifecycle` (load→refresh→stop→reload→destroy) and `Retina`/`CanvasManager`
   surface smoke-tested.
3. All 226 `@tsparticles/configs` presets load through the engine without throwing.
4. `simplex-noise`, `fractal-noise`, `perlin-noise`, `smooth-value-noise`, `noise-field`,
   `animation-utils`, `canvas-utils`, `path-utils` and the 14 easings ship deterministic,
   known-value tests with package-local `test` scripts.
5. All 22 presets and 8 bundles have registration + load smoke tests.
6. Shapes (21, incl. gif frames), updaters (13), interactions (21), effects (5), paths (15) and
   exports (3) have deterministic spot coverage with exact values on the pure-math hotspots.
7. Plugin option loaders (Wave 4) have `load()` coverage matching the engine pattern; emittersShapes
   shapes' `draw()` contract covered.
8. CLI: no false-green; every one of the 25 projects runs ≥1 real test; `clear`/`distfiles`/
   `prettier`/`tsc` pipeline commands tested against a temp-dir fixture.
9. Wrappers: ≥1 runnable test per wrapper (23), with the shared contract (init args, cleanup
   exact-once) asserted for react, vue3, angular, svelte, solid; the three angular wrappers'
   false-green `ng test` targets replaced by real specs (or vitest).
10. No test target advertises coverage while running zero tests (verifiable via
    `nx show projects --withTarget test`).
11. Demos/templates/palettes are excluded by design (documented in 0.2).
12. Full suite green, lint clean, per-area coverage delta documented vs Phase-0 baseline;
    any engine/package bug exposed ships as a source fix + changelog entry — no test weakened.

---

## 13. Risks and mitigations

### Risk 1 — Option/geometry tests become brittle to refactors

Mitigation: assert default **values and merge semantics**, not internal identity; a failing test is
a regression signal to review, not a test to silently rewrite.

### Risk 2 — Configs/presets sweep is slow (226+22 loads)

Mitigation: single vitest files with modest `maxWorkers`; structural fast check over the full set +
live-load subset if > 30s; drop package-local duplicates when the `@tsparticles/tests` sweep
suffices.

### Risk 3 — Package-local vitest configs collide with the workspace runner

Mitigation: package-local configs stay minimal (`include` owns `src/*.test.ts` only, no
coverage/maxWorkers overrides) and are verified standalone AND from repo root.

### Risk 4 — Angular `ng test` cannot run headless in CI

Mitigation: replace with vitest + jsdom spec asserting the `OnChanges`/init contract; document the
swap. The invariant is "≥1 real, runnable test", not "karma".

### Risk 5 — Wrapper tests couple to engine internals (mock surface large)

Mitigation: mock at the `@tsparticles/engine` module boundary (`vi.mock`), assert the wrapper's
calls (init args, cleanup), not the engine's behavior (already covered by `@tsparticles/tests`).

### Risk 6 — CLI tests touch the real filesystem/OS

Mitigation: `mkdtemp` in `os.tmpdir()` with guaranteed cleanup; bundler commands use a mocked
bundler API; if OS coupling is unavoidable, gate to registration-only + documented limitation.

### Risk 7 — P3 waves (CLI, wrappers) don't fit the 4.5.0 schedule

Mitigation: explicit P0/P1/P2 gate; P3 is promoted to 4.6.0 with the file plan carried over, but no
false-green target is left behind either way.

### Risk 8 — Geometry tests impose canvas requirements

Mitigation: reuse the existing `createCustomCanvas`/mock-2D-context fixture; no real canvas
dependency beyond what Feature D already relies on.