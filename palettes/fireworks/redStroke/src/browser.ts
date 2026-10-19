import { loadFireworksRedStrokePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksRedStrokePalette?: typeof loadFireworksRedStrokePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksRedStrokePalette = loadFireworksRedStrokePalette;

export * from "./index.js";
