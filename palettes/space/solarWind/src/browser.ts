import { loadSolarWindPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSolarWindPalette?: typeof loadSolarWindPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSolarWindPalette = loadSolarWindPalette;

export * from "./index.js";
