# Testing Patterns

**Analysis Date:** 2026-04-10

## Test Framework

**Runner:**

- Vitest `^4.1.2` (declared in `utils/tests/package.json`)
- Config: `utils/tests/vitest.config.ts`

**Assertion Library:**

- Vitest `expect` API with Chai-style matchers (`to.be`, `to.eql`, `to.include`) used in files like `utils/tests/src/tests/Particle.ts` and `utils/tests/src/tests/Utils.ts`

**Run Commands:**

```bash
pnpm exec vitest                              # Run all workspace tests
pnpm --filter @tsparticles/tests test:ui      # Watch mode/UI for test package
pnpm --filter @tsparticles/tests test:ci       # CI run with NODE_ENV=test
```

## Test File Organization

**Location:**

- Primary tests are in `utils/tests/src/tests/` (separate test package, not co-located with engine source).

**Naming:**

- Use both `PascalCase.ts` suite files (examples: `utils/tests/src/tests/Particle.ts`, `utils/tests/src/tests/Options.ts`) and focused `*.test.ts` files for utility-level coverage (examples: `utils/tests/src/tests/memoize.test.ts`, `utils/tests/src/tests/deepExtend.test.ts`).

**Structure:**

```
utils/tests/
├── vitest.config.ts
└── src/
    ├── Fixture/          # test environment helpers (jsdom/canvas/particle builders)
    └── tests/            # test suites
```

## Test Structure

**Suite Organization:**

```typescript
describe("Particle", async () => {
  globalThis.window = TestWindow;

  const container = await tsParticles.load({
    id: "test-particle",
    options: { autoPlay: false },
    element: createCustomCanvas(width, height) as any,
  });

  it("should always return the position when specified", () => {
    const particle = container.particles.addParticle(position);
    expect(particle).to.be.not.undefined;
  });
});
```

Pattern source: `utils/tests/src/tests/Particle.ts`

**Patterns:**

- Setup pattern: initialize environment and container at suite scope (examples: `utils/tests/src/tests/Particle.ts`, `utils/tests/src/tests/Particles.ts`, `utils/tests/src/tests/Options.ts`).
- Teardown pattern: reset container state in `afterAll`/`beforeEach` when tests mutate particle config (example: `utils/tests/src/tests/Particle.ts`).
- Assertion pattern: behavior-oriented assertions with explicit property checks (examples: `utils/tests/src/tests/Options.ts`, `utils/tests/src/tests/Utils.ts`).

## Mocking

**Framework:**

- No `vi.mock`/`vi.spyOn` module mocking pattern detected in current tests.
- Environment simulation uses fixtures instead of module mocks.

**Patterns:**

```typescript
globalThis.window = TestWindow;

const canvas = createCustomCanvas(width, height) as any;
const container = await tsParticles.load({
  id: "test-particle",
  options: { autoPlay: false },
  element: canvas,
});
```

Pattern source: `utils/tests/src/tests/Particle.ts`, `utils/tests/src/Fixture/Window.ts`, `utils/tests/src/Fixture/CustomCanvas.ts`

**What to Mock:**

- Mock browser/runtime boundaries with fixtures: window/document via JSDOM (`utils/tests/src/Fixture/Window.ts`) and canvas via `canvas` package (`utils/tests/src/Fixture/CustomCanvas.ts`).
- Load required color plugins explicitly before color utility tests rather than mocking plugin output (`utils/tests/src/tests/ColorUtils.ts`).

**What NOT to Mock:**

- Do not mock core engine behavior for container/particle lifecycle tests; use real `tsParticles.load` and real updates (`utils/tests/src/tests/Particles.ts`, `utils/tests/src/tests/Particle.ts`).

## Fixtures and Factories

**Test Data:**

```typescript
const testWindow = new JSDOM("").window as any;

export function createCustomCanvas(width: number, height: number): Canvas {
  const canvas = createCanvas(width, height),
    augmentCanvas = canvas as any;
  augmentCanvas.offsetWidth = width;
  augmentCanvas.offsetHeight = height;
  augmentCanvas.tagName = "CANVAS";
  augmentCanvas.dataset = {};
  return canvas;
}
```

Pattern source: `utils/tests/src/Fixture/Window.ts`, `utils/tests/src/Fixture/CustomCanvas.ts`

**Location:**

- Shared fixtures live in `utils/tests/src/Fixture/`.

## Coverage

**Requirements:**

- Coverage is enabled in Vitest config with V8 provider (`utils/tests/vitest.config.ts`), no explicit percentage threshold detected.

**View Coverage:**

```bash
pnpm --filter @tsparticles/tests test
```

Coverage output location noted in repo guidance: `utils/tests/coverage/`.

## Test Types

**Unit Tests:**

- Pure utility logic tests for deterministic transforms and helpers (examples: `utils/tests/src/tests/deepExtend.test.ts`, `utils/tests/src/tests/memoize.test.ts`, utility sections in `utils/tests/src/tests/Utils.ts`).

**Integration Tests:**

- Engine integration tests instantiate real containers and verify behavior across options/plugins/particles (examples: `utils/tests/src/tests/Options.ts`, `utils/tests/src/tests/Particle.ts`, `utils/tests/src/tests/Particles.ts`, `utils/tests/src/tests/ColorUtils.ts`).

**E2E Tests:**

- Not detected in this workspace section (no browser automation framework config found in analyzed files).

## Common Patterns

**Async Testing:**

```typescript
const container = await tsParticles.load({
  id: "test",
  options: { autoPlay: false },
});

await container.reset({ particles: { number: { value: 5 } } });
expect(container.particles.count).to.equal(5);
```

Pattern source: `utils/tests/src/tests/Options.ts`, `utils/tests/src/tests/Particles.ts`

**Error Testing:**

```typescript
if (!container) {
  throw new Error("test container not initialized");
}

switch (particle?.shape) {
  // ...cases...
  default:
    throw new Error(`Unexpected shape type "${particle?.shape ?? ""}"`);
}
```

Pattern source: `utils/tests/src/tests/Particle.ts`

---

_Testing analysis: 2026-04-10_
