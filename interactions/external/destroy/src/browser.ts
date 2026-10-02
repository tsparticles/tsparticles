import { loadExternalDestroyInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalDestroyInteraction?: typeof loadExternalDestroyInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalDestroyInteraction = loadExternalDestroyInteraction;

export * from "./index.js";
