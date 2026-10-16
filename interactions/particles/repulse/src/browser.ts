import { loadParticlesRepulseInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadParticlesRepulseInteraction?: typeof loadParticlesRepulseInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadParticlesRepulseInteraction = loadParticlesRepulseInteraction;

export * from "./index.js";
