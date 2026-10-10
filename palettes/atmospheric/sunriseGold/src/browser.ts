import { loadSunriseGoldPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSunriseGoldPalette?: typeof loadSunriseGoldPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSunriseGoldPalette = loadSunriseGoldPalette;

export * from "./index.js";
