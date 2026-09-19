import { loadNeonCityPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadNeonCityPalette?: typeof loadNeonCityPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadNeonCityPalette = loadNeonCityPalette;

export * from "./index.js";
