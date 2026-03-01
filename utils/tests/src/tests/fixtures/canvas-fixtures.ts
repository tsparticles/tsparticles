// Deterministic canvas fixtures for jsdom/Vitest
// Exports helpers to create a canvas element with deterministic size,
// controlled devicePixelRatio, and a seedable RNG for deterministic tests.

export type CanvasFixtureOptions = {
  width?: number;
  height?: number;
  devicePixelRatio?: number;
  seed?: number;
};

// Simple LCG RNG for deterministic randomness in tests (small, dependency-free)
function makeRng(seed = 123456789) {
  let s = seed >>> 0;
  return function rng() {
    // Constants from Numerical Recipes
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

export function createDeterministicCanvas(opts: CanvasFixtureOptions = {}) {
  const { width = 800, height = 600, devicePixelRatio = 1, seed = 1337 } = opts;

  // Ensure document exists (jsdom)
  if (typeof document === "undefined") {
    throw new Error("createDeterministicCanvas: document is not available in this environment");
  }

  // Prefer OffscreenCanvas if available (node-canvas or mocks), otherwise use HTMLCanvasElement
  let canvas: HTMLCanvasElement | OffscreenCanvas;
  if (typeof OffscreenCanvas !== "undefined") {
    // @ts-ignore - OffscreenCanvas exists in some test environments
    canvas = new OffscreenCanvas(width, height);
  } else {
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
  }

  // Set devicePixelRatio on global for deterministic rendering when consumers read it
  try {
    // Some test runners freeze globals; guard with typeof check
    // @ts-ignore
    globalThis.devicePixelRatio = devicePixelRatio;
  } catch (e) {
    // ignore - some environments disallow writing globals
  }

  const ctx = (canvas as any).getContext ? (canvas as any).getContext("2d") : null;

  const rng = makeRng(seed);

  // Provide a small API to zero the canvas and fill with a deterministic background if needed
  function clear(color = "rgba(0,0,0,0)") {
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  // Returns a lightweight handle used by tests
  return {
    canvas,
    ctx,
    clear,
    rng,
    width,
    height,
    devicePixelRatio,
  };
}

export function setupCanvasFixtures(opts?: CanvasFixtureOptions) {
  // Create a default canvas and attach to document.body so third-party libraries
  // that query the DOM can find it deterministically.
  if (typeof document === "undefined") return null;

  const fixture = createDeterministicCanvas(opts);
  try {
    if (fixture.canvas instanceof HTMLCanvasElement) {
      fixture.canvas.setAttribute("data-test-canvas", "true");
      document.body.appendChild(fixture.canvas);
    }
  } catch (e) {
    // best-effort; some envs disallow DOM mutations
  }

  return fixture;
}

export function teardownCanvasFixtures() {
  if (typeof document === "undefined") return;
  const el = document.querySelector("[data-test-canvas]");
  if (el && el.parentNode) el.parentNode.removeChild(el);
  try {
    // restore devicePixelRatio to 1
    // @ts-ignore
    globalThis.devicePixelRatio = 1;
  } catch (e) {
    // ignore
  }
}

export default { createDeterministicCanvas, setupCanvasFixtures, teardownCanvasFixtures };
