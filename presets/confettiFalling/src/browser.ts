import { loadConfettiFallingPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiFallingPreset?: typeof loadConfettiFallingPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiFallingPreset = loadConfettiFallingPreset;

export * from "./index.js";
