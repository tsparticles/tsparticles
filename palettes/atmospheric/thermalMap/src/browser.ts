import { loadThermalMapPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadThermalMapPalette?: typeof loadThermalMapPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadThermalMapPalette = loadThermalMapPalette;

export * from "./index.js";
