import { loadExternalCannonInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalCannonInteraction?: typeof loadExternalCannonInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalCannonInteraction = loadExternalCannonInteraction;

export * from "./index.js";
