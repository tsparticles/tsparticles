import { loadMeteorImpactPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMeteorImpactPalette?: typeof loadMeteorImpactPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMeteorImpactPalette = loadMeteorImpactPalette;

export * from "./index.js";
