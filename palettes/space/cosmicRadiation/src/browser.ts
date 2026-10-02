import { loadCosmicRadiationPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadCosmicRadiationPalette?: typeof loadCosmicRadiationPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadCosmicRadiationPalette = loadCosmicRadiationPalette;

export * from "./index.js";
