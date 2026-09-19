import { loadAcidPairPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAcidPairPalette?: typeof loadAcidPairPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadAcidPairPalette = loadAcidPairPalette;

export * from "./index.js";
