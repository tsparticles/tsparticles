import { loadExternalTrailInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalTrailInteraction?: typeof loadExternalTrailInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalTrailInteraction = loadExternalTrailInteraction;

export * from "./index.js";
