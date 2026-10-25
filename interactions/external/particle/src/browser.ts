import { loadExternalParticleInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalParticleInteraction?: typeof loadExternalParticleInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalParticleInteraction = loadExternalParticleInteraction;

export * from "./index.js";
