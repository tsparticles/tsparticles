# tsParticles v5 execution plan

Initial plan dated 2026-11-03. Use the dedicated branch `v5`. Merge
`201b8e8d33` incorporates the `4.6.0` release through `main`. Status
**E0 in progress, with major runtime implementation pending and the measurement
baseline partially captured**. See [the evidence report](V5-BUNDLE-REPORT.md)
for measured budgets and remaining exit criteria. The original `4.5.1` reconnaissance and later `4.5.2` architecture
and color review are historical.

## Goals and sequence

Remove the `tsParticles` singleton, support independent engines, and move random
and logger customization into each engine. Reduce the code shipped to consumers
and organize the core into domain folders with small public entrypoints.
**Review all of `engine/src/`**, including ParticlesManager, Particle,
Engine/PluginManager, Retina, events, utilities, options, types, and entrypoints.
Every area requires review. Measurements and contracts should justify any rewrite.
Explicitly audit all plugins and browser/CDN distribution without the singleton.
Document intentional breaking changes and provide migration paths for this major release.

The authoritative order is [E0–E10 in the execution plan](V5-EXECUTION.md),
which records dependencies, difficulty, impact, subdivisions and exit gates.
Handover IDs are stable topic identifiers, not execution order.

| Stage | Scope                                              | Handover ownership                           |
| ----- | -------------------------------------------------- | -------------------------------------------- |
| E0    | Baseline, inventories and support scope            | 01/03/08/09                                  |
| E1    | Explicit engines and supported consumers           | [01](V5-01-ENGINE-INSTANCES.md)              |
| E2    | Per-engine services and shared-state isolation     | [02](V5-02-ENGINE-SERVICES.md)               |
| E3    | Shared contracts and internal boundaries           | [03](V5-03-CORE-BOUNDARIES.md)               |
| E4    | Container lifecycle and extension integration      | [04](V5-04-CONTAINER.md)                     |
| E5    | Particle/options and complete OKLCH migration      | [07](V5-07-PARTICLE.md), color work in 05/08 |
| E6    | Collections, pooling and spatial index             | [06](V5-06-PARTICLES-MANAGER.md)             |
| E7    | Rendering optimization and remaining canvas review | [05](V5-05-CANVAS-RENDERING.md)              |
| E8    | Ecosystem audit closure                            | [08](V5-08-PLUGIN-IMPACT.md)                 |
| E9    | Final distribution and support cleanup             | [09](V5-09-BROWSER-BUNDLES.md)               |
| E10   | Budgets, integration and migration gates           | [10](V5-10-SIZE-MIGRATION-RELEASE.md)        |

The first runtime change remains singleton removal, followed immediately by
service isolation. Particle and color contracts now precede collection and
rendering optimizations. Plugin/browser migration accompanies each breaking
change; E8/E9 verify the completed work. Define retirement scope in E0 to avoid
migrating integrations that v5 will remove.

Agents must read `AGENTS.md`, this index, the execution plan and relevant technical
handovers before editing source. Preserve other contributors' changes and record
files, decisions, commands and results. Commits, publishing and releases require
separate authorization.

## Checkout evidence

- `engine/src/index.ts` and `index.lazy.ts` call `initEngine()` at import time.
- `initEngine.ts` reuses `globalThis.tsParticles` if it finds `pluginManager`.
- `index.lazy.ts` and `browser.ts` write globals. `browser.ts` also exposes random
  and logger getters and setters. `index.ts` itself makes no direct global assignments.
- `MathUtils.ts` holds module-level `_random` and `_animationLoop`.
  `LogUtils.ts` mutates a shared `_logger` object.
- `Engine` exposes a `PluginManager` per instance. Much of the required structure
  already exists. `Engine.load()` imports `Container` dynamically.
- `Engine`, `Container`, `CanvasManager`, and `PluginManager` are currently
  exported as **types** from `export-types.ts`. Preserve that distinction.
- Approximate source lengths are 710 lines for `Container.ts`, 671 for
  `CanvasManager.ts`, 831 for `RenderManager.ts`, 818 for `ParticlesManager.ts`,
  and 1,178 for `Particle.ts`. Measure bundle size separately.
- Migration also covers `wrappers/`, `templates/`, generators in
  `cli/commands/create-utils/`, and MCP-generated code.
