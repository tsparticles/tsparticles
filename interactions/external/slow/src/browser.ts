import { loadExternalSlowInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalSlowInteraction?: typeof loadExternalSlowInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalSlowInteraction = loadExternalSlowInteraction;

export * from "./index.js";
