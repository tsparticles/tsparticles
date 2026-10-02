import { loadExternalRemoveInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalRemoveInteraction?: typeof loadExternalRemoveInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalRemoveInteraction = loadExternalRemoveInteraction;

export * from "./index.js";
