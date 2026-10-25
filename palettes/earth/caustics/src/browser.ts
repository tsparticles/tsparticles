import { loadCausticsPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadCausticsPalette?: typeof loadCausticsPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadCausticsPalette = loadCausticsPalette;

export * from "./index.js";
