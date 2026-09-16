import { loadSmokeWarmPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSmokeWarmPalette?: typeof loadSmokeWarmPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSmokeWarmPalette = loadSmokeWarmPalette;

export * from "./index.js";
