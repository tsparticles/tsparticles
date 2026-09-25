import { loadFireworksGreenPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksGreenPalette?: typeof loadFireworksGreenPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksGreenPalette = loadFireworksGreenPalette;

export * from "./index.js";
