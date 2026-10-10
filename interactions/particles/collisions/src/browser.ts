import { loadParticlesCollisionsInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadParticlesCollisionsInteraction?: typeof loadParticlesCollisionsInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadParticlesCollisionsInteraction = loadParticlesCollisionsInteraction;

export * from "./index.js";
