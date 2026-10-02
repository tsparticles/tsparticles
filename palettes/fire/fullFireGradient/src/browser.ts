import { loadFullFireGradientPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFullFireGradientPalette?: typeof loadFullFireGradientPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFullFireGradientPalette = loadFullFireGradientPalette;

export * from "./index.js";
