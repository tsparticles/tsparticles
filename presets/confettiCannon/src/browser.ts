import { loadConfettiCannonPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiCannonPreset?: typeof loadConfettiCannonPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiCannonPreset = loadConfettiCannonPreset;

export * from "./index.js";
