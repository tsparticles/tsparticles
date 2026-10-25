import { loadFireworksGreenStrokePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksGreenStrokePalette?: typeof loadFireworksGreenStrokePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksGreenStrokePalette = loadFireworksGreenStrokePalette;

export * from "./index.js";
