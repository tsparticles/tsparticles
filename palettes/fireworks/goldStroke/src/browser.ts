import { loadFireworksGoldStrokePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksGoldStrokePalette?: typeof loadFireworksGoldStrokePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksGoldStrokePalette = loadFireworksGoldStrokePalette;

export * from "./index.js";
