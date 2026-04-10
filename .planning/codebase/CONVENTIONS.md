# Coding Conventions

**Analysis Date:** 2026-04-10

## Naming Patterns

**Files:**

- Use `PascalCase.ts` for core classes and exported types in source packages (examples: `engine/src/Core/Engine.ts`, `engine/src/Core/Particle.ts`, `engine/src/Options/Classes/Particles/ParticlesOptions.ts`).
- Use descriptive test file names under `utils/tests/src/tests/`, with both `PascalCase.ts` and `camelCase.test.ts` patterns (examples: `utils/tests/src/tests/Particle.ts`, `utils/tests/src/tests/memoize.test.ts`, `utils/tests/src/tests/deepExtend.test.ts`).
- Use `index.ts` and explicit barrel files for package surfaces (examples: `engine/src/index.ts`, `engine/src/exports.ts`, `engine/src/export-types.ts`).

**Functions:**

- Use `camelCase` for functions and methods (examples: `getDataFromUrl` in `engine/src/Core/Engine.ts`, `loadEffectData` in `engine/src/Core/Particle.ts`, `safeIntersectionObserver` in `engine/src/Utils/Utils.ts`).
- Use `safe*` prefixes for environment-guarded helpers (examples: `safeDocument`, `safeMatchMedia`, `safeMutationObserver` in `engine/src/Utils/Utils.ts`).

**Variables:**

- Use `camelCase` for locals and parameters (examples: `domContainer`, `canvasEl` in `engine/src/Core/Engine.ts`).
- Use grouped `const` declarations for related values (examples: `const width = 1920, height = 1080;` in `utils/tests/src/tests/Particle.ts`; multi-binding constants in `engine/src/Utils/Utils.ts`).

**Types:**

- Use `I*` interface naming for option/model contracts (examples: `IOptions` in `engine/src/Options/Interfaces/IOptions.ts`, `IParticlesOptions` in `engine/src/Options/Interfaces/Particles/IParticlesOptions.ts`).
- Use `PascalCase` aliases for exported utility types (examples: `RecursivePartial`, `SingleOrMultiple` re-exported via `engine/src/export-types.ts`).

## Code Style

**Formatting:**

- Use Prettier via shared config `@tsparticles/prettier-config` declared in package manifests (examples: root `package.json`, `engine/package.json`, `utils/tests/package.json`).
- Keep trailing commas and stable multiline wrapping as produced by Prettier in TypeScript sources (visible in `engine/src/Core/Engine.ts` and `engine/src/Utils/Utils.ts`).

**Linting:**

- Use ESLint flat config with shared preset `@tsparticles/eslint-config` (examples: `engine/eslint.config.js`, `utils/tests/eslint.config.js`).
- Use targeted inline disables only when needed for interoperability/hot code paths/tests (examples: `/* eslint-disable no-console */` in `engine/src/Utils/LogUtils.ts`; rule disables in `utils/tests/src/tests/ColorUtils.ts`).

## Import Organization

**Order:**

1. Internal/runtime imports first, grouped by domain and often sorted semantically (example: `engine/src/Core/Engine.ts`, `engine/src/Core/Particle.ts`).
2. Type-only imports using `import type` for interfaces/types (examples throughout `engine/src/**`, such as `engine/src/Options/Classes/Particles/ParticlesOptions.ts`).
3. Test files usually import project symbols first, then Vitest and fixtures (example: `utils/tests/src/tests/Particle.ts`).

**Path Aliases:**

- Use workspace package imports for cross-package usage (examples: `@tsparticles/engine` in `utils/tests/src/tests/Utils.ts`, `@tsparticles/plugin-hex-color` in `utils/tests/src/tests/ColorUtils.ts`).
- Use relative paths with explicit `.js` extension inside package source (examples: `engine/src/Core/Engine.ts`, `engine/src/exports.ts`).
- TypeScript `baseUrl`/`paths` aliases are not configured in active tsconfig files (`tsconfig.json` contains commented placeholders only).

## Error Handling

**Patterns:**

