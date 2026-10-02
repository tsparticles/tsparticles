import { loadBigCirclesPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBigCirclesPreset?: typeof loadBigCirclesPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBigCirclesPreset = loadBigCirclesPreset;

export * from "./index.js";
