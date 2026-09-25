import { loadExternalParallaxInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalParallaxInteraction?: typeof loadExternalParallaxInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalParallaxInteraction = loadExternalParallaxInteraction;

export * from "./index.js";
