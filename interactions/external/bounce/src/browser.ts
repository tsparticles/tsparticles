import { loadExternalBounceInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalBounceInteraction?: typeof loadExternalBounceInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalBounceInteraction = loadExternalBounceInteraction;

export * from "./index.js";
