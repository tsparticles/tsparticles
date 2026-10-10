import { loadFireworksRedPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksRedPalette?: typeof loadFireworksRedPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksRedPalette = loadFireworksRedPalette;

export * from "./index.js";
