import { createBrowserEngine } from "@tsparticles/engine";

// Minimal JS runtime copy of the TypeScript initParticlesEngine implementation.
// Kept in src as a .js file so consumers (Vite/dev server/browser) can import it
// directly from node_modules without requiring TS/.astro compilation.

// Add a small runtime trace so dev logs confirm the module was loaded by the browser.
// Consumers can remove this once a proper dist/ build is produced.
console.log("[tsparticles/astro] initParticlesEngine.js loaded");

let initialized = false;
let initPromise = undefined;
let initCallback = undefined;
const engine = createBrowserEngine();

export async function initParticlesEngine(init) {
  console.log("[tsparticles/astro] initParticlesEngine called");

  if (initialized) {
    return;
  }

  if (initPromise) {
    if (initCallback !== init) {
      throw new Error("initParticlesEngine callback must be stable across the app lifecycle.");
    }

    await initPromise;

    return;
  }

  initCallback = init;
  initPromise = (async () => {
    if (init) {
      await init(engine);
    }

    // Some engine builds require an explicit init call to register plugins.
    if (typeof engine.init === "function") {
      await engine.init();
    }

    initialized = true;
  })().catch(error => {
    initPromise = undefined;
    initCallback = undefined;
    initialized = false;

    throw error;
  });

  await initPromise;
}

export function isParticlesEngineInitialized() {
  return initialized;
}

export async function waitForParticlesEngineInitialization() {
  await (initPromise ?? Promise.resolve());
}
