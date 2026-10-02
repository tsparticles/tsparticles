import { loadCrtPhosphorPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadCrtPhosphorPalette?: typeof loadCrtPhosphorPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadCrtPhosphorPalette = loadCrtPhosphorPalette;

export * from "./index.js";
