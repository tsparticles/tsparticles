import { loadBerriesPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBerriesPalette?: typeof loadBerriesPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBerriesPalette = loadBerriesPalette;

export * from "./index.js";
