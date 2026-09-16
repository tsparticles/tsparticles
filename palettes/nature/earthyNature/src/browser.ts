import { loadEarthyNaturePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEarthyNaturePalette?: typeof loadEarthyNaturePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEarthyNaturePalette = loadEarthyNaturePalette;

export * from "./index.js";
