import { loadHeatHazePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadHeatHazePalette?: typeof loadHeatHazePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadHeatHazePalette = loadHeatHazePalette;

export * from "./index.js";
