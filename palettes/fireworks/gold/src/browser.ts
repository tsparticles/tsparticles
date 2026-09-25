import { loadFireworksGoldPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksGoldPalette?: typeof loadFireworksGoldPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksGoldPalette = loadFireworksGoldPalette;

export * from "./index.js";
