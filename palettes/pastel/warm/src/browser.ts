import { loadPastelWarmPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPastelWarmPalette?: typeof loadPastelWarmPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPastelWarmPalette = loadPastelWarmPalette;

export * from "./index.js";
