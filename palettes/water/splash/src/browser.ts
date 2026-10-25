import { loadWaterSplashPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadWaterSplashPalette?: typeof loadWaterSplashPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadWaterSplashPalette = loadWaterSplashPalette;

export * from "./index.js";
