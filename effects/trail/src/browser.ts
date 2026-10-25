import { loadTrailEffect } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTrailEffect?: typeof loadTrailEffect;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadTrailEffect = loadTrailEffect;

export * from "./index.js";
