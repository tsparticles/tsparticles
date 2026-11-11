# V5-01 — Remove the singleton and make engines explicit

Status pending. Read `README.md` and capture its bundle baseline first.
**First v5 runtime change.**

## Ownership

`engine/src/{index.ts,index.lazy.ts,browser.ts,initEngine.ts}`, `Core/Engine.ts`,
public exports and engine manifests, browser and lazy entrypoints for bundles and
features, `cli/utils/{rollup-plugin,rolldown-plugin,webpack-config}/`, and the
wrappers, demos, templates, generators, and MCP-generated code that import the
instance. Include related tests. Use `rg` to find consumers beyond this list.
Preserve other agents' changes and leave core restructuring to later handovers.

## Work

1. Capture the baseline and consumer/entrypoint matrix. Search for `tsParticles`,
   `initEngine`, `__tsParticlesInternals`, and engine imports in templates and
   code generation strings as well as source.
2. Expose `createEngine(): Engine`. Always return a new instance without global
   lookup, DOM access, or plugin loading. Remove the internal `initEngine` factory
   if it is no longer needed and retire its singleton behavior.
3. Remove the instance export, the global `var tsParticles: Engine` declaration,
   and global reuse. Update comments that describe Engine as a singleton.
   Keep the class type-only if the factory is sufficient.
4. Update `.`, `./lazy`, `browser` conditions, import/require, and dist manifests.
   Keep standard modules pure and provide explicit CDN bootstrap with a
   factory/loader namespace. Document the namespace in the report and use it in
   examples and generators. Check `sideEffects` against dedicated entrypoint behavior.
5. Verify CDN plugin wiring. The `__tsParticlesInternals` registry must avoid
   retaining a default engine or shared customized services. Separate reusable
   module definitions from mutable per-engine registries. Test two bundle scripts
   and multiple engines on the same page with explicit creation.
6. Migrate wrappers/providers to an explicit engine supplied through a prop,
   provider, or DI service as appropriate. Applications can choose to share an
   engine among components. Avoid replacing the singleton with a module instance.
   Component cleanup destroys its container and respects other consumers' resources.
7. Migrate convenience bundles (`confetti`, `fireworks`, `particles`, `ribbons`,
   `pjs`) to an explicit engine API or a per-instance factory. Keep imports free of
   hidden engine creation. Document the chosen signature and keep common usage simple.
8. Align CLI/create, templates, MCP code generation, demos, affected READMEs, and
   tests. Use the prescribed workspace commands for any new dependencies.
9. Record breaking changes in the relevant changelogs. Version bumps and
   publishing belong to the release process.

## Early plugin audit and browser contract

Start the inventories from 08 and 09 before migrating APIs. Passing an Engine to
loaders appears common, but verify module state, augmentations, and runtime
services too. Fix incompatibilities with singleton removal here. Handover 08
completes the audit after core refactoring.

Set the minimum browser contract here, including namespace, factory, loader,
standalone scripts and external engine scripts, versions, and script order.
Verify IIFE policies and external resolution. Handover 09 refines distribution,
deduplication, and lazy loading on final artifacts.

## Acceptance tests

- Two factory calls yield distinct engines with independent items, events,
  plugins, presets/configuration, and initialization. The same loader works on both.
- Concurrent initialization on one engine runs each loader once. Loaders on
  separate engines proceed independently without shared promises or flags.
- Destroying or refreshing A leaves B unaffected. Test with distinct canvases
  first. Define and test rejection or ownership for the same canvas and prevent
  two engines from controlling it.
- Importing ESM, CJS, or the browser condition without `window` or `document`
  creates no engine and writes no globals. Verify the publishable package too.
- Check active consumers and generated code for imports of the old instance.
  Distinguish application-local names from an exported singleton.
- Test wrappers with two providers using different engines, remount, prop reload,
  optional themes, and SSR where supported. Smoke-test convenience bundles and code generation.
- Consumer builds and suites pass, with an initial before/after guide attached.

## Deliverables

Update `V5-BUNDLE-REPORT.md`, the migration matrix, and index status. Include commands,
results, and reproducible issues. Record that random and logging remain shared
until 02 is complete. The checkout must build and consumers must work.

## Performance and size plans

See [V5-IMP-01-MEASUREMENT](improvements/V5-IMP-01-MEASUREMENT.md) and [V5-IMP-02-BUNDLE-GRAPH](improvements/V5-IMP-02-BUNDLE-GRAPH.md).
Record assigned outcomes as specified in the [improvement plan](V5-IMPROVEMENTS.md).
