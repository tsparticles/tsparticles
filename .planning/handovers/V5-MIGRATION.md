# V5 migration guide — implementation draft

Status: E0 preparation. The APIs below describe the agreed target, not exports
available in the current 4.6.0 checkout. Do not publish these instructions as a
completed v5 release guide until installed-consumer checks pass in E1/E9/E10.

## Engine ownership

Replace imports of the `tsParticles` singleton with `createEngine()` once E1
lands. Keep the returned instance in application scope, pass it to each loader
and supply it explicitly to wrappers/providers. A local variable may still be
called `tsParticles`. Component teardown owns its container; it must not destroy
unrelated containers using the same engine. Exact wrapper signatures and the
CDN bootstrap namespace remain pending implementation and tests.

Random/logger customization moves onto that instance in E2. Until then, factory
creation alone must not be described as complete runtime isolation.

## Retired framework integrations

| Integration                                 | Migration destination                                  | Removal / verification |
| ------------------------------------------- | ------------------------------------------------------ | ---------------------- |
| Vue 2 wrapper, demo and starter references  | Upgrade application to Vue 3 and `@tsparticles/vue3`   | E1 / E9                |
| Nuxt 2 wrapper, demo and starter references | Upgrade application to Nuxt 4 and `@tsparticles/nuxt4` | E1 / E9                |
| Nuxt 3 wrapper, demo and starter references | Upgrade application to Nuxt 4 and `@tsparticles/nuxt4` | E1 / E9                |

Framework upgrades are application migrations, not drop-in package renames.
The E0 reference search is in `evidence/e0/retirement-references.txt`; inspect
installers, generated strings, documentation and translations during removal.
The matrix includes retained consumers that require explicit engines as well.

## Deprecated APIs

The E0 TypeScript source scan of engine/extensions/wrappers/runtime utilities
found `applyPolyfills()` marked deprecated in the generated Stencil loader
declaration. That declaration does not document a replacement. Do not infer
an engine API removal from this marker: inspect the Stencil generation contract
in E1/E9. No `@deprecated` marker was found in `engine/src` by this scan.
This is scan evidence, not a claim that all compatibility aliases are unnecessary.

## Color, options and public contracts

Canonical OKLCH and h/c/l animation migration is mandatory in E5. Final examples,
legacy HSL animation conversion, custom color manager changes, gamut/alpha/HDR
behavior and any intentional option/API removals will be documented with their
implementation. The current runtime has not been migrated.
