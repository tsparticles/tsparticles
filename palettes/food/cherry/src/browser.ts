import { loadCherryPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadCherryPalette?: typeof loadCherryPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadCherryPalette = loadCherryPalette;

export * from "./index.js";
