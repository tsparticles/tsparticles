import { loadColoredSmokeRedPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadColoredSmokeRedPalette?: typeof loadColoredSmokeRedPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadColoredSmokeRedPalette = loadColoredSmokeRedPalette;

export * from "./index.js";
