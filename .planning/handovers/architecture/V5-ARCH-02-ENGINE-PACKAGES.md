# V5-ARCH-02 — Engine boundaries and possible package split

Status pending evaluation. Owner 03, consumers in 08, distribution in 09, and
release gate in 10. Requires draft ARCH-01/03/04 contracts and the full engine audit.

## Evidence and starting recommendation

`engine/src/` contains runtime, options, extension contracts, utilities, math,
and browser rendering. `engine/package.json` declares `sideEffects: false`,
ESM/CJS/browser entries, and `./lazy`. Bundles and plugins consume the public
root. Preserve intentional type-only exports for core classes. Use actual
dependency graphs to justify npm package boundaries.

Start with internal boundaries and selective facades, then compare subpaths
and separate packages. A split can make dependencies and optional capabilities
explicit. Measure additional manifests, releases, type resolution, and the
risk of duplicate runtime copies alongside any benefit beyond existing tree shaking.

## Alternatives and candidates

Compare one package with internal domains, selective public subpaths, and
separate publishable packages on the same consumer. These are candidate
responsibilities. Package names remain to be decided.

| Candidate            | Condition for extraction                      | Dependencies to resolve                                                          |
| -------------------- | --------------------------------------------- | -------------------------------------------------------------------------------- |
| Pure math/utilities  | Independent use and avoidable retained code   | Separate pure helpers from RNG, logging, DOM, and Container-dependent functions  |
| Extension contracts  | Consumers need only types and stable APIs     | Keep type packages independent of engine and isolate required runtime values     |
| Option normalization | Pipeline usable without container or renderer | Options, ParticlesOptions, and loaders currently receive PluginManager/Container |
| Simulation runtime   | Real use case independent of renderer         | Particle and lifecycle call drawing and rendering. Check ARCH-01/04.             |
| Renderer/browser     | Consumer can omit or replace the capability   | Canvas, Retina, resize, events, resources, and DOM types cross domains           |

A types-only package may leave JS size unchanged. Measure declaration and
maintenance costs and benefits. Reserve “headless” for a runtime without
mandatory browser dependencies.

## Proposed dependency graph

Place pure utilities and independent contracts at the base, normalization
and simulation above them, and the browser/rendering adapter above runtime.
An optional `@tsparticles/engine` facade can compose the public API. Keep base
contracts independent of the facade. Add browser resource interfaces only for
real consumers. Keep internal domains and document the constraint if splitting
would require abstractions whose cost outweighs the benefit.

## Evaluation and migration

1. Use the graph from 03 to classify runtime and type-only imports and cycles.
   Record consumers, retained costs, and DOM or service dependencies per candidate.
2. Compare a pure helper, factory, minimal scene, slim/full, and lazy/CDN using
   [IMP-02](../improvements/V5-IMP-02-BUNDLE-GRAPH.md). Record min/gzip/Brotli,
   total chunks, runtime copies, requests, and installation complexity.
3. Choose an internal module, subpath, or package per extraction. Require a real
   consumer, an acyclic graph, and a measured benefit in inclusion, runtime
   separation, or maintenance. State costs and API migration.
4. If adopted, create and link the new structure using the Nx and
   link-workspace-packages skills. Use workspace linking rather than tsconfig
   aliases. Define dependencies/peerDependencies by runtime ownership and
   document versioning, exports, and manifests including `bundles/*/package.dist.json`.
5. Evaluate a selective compatibility facade. Keep engine creation explicit and
   exclude unused capabilities and duplicate per-engine services. Document
   removals and any re-export lifetime.

## Acceptance and deliverables

- Provide a decision for every candidate, including retaining one package.
  Verify boundaries and absence of new runtime cycles and required deep imports.
- For packaging changes, test installed ESM, CJS, browser, and lazy packages
  outside the workspace, including declarations, augmentation, and a custom plugin.
- With two engines and multiple bundles, verify only intended resources are
  shared and avoid duplicate engine code, registries, and services. Test
  incompatible versions and record the chosen version constraints.
- Pass downstream builds and v5 budgets. Report architecture improvements
  separately from measured payload savings, counting every required chunk.

Record the ARCH-02 decision, graph, comparable measurements, approved packages
or subpaths, and import/migration guide. A split remains conditional on evidence.
