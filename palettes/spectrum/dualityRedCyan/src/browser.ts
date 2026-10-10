import { loadDualityRedCyanPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadDualityRedCyanPalette?: typeof loadDualityRedCyanPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadDualityRedCyanPalette = loadDualityRedCyanPalette;

export * from "./index.js";
