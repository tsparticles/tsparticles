import { loadFirefliesPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFirefliesPalette?: typeof loadFirefliesPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFirefliesPalette = loadFirefliesPalette;

export * from "./index.js";
