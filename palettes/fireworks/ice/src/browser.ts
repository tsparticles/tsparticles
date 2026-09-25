import { loadFireworksIcePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksIcePalette?: typeof loadFireworksIcePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksIcePalette = loadFireworksIcePalette;

export * from "./index.js";
