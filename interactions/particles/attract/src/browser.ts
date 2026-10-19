import { loadParticlesAttractInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadParticlesAttractInteraction?: typeof loadParticlesAttractInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadParticlesAttractInteraction = loadParticlesAttractInteraction;

export * from "./index.js";