- In handover 01, carry forward the v4 Inferno wrapper's load generation check or
  an equivalent guard. Test by changing the component ID during a pending load,
  resolving the newer load first, and then resolving the older one. Verify that
  the wrapper destroys the stale container and retains the newer reference.
- The standard `tsparticles-build` uses Rollup. Webpack and Rolldown are opt-in
  (`cli/commands/build/src/build.ts`). Verify which configurations actually run.
- `CanvasManager` uses a WeakMap for HTMLCanvas → OffscreenCanvas transfers.
  The cache belongs to the browser resource and requires care in a per-engine design.

## Proposed architecture contract

1. The primary API is a synchronous `createEngine(): Engine` that creates a new
   instance on each call without initializing the DOM. Keep async initialization
   via `engine.init()` and `engine.load()`. Pass the engine to loaders.
2. Remove the exported `tsParticles` object, fallback engine lookup in
   `globalThis`, and implicit default engines in wrappers. Applications can keep
   using `tsParticles` as a local variable name.
3. The proposed service methods are `engine.setRandom()`, `getRandom()`,
   `getRandomFn()`, `setLogger()`, and `getLogger()`. Handover 02 defines
   signatures and how helpers receive context without ambient state.
4. Browser scripts can expose factories and loaders through explicit bootstrap.
   Engine creation remains explicit. ESM/CJS imports and the `browser` condition
   remain usable without implicit global writes.
5. Give domain folders selective `index.ts` files. Keep internal helpers out of
   public exports and prevent cross-domain deep imports. Keep types required by
   plugins public. Enforce privacy through import rules and package exports.
6. Refactor based on dependencies that actually ship. Add wrapper classes,
   function factories, or other abstractions only when they serve a purpose
   beyond shortening a file.

