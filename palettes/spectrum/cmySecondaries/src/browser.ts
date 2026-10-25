import { loadCmySecondariesPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadCmySecondariesPalette?: typeof loadCmySecondariesPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadCmySecondariesPalette = loadCmySecondariesPalette;

export * from "./index.js";
