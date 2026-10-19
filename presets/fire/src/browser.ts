import { loadFirePreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFirePreset?: typeof loadFirePreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFirePreset = loadFirePreset;

export * from "./index.js";
