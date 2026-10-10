import { loadVibrantElectricPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadVibrantElectricPalette?: typeof loadVibrantElectricPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadVibrantElectricPalette = loadVibrantElectricPalette;

export * from "./index.js";
