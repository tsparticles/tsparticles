import { loadExternalPauseInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalPauseInteraction?: typeof loadExternalPauseInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalPauseInteraction = loadExternalPauseInteraction;

export * from "./index.js";
