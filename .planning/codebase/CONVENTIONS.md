# Coding Conventions

**Analysis Date:** 2026-02-17

## Naming Patterns

**Files:**

- PascalCase for classes and interfaces: `SizeUpdater.ts`, `CircleDrawer.ts`, `ParticlesOptions.ts`
- PascalCase for enum files: `EasingType.ts`, `EventType.ts`
- PascalCase for utility files: `TypeUtils.ts`, `MathUtils.ts`, `LogUtils.ts`, `ColorUtils.ts`
- PascalCase for constants files: `Constants.ts`
- Lowercase `index.ts` for barrel/entry files
- Lowercase for config files: `eslint.config.js`, `webpack.config.js`, `vitest.config.ts`

**Functions:**

- camelCase for all functions: `loadSizeUpdater`, `getRandom`, `clamp`, `getLogger`
- Async plugin loaders prefixed with `load`: `loadSizeUpdater()`, `loadCircleShape()`, `loadHexColorPlugin()`
- Type guards prefixed with `is`: `isNull()`, `isBoolean()`, `isString()`, `isNumber()`, `isArray()`, `isObject()`, `isFunction()`
- Getters/setters use standard `get`/`set` keyword syntax

**Variables:**

- camelCase for all variables and parameters
- Private class fields prefixed with `_`: `_container`, `_engine`, `_initialized`, `_duration`
- Named constants in camelCase: `half = 0.5`, `double = 2`, `percentDenominator = 100`, `millisecondsToSeconds = 1000`
- NO raw numeric literals allowed (ESLint `@typescript-eslint/no-magic-numbers` enforced)

**Types/Interfaces:**

- PascalCase for types and interfaces: `IParticle`, `IOptionLoader`, `RecursivePartial`
- Interfaces prefixed with `I`: `IPlugin`, `IShapeDrawer`, `IParticleUpdater`, `IOptionLoader`
- Type aliases without prefix: `SingleOrMultiple<T>`, `RangeValue`
- Enums in PascalCase with camelCase members having kebab-case string values:
  ```typescript
  // engine/src/Enums/Types/EasingType.ts
  enum EasingType {
    easeInBack = "ease-in-back",
    easeOutQuad = "ease-out-quad",
  }
  ```

**Packages:**

- npm scope `@tsparticles/`: `@tsparticles/engine`, `@tsparticles/updater-size`, `@tsparticles/shape-circle`
- Package names follow pattern: `@tsparticles/{category}-{name}` (e.g., `updater-size`, `shape-circle`, `plugin-emitters`)

## Code Style

**Formatting:**

- Prettier via `@tsparticles/prettier-config` (shared config package at `utils/configs/prettier/`)
- Config extends from shared: `"prettier": "@tsparticles/prettier-config"` in `package.json`
- Tab width: 4 spaces (configured in shared prettier config)
- Print width: 120
- Trailing commas: all
- Semicolons: always

**Linting:**

- ESLint via `@tsparticles/eslint-config` (shared config package at `utils/configs/eslint/`)
- Each package has `eslint.config.js` that imports shared config:
  ```javascript
  // engine/eslint.config.js
  import config from "@tsparticles/eslint-config";
  export default config;
  ```
- Key enforced rules:
  - `@typescript-eslint/no-magic-numbers` - No raw numeric literals; extract to named constants
  - `@typescript-eslint/no-unused-expressions` - No side-effect-only expressions
  - Strict TypeScript checking enabled

**Comma-separated declarations:**

- The codebase extensively uses comma-separated `const` declarations:
  ```typescript
  const half = 0.5,
    double = 2,
    maxRgb = 255;
  ```

## Import Organization

**Order:**

1. External package imports (`@tsparticles/engine`, third-party libs)
2. Relative imports from parent/sibling directories
3. Type-only imports separated with `type` keyword

**Path Extensions:**

- ALWAYS use `.js` extensions in import paths, even for TypeScript files (ESM convention):
  ```typescript
  import { Container } from "./Core/Container.js";
  import type { IParticle } from "./Core/Interfaces/IParticle.js";
  ```

**Type Imports:**

- Use `type` keyword in import specifiers:
  ```typescript
  import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
  import { type IColor, isNull } from "@tsparticles/engine";
  ```

**Export Organization:**

- Barrel files (`index.ts`) separate type exports from value exports:

  ```typescript
  // engine/src/export-types.ts
  export type * from "./Options/Interfaces/IOptions.js";

  // engine/src/exports.ts
  export * from "./Core/Engine.js";
  ```

- Entry `index.ts` re-exports from `exports.ts` and `export-types.ts`

**Path Aliases:**

- None used. All imports are relative paths or package names.

## Error Handling

**Patterns:**

