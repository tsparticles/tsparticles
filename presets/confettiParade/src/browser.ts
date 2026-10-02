import { loadConfettiParadePreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiParadePreset?: typeof loadConfettiParadePreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiParadePreset = loadConfettiParadePreset;

export * from "./index.js";
