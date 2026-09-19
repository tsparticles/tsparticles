import { loadExternalPopInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalPopInteraction?: typeof loadExternalPopInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalPopInteraction = loadExternalPopInteraction;

export * from "./index.js";
