import { loadGrapesPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadGrapesPalette?: typeof loadGrapesPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadGrapesPalette = loadGrapesPalette;

export * from "./index.js";
