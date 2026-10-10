import { loadHolographicShimmerPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadHolographicShimmerPalette?: typeof loadHolographicShimmerPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadHolographicShimmerPalette = loadHolographicShimmerPalette;

export * from "./index.js";
