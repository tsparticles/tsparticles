# tsParticles v5 execution plan

Initial plan dated 2026-11-03. Use the dedicated branch `v5`. The
2026-11-08 merge `e9c7a7378d` includes v4 tip `5aba15652a` and carries
package version `4.5.3`. Status **planned, with major runtime implementation
and a clean measurement baseline pending**. The original `4.5.1`
reconnaissance and later `4.5.2` architecture and color review are historical.

## Goals and sequence

Remove the `tsParticles` singleton, support independent engines, and move random
and logger customization into each engine. Reduce the code shipped to consumers
and organize the core into domain folders with small public entrypoints.
**Review all of `engine/src/`**, including ParticlesManager, Particle,
Engine/PluginManager, Retina, events, utilities, options, types, and entrypoints.
Every area requires review. Measurements and contracts should justify any rewrite.
Explicitly audit all plugins and browser/CDN distribution without the singleton.
Document intentional breaking changes and provide migration paths for this major release.

| Order | Handover                                                          | Dependency                                  | Outcome                                                     |
| ----- | ----------------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------- |
| 1     | [Explicit engines](V5-01-ENGINE-INSTANCES.md)                     | Preliminary baseline                        | Explicit instances and working consumers and browser builds |
| 2     | [Random and logger](V5-02-ENGINE-SERVICES.md)                     | 01                                          | Services isolated per engine                                |
| 3     | [Core boundaries and full engine audit](V5-03-CORE-BOUNDARIES.md) | 02                                          | Complete inventory, entrypoints, and responsibilities       |
| 4     | [Container](V5-04-CONTAINER.md)                                   | 03                                          | Lifecycle review                                            |
| 5     | [Canvas and rendering](V5-05-CANVAS-RENDERING.md)                 | 04                                          | Canvas and rendering review                                 |
| 6     | [ParticlesManager](V5-06-PARTICLES-MANAGER.md)                    | 05                                          | Collection, pool, update, and grid review                   |
| 7     | [Particle](V5-07-PARTICLE.md)                                     | 06                                          | Particle state, initialization, and Retina review           |
| 8     | [Plugin impact](V5-08-PLUGIN-IMPACT.md)                           | Initial audit in 01/02, completion after 07 | Verified compatibility for each package                     |
| 9     | [Browser, CDN, and legacy support](V5-09-BROWSER-BUNDLES.md)      | Initial contract in 01, completion after 08 | Bootstrap and composition without a singleton               |
| 10    | [v5 release gates](V5-10-SIZE-MIGRATION-RELEASE.md)               | 01–09                                       | Budgets, integration, and migration                         |

Follow the sequence because the first three handovers change shared contracts and
imports. Each handover defines ownership, tests, and evidence. Complete each later
step independently before marking it done. Agents must read `AGENTS.md`, this index,
and their handover before editing source. Preserve other contributors' changes and
record files, decisions, commands, and results. Commits, publishing, and releases
require separate authorization.

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

Capture the baseline at the start of 01, before refactoring. In
`V5-BUNDLE-REPORT.md`, record the starting commit, working-tree diff, Node and pnpm
versions, build commands, formats, and measurements. Build fresh artifacts for
the verified baseline. Use the same toolchain, minifier, and compression settings.

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:48e33223d4af4463d81ff82bbe13ab8dd138c879ac57b98059f9152826f890f6 -->

| Scenario                  | Include                                                                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Import a pure helper      | Consumer bundle for one function without engine or DOM                                                                                          |
| Acquire the singleton     | Existing consumer measurement importing and re-exporting `tsParticles` from `@tsparticles/engine`; record separately with its measured revision |
| Acquire a factory engine  | Unavailable until `@tsparticles/engine` exports `createEngine()`; no buildable factory baseline exists yet                                      |
| Minimal scene             | Engine and only the required loaders, using identical options                                                                                   |
| Basic / slim / full / all | Supported minified distribution bundles                                                                                                         |
| Lazy/CDN                  | Entry and every chunk needed to start the same scene                                                                                            |

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

Draft contracts in 03 before refactoring in 04–07. Verify state and
responsibilities in 06/07, extension migration in 08, packaging in 09, and
the decision log in 10. Share measurements with the IMP plans.

## Required OKLCH migration

The [V5-COLOR plan](V5-COLORS-OKLCH.md), added on 2026-11-06, adopts
canonical OKLCH and h/c/l animation while preserving color manager inputs.
It defines floating-point conversion, alpha, interpolation, gamut mapping,
P3/HDR separation, and explicit HSL animation migration. Complete C0–C5
within 03/05/07/08/09/10. Set contracts before rendering, integrate an
end-to-end path in 05, review Particle in 07, complete consumers in 08,
verify distribution in 09, and close the gate in 10.

## Legacy support and v4 carryover

[V5-LEG](../REQUIREMENTS.md) covers Vue 2, Nuxt 2, and Nuxt 3 integrations,
deprecated APIs with documented replacements, and browser support under the
agreed age and usage policy. Define and verify the scope in 09 and close it
in 10. Preserve fallbacks needed by supported browsers.

The [v4 review](../v4-review/README.md) is a separate patch-first plan.
Reuse relevant regression fixtures as they become available. Recheck each
finding on the implementation commit and preserve the v4 review's provenance.

## Plan status

- [x] Review the critical areas and update planning documentation.
- [x] Prepare handovers 01–10.
- [ ] Capture the bundle baseline and numeric budgets.
- [ ] Implement and verify 01–10, covering the full engine and the plugin and browser audits.

Historical test counts in `STATE.md` refer to 4.x sessions. Treat analyses in
`codebase/` and `research/` that have yet to be fully rechecked as historical
references. Revalidate them before adding items to the v5 backlog.