- Throw `Error` with descriptive template literal messages:
  ```typescript
  throw new Error(`${errorPrefix} version ${version} does not match`);
  ```
- Non-fatal errors use logger:
  ```typescript
  // engine/src/Utils/LogUtils.ts
  getLogger().error("something went wrong", error);
  getLogger().warning("deprecation notice");
  ```
- Null checks use custom type guard `isNull()` from `engine/src/Utils/TypeUtils.ts` (NOT `=== null` or `=== undefined`):
  ```typescript
  if (isNull(data)) {
    return;
  }
  ```
- Early return pattern for null/invalid inputs (guard clauses)
- Version checking at plugin registration:
  ```typescript
  await engine.checkVersion(tsParticlesVersion);
  ```

## Logging

**Framework:** Custom logger abstraction in `engine/src/Utils/LogUtils.ts`

**Patterns:**

- Access via `getLogger()` function
- Levels: `error`, `warning`, `log`, `verbose`
- Use for non-fatal issues, deprecation warnings, debug info
- Never use `console.log` directly in production code (tests may disable this rule)

## Comments

**When to Comment:**

- JSDoc on all exported functions, classes, interfaces, and type aliases
- Inline comments for complex logic or non-obvious calculations

**JSDoc Style:**

- Minimal but present:
  ```typescript
  /**
   * Loads the size updater for the given engine.
   * @param engine - The tsParticles engine instance.
   * @param refresh - Whether to refresh the engine after loading.
   */
  export async function loadSizeUpdater(engine: Engine, refresh = true): Promise<void> {
  ```
- Parameter descriptions often minimal: `@param name -` (dash only)
- `@returns` tag used when return value is non-obvious

## Function Design

**Size:** Functions tend to be focused and short (10-30 lines typical). Large switch statements are acceptable for option parsing.

**Parameters:**

- Use default parameter values: `refresh = true`
- Use `RecursivePartial<T>` for optional deep configuration objects
- Engine is always passed as first parameter to plugin loaders

**Return Values:**

- Plugin loaders return `Promise<void>`
- Type guards return `value is Type` (type predicate)
- Factory functions return the created instance

## Module Design

**Exports:**

- Each package exports via `src/index.ts` barrel file
- Public API is explicitly exported; internal implementation stays unexported
- Separate `export type *` from `export *` for type-only exports

**Barrel Files:**

- Every package has `src/index.ts` as the single entry point
- Engine splits exports across `exports.ts` and `export-types.ts` for organization

## Key Design Patterns

**IOptionLoader Pattern:**

- All option classes implement `IOptionLoader<T>` interface from `engine/src/Options/Interfaces/IOptionLoader.ts`
- Must have a `load(data?: RecursivePartial<T>)` method:
  ```typescript
  // engine/src/Options/Classes/Particles/ParticlesOptions.ts
  load(data?: RecursivePartial<IParticlesOptions>): void {
      if (isNull(data)) {
          return;
      }
      // ... load each sub-option
      this.size.load(data.size);
  }
  ```

**Plugin Registration Pattern:**

- Each plugin exports an async `load*` function:
  ```typescript
  // updaters/size/src/index.ts
  export async function loadSizeUpdater(engine: Engine, refresh = true): Promise<void> {
    checkVersion(engine, __VERSION__);
    await engine.addParticleUpdater(updaterName, async () => new SizeUpdater(), refresh);
  }
  ```
- Plugins are registered via engine methods: `addParticleUpdater`, `addShape`, `addPlugin`, `addInteractor`, `addMover`, `addPathGenerator`

**Bundle Aggregation Pattern:**

- Bundles aggregate multiple plugins:
  ```typescript
  // bundles/slim/src/bundle.ts
  export async function loadSlim(engine: Engine, refresh = true): Promise<void> {
    await loadParallel(
      [
        () => import("@tsparticles/updater-size"),
        () => import("@tsparticles/shape-circle"),
        // ... more imports
      ],
      engine,
      refresh,
    );
  }
  ```

**Lazy Dynamic Imports:**

- Use `import()` inside registration callbacks for code-splitting
- Bundle loaders use `loadParallel()` helper with dynamic import arrays

**Constants Pattern:**

- All numeric literals extracted to named constants in `Constants.ts`:
  ```typescript
  // engine/src/Core/Utils/Constants.ts
  export const half = 0.5;
  export const double = 2;
  export const percentDenominator = 100;
  export const millisecondsToSeconds = 1000;
  ```
- Import constants where needed rather than using magic numbers

**Version Checking:**

- All plugins call `checkVersion(engine, __VERSION__)` at load time
- `__VERSION__` is a build-time injected constant (from `package.json` version)
- Ensures plugin version compatibility with engine

---

_Convention analysis: 2026-02-17_