- Throw `Error` for invariant violations that should fail fast (examples: version mismatch in `engine/src/Core/Engine.ts`, invalid registration timing in `engine/src/Core/Utils/PluginManager.ts`, impossible particle position in `engine/src/Core/Particle.ts`).
- Return `undefined` for optional/unsupported/absent values instead of throwing in utility helpers (examples: `safeMatchMedia`, `safeIntersectionObserver`, `safeMutationObserver` in `engine/src/Utils/Utils.ts`; fallbacks in `getDataFromUrl` in `engine/src/Core/Engine.ts`).
- In tests, explicitly guard setup assumptions with immediate errors (examples: `throw new Error("test container not initialized")` in `utils/tests/src/tests/Particle.ts`).

## Logging

**Framework:** `console` wrapped by logger helpers

**Patterns:**

- Route runtime logging through `getLogger()`/`setLogger()` abstraction in `engine/src/Utils/LogUtils.ts` rather than ad hoc console calls.
- Prefix runtime errors with `tsParticles - Error` through logger adapter (`engine/src/Utils/LogUtils.ts`).
- Keep direct `console.*` mostly constrained to logger implementation and a few diagnostic tests (`utils/tests/src/tests/Utils.ts`, `utils/tests/src/tests/ColorUtils.ts`).

## Comments

**When to Comment:**

- Use JSDoc on public APIs, classes, and helper functions (examples: `Engine` class and methods in `engine/src/Core/Engine.ts`, `memoize` in `engine/src/Utils/Utils.ts`).
- Use inline comments to explain compatibility constraints or test/runtime caveats (examples: cache eviction note in `engine/src/Utils/Utils.ts`, Node canvas note in `utils/tests/src/tests/Particles.ts`).

**JSDoc/TSDoc:**

- Use TSDoc-style tags (`@param`, `@returns`, `@internal`) and include references (examples: `engine/src/Core/Engine.ts`, `engine/src/Core/Particle.ts`, `engine/src/Options/Interfaces/IOptions.ts`).
- Keep interface fields documented individually in options contracts (`engine/src/Options/Interfaces/IOptions.ts`).

## Function Design

**Size:**

- Prefer small-to-medium focused helpers for transforms/utilities (examples: `isInArray`, `arrayRandomIndex` in `engine/src/Utils/Utils.ts`).
- Allow larger orchestration methods for engine lifecycle/loading while keeping helper extraction for repeated logic (example: `load` in `engine/src/Core/Engine.ts` with `getDataFromUrl`, `getDomContainer`, `getCanvasFromContainer`).

**Parameters:**

- Use typed parameter objects for multi-argument operations (examples: `ILoadParams` usage in `engine/src/Core/Engine.ts`, `FixOutModeParams` in `engine/src/Core/Particle.ts`).
- Use optional parameters with explicit defaults where behavior is stable (examples: `refresh(refresh = true)` in `engine/src/Core/Engine.ts`, `itemFromArray(..., useIndex = true)` in `engine/src/Utils/Utils.ts`).

**Return Values:**

- Return explicit unioned optional types for non-guaranteed results (examples: `Promise<Container | undefined>` in `engine/src/Core/Engine.ts`, `MediaQueryList | undefined` in `engine/src/Utils/Utils.ts`).
- In tests, use early returns after `expect` guard clauses when values may be undefined (example: `utils/tests/src/tests/Particle.ts`).

## Module Design

**Exports:**

- Use central barrel files to define public runtime/type API surfaces (`engine/src/exports.ts`, `engine/src/export-types.ts`, `engine/src/index.ts`).
- Keep package internals organized by domain directories (`Core`, `Options`, `Enums`, `Utils`, `Types` under `engine/src/`).

**Barrel Files:**

- Use dedicated runtime and type barrels instead of a single mixed export file (`engine/src/exports.ts` for values, `engine/src/export-types.ts` for types).
- Re-export package singleton entry (`tsParticles`) through `engine/src/index.ts` after initialization binding to `globalThis`.

---

_Convention analysis: 2026-04-10_
