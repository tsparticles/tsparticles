import { loadTetrisPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTetrisPalette?: typeof loadTetrisPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadTetrisPalette = loadTetrisPalette;

export * from "./index.js";
