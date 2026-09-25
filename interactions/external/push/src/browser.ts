import { loadExternalPushInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalPushInteraction?: typeof loadExternalPushInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalPushInteraction = loadExternalPushInteraction;

export * from "./index.js";
