import { loadPoisonAndVenomPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPoisonAndVenomPalette?: typeof loadPoisonAndVenomPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPoisonAndVenomPalette = loadPoisonAndVenomPalette;

export * from "./index.js";
