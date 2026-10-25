import { loadParticlesLinksInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadParticlesLinksInteraction?: typeof loadParticlesLinksInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadParticlesLinksInteraction = loadParticlesLinksInteraction;

export * from "./index.js";
