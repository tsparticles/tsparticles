import { loadExternalRepulseInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalRepulseInteraction?: typeof loadExternalRepulseInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalRepulseInteraction = loadExternalRepulseInteraction;

export * from "./index.js";
