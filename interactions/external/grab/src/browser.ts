import { loadExternalGrabInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalGrabInteraction?: typeof loadExternalGrabInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalGrabInteraction = loadExternalGrabInteraction;

export * from "./index.js";
