import { loadMonochromeRedsPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromeRedsPalette?: typeof loadMonochromeRedsPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromeRedsPalette = loadMonochromeRedsPalette;

export * from "./index.js";