Example of the proposed API:

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const first = createEngine();
const second = createEngine();
first.setRandom(() => 0.25);
second.setRandom(() => 0.75);
first.setLogger({ warning: message => console.warn(message) });
await loadSlim(first);
await loadSlim(second);
await first.load({ id: "first", options: {} });
await second.load({ id: "second", options: {} });
```

Use this contract as the starting point. If the analysis shows it needs to change,
document the reason and migration before propagating a different signature.

## Required baseline before the first runtime change

Capture the baseline in E0, before any runtime change or retirement. In
`V5-BUNDLE-REPORT.md`, record the starting commit, working-tree diff, Node and pnpm
versions, build commands, formats, and measurements. Build fresh artifacts for
the verified baseline. Use the same toolchain, minifier, and compression settings.

Complete the standard Rollup baseline and CDN engine-plus-feature measurements
carried forward from V4-S01. Record compressed bytes, request counts, and
duplicate modules for the entry, the first scene, and the full output graph.

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:48e33223d4af4463d81ff82bbe13ab8dd138c879ac57b98059f9152826f890f6 -->

| Scenario                  | Include                                                                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Import a pure helper      | Consumer bundle for one function without engine or DOM                                                                                          |
| Acquire the singleton     | Existing consumer measurement importing and re-exporting `tsParticles` from `@tsparticles/engine`; record separately with its measured revision |
| Acquire a factory engine  | Unavailable until `@tsparticles/engine` exports `createEngine()`; no buildable factory baseline exists yet                                      |
| Minimal scene             | Engine and only the required loaders, using identical options                                                                                   |
| Basic / slim / full / all | Supported minified distribution bundles                                                                                                         |
| ESM/CJS lazy and CDN      | Separate package `/lazy` and documented CDN consumers; record entry and every chunk needed to start the same scene                              |

For singleton acquisition, import and re-export `tsParticles` so the bundler
retains the acquired engine. Record this existing measurement separately from
factory acquisition. The current package exports the singleton and does not
export `createEngine()`, so mark the factory-consumer scenario unavailable.
Once the factory is exported, build a separate entry that imports `createEngine`
and exports the result of one call. Measure explicit initialization and scene
loading in separate consumer entries using `engine.init()` and
`engine.load({ id, options })` on the acquired engine. Use the same ID, options,
and required loaders for both versions.

<!-- /coderabbit-ai-generated:v1 -->

Record raw and minified bytes, gzip, Brotli, chunk count, and retained dependencies.
For ESM, also compare browser consumer bundles using actual `exports` resolution.
Count bytes moved from an entry into chunks in the total. Define numeric budgets
per scenario after measuring the baseline and record them before the size refactor.
Base percentage claims on measurements. At a minimum, the minimal scene and slim
must shrink in gzip and Brotli. Explain increases in other scenarios and stay
within agreed budgets. Leave the gate open with data and reasons if a budget is missed.

## Verification shared by all handovers

- Discover targets with `pnpm nx show project <name> --json`. Check whether
  separate `lint` and `test` targets exist. Engine `build` resolves to `tsparticles-build`.
- In this sandbox, Nx works with `NX_DAEMON=false NX_ISOLATE_PLUGINS=false`.
  Without these local workarounds, the query fails on socket permissions.
- For runtime changes, run targeted tests and the full suite, lint and formatting
  checks for affected files, and consumer builds. Before proposing a commit, run
  `pnpm exec vitest` as required by `AGENTS.md`. If it starts in watch mode,
  record that and complete a finite run with `pnpm exec vitest run`.
- After engine changes, rebuild packages outside CLI, website, and palette as
  specified in `AGENTS.md`. Verify names with `pnpm nx show projects --json`.
  In 01/02 also include the CLI, generators, and other modified consumers covered
  by the standard exclusions.
- Run the CI build without autofixes (`pnpm run build:ci`) at the final gate.
  Record reproduction and impact for existing errors.
- Use deterministic tests, fake schedulers or explicit ticks, and browser checks
  for canvas/HDR. Use real visual verification alongside jsdom mocks.

## Improvement candidates

The [improvement plan](V5-IMPROVEMENTS.md) has six detailed plans covering
measurement, bundle graph and browser delivery, particle collections, spatial
indexing, per-particle state, and rendering/lifecycle. Each defines ownership,
options, constraints, scenarios, and acceptance criteria. The main handovers
link to the relevant plans. Gate 10 also verifies the decision log and outcomes.

## Architecture evaluations

The [architecture plan](V5-ARCHITECTURE.md), added on 2026-11-06, requires
four evaluations: Particle state and serialization, engine package boundaries,
options resolution, and common extension architecture. It records starting
recommendations, alternatives, and evidence requirements. Implement rewrites
only where evidence supports them.

Draft contracts in E3, integrate lifecycle in E4, and implement Particle/options
and color in E5 before E6/E7 optimizations. Verify extension coverage in E8,
packaging in E9 and decision closure in E10. Share measurements with the IMP plans.

## Required OKLCH migration

The [V5-COLOR plan](V5-COLORS-OKLCH.md), added on 2026-11-06, adopts
canonical OKLCH and h/c/l animation while preserving color manager inputs.
It defines floating-point conversion, alpha, interpolation, gamut mapping,
P3/HDR separation, and explicit HSL animation migration. Complete C0 in E3, C1–C4 in E5, distribution checks in E9 and C5 closure
in E10. Handovers 03/05/07/08 retain technical ownership; E5 coordinates
model, output and consumer migration before performance tuning.

## Legacy support and v4 carryover

[V5-LEG](../REQUIREMENTS.md) covers Vue 2, Nuxt 2, and Nuxt 3 integrations,
deprecated APIs with documented replacements, and browser support under the
agreed age and usage policy. Define scope and browser policy in E0, retire obsolete integrations before
adapting supported consumers in E1, and verify cleanup in E9/E10. Preserve fallbacks needed by supported browsers.

## Source review and optional follow-up

The [2026-11-13 code review](V5-CODE-REVIEW.md) identifies G1–G7 acceptance gaps
and maps them into E1–E8, with final verification in E10. Read it with the owning
handover before implementation. It preserves existing regression coverage and
adds explicit resource, numeric, clock, spatial and sampling contracts.

After E10, [optional E11](V5-11-OPTIONAL-PLUGINS.md) evaluates existing plugin
performance beyond the mandatory migration. Its candidates need profiling;
there are no claimed savings or mandatory new visual plugins.

## Plan status

- [x] Review the critical areas and update planning documentation.
- [x] Prepare handovers 01–10.
- [ ] Complete the baseline and numeric budgets — initial Rollup/consumer/CDN and runtime evidence recorded in [V5-BUNDLE-REPORT.md](V5-BUNDLE-REPORT.md); E0 remains open.
- [ ] Implement and verify E0–E10, covering the full engine and the plugin and browser audits.

Historical test counts in `STATE.md` refer to 4.x sessions. Treat analyses in
`codebase/` and `research/` that have yet to be fully rechecked as historical
references. Revalidate them before adding items to the v5 backlog.
