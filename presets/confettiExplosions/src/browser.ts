import { loadConfettiExplosionsPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiExplosionsPreset?: typeof loadConfettiExplosionsPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiExplosionsPreset = loadConfettiExplosionsPreset;

export * from "./index.js";
