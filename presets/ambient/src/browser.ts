import { loadAmbientPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAmbientPreset?: typeof loadAmbientPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadAmbientPreset = loadAmbientPreset;

export * from "./index.js";
