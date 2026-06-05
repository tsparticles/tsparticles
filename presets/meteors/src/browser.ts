import { loadMeteorsPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMeteorsPreset?: typeof loadMeteorsPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMeteorsPreset = loadMeteorsPreset;

export * from "./index.js";
