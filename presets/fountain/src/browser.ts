import { loadFountainPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFountainPreset?: typeof loadFountainPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFountainPreset = loadFountainPreset;

export * from "./index.js";
