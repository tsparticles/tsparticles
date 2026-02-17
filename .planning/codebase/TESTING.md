# Testing Patterns

**Analysis Date:** 2026-02-17

## Test Framework

**Runner:**

- Vitest `^4.0.18`
- Config: `utils/tests/vitest.config.ts`
- Environment: `jsdom` (for DOM/Canvas simulation)

**Assertion Library:**

- Vitest built-in with Chai-style assertions (`expect(...).to.be.true`, `expect(...).to.equal(...)`)

**Run Commands:**

```bash
pnpm nx run @tsparticles/tests:test        # Run all tests
pnpm nx run @tsparticles/tests:test --watch # Watch mode (if configured)
```

## Test File Organization

**Location:**

- Centralized in a dedicated test package: `utils/tests/` (`@tsparticles/tests`)
- Tests are NOT co-located with source code; they live in a separate workspace package
- Source code packages do NOT have individual test files

**Naming:**

- Test files use PascalCase matching the module under test: `Particle.ts`, `Particles.ts`, `ColorUtils.ts`
- NO `.test.ts` or `.spec.ts` suffix — plain `.ts` files
- Test entry point: `utils/tests/src/index.ts` imports all test files

**Structure:**

```
utils/tests/
├── vitest.config.ts         # Vitest configuration
├── package.json             # Test package dependencies
├── tsconfig.json            # TypeScript config for tests
└── src/
    ├── index.ts             # Entry: imports all test files
    ├── tests/
    │   ├── Particle.ts      # Particle class tests
    │   ├── Particles.ts     # Particles collection tests
    │   ├── ColorUtils.ts    # Color utility tests
    │   ├── Utils.ts         # General utility tests
    │   ├── Options.ts       # Options loading tests
    │   └── QuadTree.ts      # QuadTree spatial index tests
    └── Fixture/
        ├── CustomCanvas.ts  # Canvas mock using `canvas` npm package
        ├── Window.ts        # JSDOM window mock
        └── Utils.ts         # Test helper utilities
```

## Vitest Configuration

```typescript
// utils/tests/vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    maxWorkers: 1, // Single worker for stability
    coverage: {
      enabled: true,
      provider: "v8", // V8 coverage provider
    },
  },
});
```

## Test Structure

**Suite Organization:**

```typescript
// utils/tests/src/tests/Particle.ts
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { describe, it, expect, afterAll } from "vitest";
import { Container, tsParticles } from "@tsparticles/engine";

describe("Particle", async () => {
  // Top-level async setup
  const customCanvas = new CustomCanvas(1920, 1080);
  globalThis.window = TestWindow;

  // Load required plugins before tests
  await loadHexColorPlugin(tsParticles);
  await loadHslColorPlugin(tsParticles);

  const container = await tsParticles.load({
    id: "test-container",
    options: { autoPlay: false /* ... */ },
    element: customCanvas,
  });

  describe("constructor/initialization", () => {
    it("should create a particle", () => {
      expect(container).to.not.be.undefined;
    });

    it("should have correct default values", () => {
      const particle = container.particles.array[0];
      expect(particle).to.not.be.undefined;
      expect(particle.opacity?.value).to.be.greaterThan(0);
    });
  });

  afterAll(() => {
    container?.destroy();
  });
});
```

**Patterns:**

- Top-level `describe` is `async` to allow `await` during setup
- `eslint-disable` comments at top of file for: `@typescript-eslint/no-magic-numbers`, `@typescript-eslint/no-unused-expressions`, `no-console`
- Setup code runs at the `describe` block level (before `it` blocks)
- Nested `describe` blocks for grouping related assertions
- `it` descriptions use "should..." format: `"should create a particle"`, `"should have correct default values"`

## Test Setup & Teardown

**Container Setup:**

```typescript
// Standard pattern for creating a test container
const customCanvas = new CustomCanvas(1920, 1080);
globalThis.window = TestWindow;

const container = await tsParticles.load({
  id: "test-container",
  options: {
    autoPlay: false,
    particles: {
      number: { value: 100 },
      size: { value: 10 },
      opacity: { value: 1 },
      // ... other particle options
    },
  },
  element: customCanvas,
});
```

**Cleanup:**

```typescript
afterAll(() => {
  container?.destroy();
});
```

**Reset between tests:**

```typescript
beforeEach(() => {
  container?.reset();
});
```

## Mocking

**Framework:** No dedicated mocking library; uses custom fixtures

**Canvas Mocking:**

```typescript
// utils/tests/src/Fixture/CustomCanvas.ts
import { createCanvas } from "canvas"; // npm `canvas` package

// Creates a node-canvas instance that mimics browser Canvas API
// Used as the rendering surface for tsParticles in tests
const customCanvas = new CustomCanvas(1920, 1080);
```

**Window/DOM Mocking:**

