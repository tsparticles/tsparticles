import { loadColoredSmokeRainbowPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadColoredSmokeRainbowPalette?: typeof loadColoredSmokeRainbowPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadColoredSmokeRainbowPalette = loadColoredSmokeRainbowPalette;

export * from "./index.js";
