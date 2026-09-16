import { loadExternalAttractInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalAttractInteraction?: typeof loadExternalAttractInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalAttractInteraction = loadExternalAttractInteraction;

export * from "./index.js";