```typescript
// utils/tests/src/Fixture/Window.ts
// Uses JSDOM to create a window-like environment
// Assigned to globalThis.window for tests that need DOM APIs
globalThis.window = TestWindow;
```

**What to Mock:**

- Canvas element (required for particle rendering) — use `CustomCanvas` fixture
- Browser `window` object — use `TestWindow` from JSDOM fixture
- NO HTTP mocking or API mocking patterns detected

**What NOT to Mock:**

- The engine itself — tests use real `tsParticles` engine instance
- Plugin loading — tests call real `load*` functions
- Particle calculations — tests verify actual computed values

## Fixtures and Factories

**Test Data:**

```typescript
// Test options are defined inline within describe blocks
const options = {
  autoPlay: false,
  particles: {
    number: { value: 100 },
    size: { value: 10 },
    opacity: { value: 1 },
    color: { value: "#ff0000" },
    move: { enable: true, speed: 1 },
  },
};
```

**Location:**

- `utils/tests/src/Fixture/CustomCanvas.ts` — Canvas rendering surface
- `utils/tests/src/Fixture/Window.ts` — JSDOM window environment
- `utils/tests/src/Fixture/Utils.ts` — Shared test utilities

**Plugin Loading in Tests:**

```typescript
// Color plugins must be manually registered before color-related tests
import { loadHexColorPlugin } from "@tsparticles/plugin-color-hex";
import { loadHslColorPlugin } from "@tsparticles/plugin-color-hsl";
import { loadRgbColorPlugin } from "@tsparticles/plugin-color-rgb";

await loadHexColorPlugin(tsParticles);
await loadHslColorPlugin(tsParticles);
await loadRgbColorPlugin(tsParticles);
```

## Coverage

**Requirements:** No minimum threshold enforced (coverage enabled but no thresholds configured)

**Provider:** V8 (`@vitest/coverage-v8`)

**View Coverage:**

```bash
pnpm nx run @tsparticles/tests:test    # Coverage runs by default (enabled: true)
```

## Test Types

**Unit Tests:**

- Core engine classes: `Particle`, `Particles`, `Container`, `QuadTree`
- Utility functions: `ColorUtils`, `Utils`
- Options loading: `Options`
- All tests exercise real engine behavior (integration-style unit tests)

**Integration Tests:**

- Tests implicitly function as integration tests since they use the real engine with real plugins
- Container creation tests verify the full initialization pipeline
- Color tests verify plugin registration + color parsing end-to-end

**E2E Tests:**

- Not used. No browser-based E2E testing framework detected.

## Common Patterns

**Async Testing:**

```typescript
// Top-level async describe for setup
describe("Feature", async () => {
  const container = await tsParticles.load({
    /* ... */
  });

  it("should work", () => {
    expect(container).to.not.be.undefined;
  });
});
```

**Value Testing:**

```typescript
it("should have correct opacity", () => {
  const particle = container.particles.array[0];
  expect(particle.opacity?.value).to.be.greaterThan(0);
  expect(particle.opacity?.value).to.be.lessThanOrEqual(1);
});
```

**Color Parsing Tests:**

```typescript
// utils/tests/src/tests/ColorUtils.ts
it("should parse hex color", () => {
  const color = rangeColorToHsl({ value: "#ff0000" });
  expect(color).to.not.be.undefined;
  expect(color?.h).to.equal(0);
  expect(color?.s).to.equal(100);
  expect(color?.l).to.equal(50);
});
```

**Options Loading Tests:**

```typescript
// utils/tests/src/tests/Options.ts
it("should load options correctly", () => {
  const options = new Options();
  options.load({
    particles: {
      number: { value: 50 },
    },
  });
  expect(options.particles.number.value).to.equal(50);
});
```

**Assertion Styles Used:**

```typescript
expect(value).to.not.be.undefined; // Existence check
expect(value).to.be.true; // Boolean check
expect(value).to.equal(expected); // Strict equality
expect(value).to.be.greaterThan(0); // Numeric comparison
expect(value).to.be.lessThanOrEqual(1); // Numeric comparison
expect(value).to.include("substring"); // String/array inclusion
expect(array).to.have.length(5); // Collection size
expect(value).to.be.an("object"); // Type check
```

## Adding New Tests

**To add a new test file:**

1. Create a PascalCase `.ts` file in `utils/tests/src/tests/` (e.g., `NewFeature.ts`)
2. Import it in `utils/tests/src/index.ts`
3. Add ESLint disable comments at the top:
   ```typescript
   /* eslint-disable @typescript-eslint/no-magic-numbers */
   /* eslint-disable @typescript-eslint/no-unused-expressions */
   ```
4. Use async `describe` for setup, register required plugins, create container
5. Add `afterAll` cleanup with `container?.destroy()`

**To test a new plugin:**

1. Import and register the plugin in test setup: `await loadMyPlugin(tsParticles);`
2. Create container with options that exercise the plugin
3. Verify particle/container state after initialization

---

_Testing analysis: 2026-02-17_
